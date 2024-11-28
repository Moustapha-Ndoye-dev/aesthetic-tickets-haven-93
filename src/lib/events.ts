import { supabase } from './supabase';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  category: string;
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