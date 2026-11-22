$ErrorActionPreference = "Stop"

$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$buildTools = "$sdk\build-tools\34.0.0"
$androidJar = "$sdk\platforms\android-34\android.jar"
$jdkBin = "C:\Java\jdk-21.0.13+9\bin"
$env:PATH = "$jdkBin;$env:PATH"
$env:JAVA_HOME = "C:\Java\jdk-21.0.13+9"

$appDir = "android-admin-app"
$buildDir = "$appDir\build"
$outDir = "public\downloads"

if (Test-Path $buildDir) { Remove-Item -Recurse -Force $buildDir }
New-Item -ItemType Directory -Force -Path "$buildDir\res_compiled", "$buildDir\gen", "$buildDir\classes", "$buildDir\dex", $outDir | Out-Null

Write-Host "[1/6] Compiling Android resources with aapt2..."
& "$buildTools\aapt2.exe" compile --dir "$appDir\res" -o "$buildDir\res_compiled\resources.zip"

Write-Host "[2/6] Linking resources and manifest..."
& "$buildTools\aapt2.exe" link `
  -o "$buildDir\app-unaligned.apk" `
  -I $androidJar `
  --manifest "$appDir\AndroidManifest.xml" `
  --java "$buildDir\gen" `
  "$buildDir\res_compiled\resources.zip"

Write-Host "[3/6] Compiling Java sources with javac..."
$javaFiles = @(
  "$appDir\src\in\ecreation\admin\MainActivity.java",
  "$buildDir\gen\in\ecreation\admin\R.java"
)
& "$jdkBin\javac.exe" --release 8 -classpath $androidJar -d "$buildDir\classes" @javaFiles

Write-Host "[4/6] Converting bytecode to DEX with d8..."
$classFiles = Get-ChildItem -Path "$buildDir\classes" -Recurse -Filter "*.class" | ForEach-Object { $_.FullName }
& "$buildTools\d8.bat" --min-api 24 --lib $androidJar --output "$buildDir\dex" @classFiles

Write-Host "[5/6] Packaging classes.dex into APK and zipaligning..."
Copy-Item "$buildDir\dex\classes.dex" "$buildDir\classes.dex" -Force
Push-Location $buildDir
& "$jdkBin\jar.exe" -uf "app-unaligned.apk" "classes.dex"
Pop-Location

& "$buildTools\zipalign.exe" -f -p 4 "$buildDir\app-unaligned.apk" "$buildDir\app-aligned.apk"

Write-Host "[6/6] Signing APK with release keystore..."
$keystore = "$appDir\ecreation-release.keystore"
if (-not (Test-Path $keystore)) {
  & "$jdkBin\keytool.exe" -genkeypair -v `
    -keystore $keystore `
    -alias ecreation_admin `
    -keyalg RSA `
    -keysize 2048 `
    -validity 10000 `
    -storepass "EcreationERP2026!" `
    -keypass "EcreationERP2026!" `
    -dname "CN=Ecreation IT Solution, OU=Engineering, O=Ecreation, L=Noida, ST=UP, C=IN"
}

$finalApk = "$outDir\ecreation-admin.apk"
& "$buildTools\apksigner.bat" sign `
  --ks $keystore `
  --ks-key-alias ecreation_admin `
  --ks-pass "pass:EcreationERP2026!" `
  --key-pass "pass:EcreationERP2026!" `
  --out $finalApk `
  "$buildDir\app-aligned.apk"

& "$buildTools\apksigner.bat" verify --verbose $finalApk
$info = Get-Item $finalApk
Write-Host "SUCCESS! Signed APK built at $($info.FullName) ($([math]::Round($info.Length / 1KB, 1)) KB)"
