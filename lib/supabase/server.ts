import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from './config'

export function createServerClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
}
