import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbqhbbkmohabjcyuzhdf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicWhiYmttb2hhYmpjeXV6aGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDY2MjcsImV4cCI6MjA0ODM4MjYyN30.g4mN8BXRoqIzT_ybsceQI10QFsbNtGWQlUKCe7OBv0M';

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
  image_url: string;
  price: number;
  capacity: number;
  category: string;
  organizer_id: string;
  is_active: boolean;
  created_at: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  user_id: string;
  token: string;
  purchase_date: string;
  is_valid: boolean;
  invalidated_at: string | null;
};