import { supabase } from './supabase';

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
    .select('*');

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  console.log('Events fetched successfully:', data);
  return data;
};