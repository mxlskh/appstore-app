// supabase.js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoTrueClient } from '@supabase/gotrue-js';

const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';       // подставьте свои
const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';

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
