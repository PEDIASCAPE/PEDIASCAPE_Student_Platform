
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://tsptdptpsgcduwjlhytv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHRkcHRwc2djZHV3amxoeXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMjkwNzEsImV4cCI6MjA4MTYwNTA3MX0.gn0fnaXpwAX7gXx3grdT09hoT9gLmorYC6zvFPA2CAU'

export const supabase = createClient(supabaseUrl, supabaseKey)
