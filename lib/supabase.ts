import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuotationRequest {
  id?: string;
  service: string;
  selectedOptions: string[];
  timeline: string;
  budget: string;
  projectBrief: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  preferredContact: string;
  consent: boolean;
  createdAt?: string;
  status?: 'pending' | 'reviewed' | 'quoted' | 'completed';
  ticketId?: string;
}