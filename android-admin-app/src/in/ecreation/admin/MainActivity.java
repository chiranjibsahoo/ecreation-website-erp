package in.ecreation.admin;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private static final String ADMIN_URL = "https://ecreation.vercel.app/admin";
    private static final String APP_VERSION = "2.4.0";
    private static final int FILE_CHOOSER_REQUEST_CODE = 1001;

    private WebView webView;
    private ProgressBar progressBar;
    private ValueCallback<Uri[]> filePathCallback;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#FAF8F5"));

        webView = new WebView(this);
        webView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                10
        ));
        progressBar.setMax(100);
        progressBar.setVisibility(View.GONE);

        root.addView(webView);
        root.addView(progressBar);
        setContentView(root);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setUserAgentString(settings.getUserAgentString() + " EcreationAdminAPK/" + APP_VERSION);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        webView.addJavascriptInterface(new AndroidBridge(this), "AndroidBridge");
        webView.setWebViewClient(new AdminWebViewClient(this));
        webView.setWebChromeClient(new AdminWebChromeClient(this));

        webView.loadUrl(ADMIN_URL);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE && filePathCallback != null) {
            Uri[] results = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    void updateProgress(int newProgress) {
        if (newProgress < 100) {
            progressBar.setVisibility(View.VISIBLE);
            progressBar.setProgress(newProgress);
        } else {
            progressBar.setVisibility(View.GONE);
        }
    }

    boolean openFileChooser(ValueCallback<Uri[]> callback, WebChromeClient.FileChooserParams params) {
        if (filePathCallback != null) {
            filePathCallback.onReceiveValue(null);
        }
        filePathCallback = callback;
        try {
            Intent intent = params.createIntent();
            startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
            return true;
        } catch (Exception e) {
            filePathCallback = null;
            return false;
        }
    }

    void reloadFresh() {
        if (webView != null) {
            webView.clearCache(true);
            webView.reload();
        }
    }

    private static class AdminWebViewClient extends WebViewClient {
        private final MainActivity activity;

        AdminWebViewClient(MainActivity activity) {
            this.activity = activity;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            String scheme = uri.getScheme() != null ? uri.getScheme().toLowerCase() : "";

            if ((scheme.equals("https") || scheme.equals("http")) &&
                    uri.getHost() != null &&
                    (uri.getHost().contains("ecreation.vercel.app") || uri.getHost().contains("ecreation.in"))) {
                return false;
            }

            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                activity.startActivity(intent);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            if (request.isForMainFrame()) {
                String html = "<html><body style='font-family:sans-serif;background:#FAF8F5;color:#1C1917;text-align:center;padding:48px 24px;'>"
                        + "<div style='display:inline-block;padding:14px 20px;border-radius:16px;background:#1C1917;color:#F59E0B;font-weight:900;font-size:20px;margin-bottom:16px;'>E</div>"
                        + "<h2 style='margin:0 0 8px;'>Connection Paused</h2>"
                        + "<p style='color:#57534E;font-size:14px;'>Unable to reach Ecreation Admin ERP. Check internet connection and tap retry.</p>"
                        + "<button onclick=\"window.location.href='" + ADMIN_URL + "'\" style='margin-top:20px;padding:12px 28px;border:none;border-radius:12px;background:#D97706;color:#FFF;font-weight:700;font-size:14px;'>Retry Auto-Sync</button>"
                        + "</body></html>";
                view.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null);
            }
        }
    }

    private static class AdminWebChromeClient extends WebChromeClient {
        private final MainActivity activity;

        AdminWebChromeClient(MainActivity activity) {
            this.activity = activity;
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            activity.updateProgress(newProgress);
        }

        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
            return activity.openFileChooser(callback, params);
        }
    }

    private static class ReloadRunnable implements Runnable {
        private final MainActivity activity;

        ReloadRunnable(MainActivity activity) {
            this.activity = activity;
        }

        @Override
        public void run() {
            activity.reloadFresh();
        }
    }

    private static class AndroidBridge {
        private final MainActivity activity;

        AndroidBridge(MainActivity activity) {
            this.activity = activity;
        }

        @JavascriptInterface
        public String getAppVersion() {
            return APP_VERSION;
        }

        @JavascriptInterface
        public void shareContent(String title, String text, String url) {
            Intent sendIntent = new Intent(Intent.ACTION_SEND);
            sendIntent.setType("text/plain");
            String payload = text + (url != null && !url.isEmpty() ? "\n\n" + url : "");
            sendIntent.putExtra(Intent.EXTRA_SUBJECT, title);
            sendIntent.putExtra(Intent.EXTRA_TEXT, payload);
            Intent shareIntent = Intent.createChooser(sendIntent, "Share via Social Media");
            activity.startActivity(shareIntent);
        }

        @JavascriptInterface
        public void openExternal(String url) {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                activity.startActivity(intent);
            } catch (Exception ignored) {
            }
        }

        @JavascriptInterface
        public void clearCacheAndReload() {
            activity.runOnUiThread(new ReloadRunnable(activity));
        }
    }
}
