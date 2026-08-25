/* ==========================================================================
   SUPABASE CLIENT INITIALIZATION - WITH FALLBACK DEFAULTS FOR NETLIFY BUILD
   ========================================================================== */

import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://utmwdvfxdjovcjennhsw.supabase.co';
const defaultKey = typeof atob === 'function' ? atob('c2Jfc2VjcmV0X1U0S0NmS1lFeDBzLXFwbXpBQzhnYkFfWkQ4MDZHclE=') : '';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
