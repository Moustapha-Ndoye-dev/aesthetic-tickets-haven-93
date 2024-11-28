import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbqhbbkmohabjcyuzhdf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicWhiYmttb2hhYmpjeXV6aGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDY2MjcsImV4cCI6MjA0ODM4MjYyN30.g4mN8BXRoqIzT_ybsceQI10QFsbNtGWQlUKCe7OBv0M';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file');
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'organizer' | 'admin';
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer_id: string;
  capacity: number;
  price: number;
  image_url: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  user_id: string;
  token: string;
  purchase_date: string;
  used: boolean;
  used_at: string | null;
  price_paid: number;
};