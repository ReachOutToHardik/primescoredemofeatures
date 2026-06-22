import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cnuskrjafullfwlwqpdl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudXNrcmphZnVsbGZ3bHdxcGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODE2ODQsImV4cCI6MjA5MzQ1NzY4NH0.BctaLcYRsRXNaiB85Y-zoSP2sOJGZzxHqRxduBfuCrQ'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-client-info': 'primescore-web'
        }
      }
    });
