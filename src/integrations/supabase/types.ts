export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string
          image_url: string | null
          price: number
          capacity: number
          category: string
          organizer_id: string
          created_at: string
          is_active: boolean | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location: string
          image_url?: string | null
          price: number
          capacity: number
          category: string
          organizer_id: string
          created_at?: string
          is_active?: boolean | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string
          image_url?: string | null
          price?: number
          capacity?: number
          category?: string
          organizer_id?: string
          created_at?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          role: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          role?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          role?: string | null
          created_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          user_id: string
          token: string
          purchase_date: string
          is_valid: boolean | null
          invalidated_at: string | null
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          token: string
          purchase_date?: string
          is_valid?: boolean | null
          invalidated_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          token?: string
          purchase_date?: string
          is_valid?: boolean | null
          invalidated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_valid_tokens: {
        Args: {
          event_id: string
        }
        Returns: {
          token: string
          is_valid: boolean
        }[]
      }
      invalidate_token: {
        Args: {
          token_to_invalidate: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]