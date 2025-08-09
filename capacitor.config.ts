import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d84a6f289e1b4b9dbf87884f672527d6',
  appName: 'float-volume-up',
  webDir: 'dist',
  server: {
    url: 'https://d84a6f28-9e1b-4b9d-bf87-884f672527d6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Haptics: {
      
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1e40af'
    }
  }
};

export default config;