import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phjphukevzobunxvfeqq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoanBodWtldnpvYnVueHZmZXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTg3MjgsImV4cCI6MjA2NjIzNDcyOH0.ukZxFcEQuIU6iF3nmyZweLCtv9bmxGfCwv48LfS6dgc'
export const supabase = createClient(supabaseUrl, supabaseKey)
