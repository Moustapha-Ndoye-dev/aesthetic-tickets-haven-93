// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://rmmqiqpafecsaclqfrks.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbXFpcXBhZmVjc2FjbHFmcmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NDMzNjYsImV4cCI6MjA0ODQxOTM2Nn0.KCCsk85hfbwmIR1uqi0qoformkforvzA6K6AonumaFI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);