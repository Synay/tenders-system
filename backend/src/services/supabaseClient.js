const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Falta SUPABASE_URL o SUPABASE_KEY');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false } });
    
module.exports = supabase