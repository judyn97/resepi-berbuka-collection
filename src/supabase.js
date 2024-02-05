
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhdsdutegizkgbhpdsiy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZHNkdXRlZ2l6a2diaHBkc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwNTA2OTQsImV4cCI6MjAyMjYyNjY5NH0.BI4SCyRXtGzzG7_LNolWz_E7hmx3Lw-s0wHphvIjBkU';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;