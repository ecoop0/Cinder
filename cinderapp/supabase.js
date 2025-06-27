import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbgbevvrvtmopqcxnigh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZ2JldnZydnRtb3BxY3huaWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5ODk2OTIsImV4cCI6MjA2NjU2NTY5Mn0.aAGXnXUsmMOSz0YtpLors2cN9AnQR3L0N-kBNPEZuE8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
