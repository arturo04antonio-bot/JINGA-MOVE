
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbkmekftormzsohybgmr.supabase.co';
const supabaseKey = 'sb_publishable_m77Da2f4gao14xfKPvqnGw_54HYE4rm';

export const supabase = createClient(supabaseUrl, supabaseKey);
