import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fairsplit.app',
  appName: 'FairSplit',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
