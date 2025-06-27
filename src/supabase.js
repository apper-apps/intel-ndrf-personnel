import { createClient } from "@supabase/supabase-js";

// Get Supabase configuration from environment variables

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate configuration
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase configuration missing. Please check your .env file.')
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
  console.error('Please add your Supabase credentials to the .env file')
  
  // Check if using placeholder values
  if (supabaseUrl === 'https://your-project-ref.supabase.co' || supabaseKey === 'your-anon-key-here') {
    console.error('⚠️  Using placeholder Supabase values. Replace with actual credentials.')
  }
}

// Use fallback values if environment variables are not set (for development)
const finalUrl = supabaseUrl || 'https://demo-supabase-url.com'
const finalKey = supabaseKey || 'demo-key'

// Log configuration status
if (supabaseUrl && supabaseKey && 
    supabaseUrl !== 'https://your-project-ref.supabase.co' && 
    supabaseKey !== 'your-anon-key-here') {
  console.log('✅ Supabase configuration loaded successfully')
} else {
  console.warn('⚠️  Using fallback Supabase configuration - some features may not work properly')
}

// Create Supabase client with error handling
let supabase
try {
  supabase = createClient(finalUrl, finalKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'ndrf-personnel-dashboard'
      }
    }
  })
  
  // Validate client creation
  if (!supabase) {
    throw new Error('Supabase client creation returned null/undefined')
  }
  
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error)
  console.error('This may be due to invalid credentials or network issues')
  throw new Error(`Supabase client initialization failed: ${error.message}`)
}

// Export a function to test the connection
export const testSupabaseConnection = async () => {
  try {
    if (!supabase) {
      console.error('❌ Supabase client not initialized')
      return false
    }
    
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn('⚠️  Supabase connection test failed:', error.message)
      return false
    }
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection test error:', error)
    return false
  }
}
export { supabase };