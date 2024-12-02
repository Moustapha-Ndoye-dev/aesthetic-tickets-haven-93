import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'user' | 'organizer' | 'admin';

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at?: string;
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

export { supabase };