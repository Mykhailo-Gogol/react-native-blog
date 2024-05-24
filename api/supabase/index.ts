import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gouumcxdpieegrqgvabg.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXVtY3hkcGllZWdycWd2YWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNTA5MzUsImV4cCI6MjAzMTcyNjkzNX0.x4vi9XOjaRnp0WxH4q-PWiRUlqwcLZKWRVLvEUfeOwM'

// const supabaseUrl = Config.REACT_NATIVE_SUPABASE_URL!
// const supabaseAnonKey = Config.REACT_NATIVE_SUPABASE_ANON_KEY!

console.log(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
