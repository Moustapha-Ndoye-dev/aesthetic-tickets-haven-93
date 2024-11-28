import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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