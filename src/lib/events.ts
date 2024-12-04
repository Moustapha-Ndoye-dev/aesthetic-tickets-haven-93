import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  image_url: string | null;
  price: number;
  capacity: number;
  category: string;
  organizer_id: string;
  is_active: boolean;
  created_at: string;
}

export const getEvents = async () => {
  console.log('Fetching events from Supabase...');
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  console.log('Events fetched successfully:', data);
  return data;
};

export const deleteExpiredEvents = async () => {
  const { error } = await supabase
    .from('events')
    .update({ is_active: false })
    .lt('date', new Date().toISOString());

  if (error) {
    console.error('Error deleting expired events:', error);
    throw error;
  }
};