import { NextResponse } from 'next/server';
import {
  APP_VERSION,
  APK_VERSION,
  APP_BUILD_DATE,
  APK_DOWNLOAD_PATH,
  PWA_MANIFEST_PATH,
  APP_RELEASE_NOTES
} from '@/lib/appVersion';

export async function GET() {
  return NextResponse.json(
    {
      version: APP_VERSION,
      apkVersion: APK_VERSION,
      buildDate: APP_BUILD_DATE,
      apkUrl: APK_DOWNLOAD_PATH,
      manifestUrl: PWA_MANIFEST_PATH,
      autoUpdate: true,
      otaMode: 'Live Cloud Sync (Auto-Updates on Web Deploy)',
      releaseNotes: APP_RELEASE_NOTES,
      serverTime: new Date().toISOString()
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    }
  );
}
