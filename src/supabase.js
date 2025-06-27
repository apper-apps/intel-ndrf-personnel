import { createClient } from "@supabase/supabase-js";
import React from "react";
import Error from "@/components/ui/Error";

// Get Supabase configuration from environment variables

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate configuration
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase configuration missing. Please check your .env file.')
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
}

// Use fallback values if environment variables are not set (for development)
const finalUrl = supabaseUrl || 'https://demo-supabase-url.com'
const finalKey = supabaseKey || 'demo-key'

// Create Supabase client with error handling
let supabase
try {
  supabase = createClient(finalUrl, finalKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
} catch (error) {
  console.error('Failed to create Supabase client:', error)
  throw new Error('Supabase client initialization failed')
}

// Test connection function
const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1)
    if (error) {
      console.warn('Supabase connection test failed:', error.message)
      return false
    }
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.warn('Supabase connection test error:', error.message)
    return false
  }
}

export { supabase, testSupabaseConnection }
export default supabase

export { supabase }

// Export a function to test the connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn('Supabase connection test failed:', error.message)
      return false
    }
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return false
  }
}