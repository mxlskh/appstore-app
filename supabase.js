// supabase.js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoTrueClient } from '@supabase/gotrue-js';

const SUPABASE_URL = 'https://rsmcpbsmbctetshbbicn.supabase.co';       // подставьте свои
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbWNwYnNtYmN0ZXRzaGJiaWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTA4NDgsImV4cCI6MjA2NDAyNjg0OH0.wwyRlRoUshNeY-VooKFuyb5YEv2SHCRSi7kNigo55O4';

export const auth = new GoTrueClient({
  url:        `${SUPABASE_URL}/auth/v1`,
  headers: {
    apikey:        SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  },
  storageKey:       'supabase.auth.token',
  storage:          AsyncStorage,
  autoRefreshToken: true,
  persistSession:   true,
  detectSessionInUrl:false,
  fetch
});
