export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type SupabaseRelationship = {
  foreignKeyName: string;
  columns: string[];
  referencedRelation: string;
  referencedColumns: string[];
  isOneToOne?: boolean;
};

type SupabaseTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: SupabaseRelationship[];
};

type SupabaseSchema = {
  Tables: Record<string, SupabaseTable>;
  Views: Record<string, { Row: Record<string, unknown>; Relationships: SupabaseRelationship[] }>;
  Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
};

export interface ProfileRow {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  password_hash: string | null;
  is_admin: boolean | null;
  role?: string | null;
  created_at: string | null;
}

export interface ProfileInsert {
  id?: string;
  user_id: string;
  email?: string | null;
  full_name?: string | null;
  password_hash?: string | null;
  is_admin?: boolean | null;
  role?: string | null;
  created_at?: string | null;
}

export interface ProfileUpdate {
  id?: string;
  user_id?: string;
  email?: string | null;
  full_name?: string | null;
  password_hash?: string | null;
  is_admin?: boolean | null;
  role?: string | null;
  created_at?: string | null;
}

export interface InvitationRow {
  id: string;
  slug: string;
  title: string | null;
  groom_name: string;
  bride_name: string;
  groom_nickname: string | null;
  bride_nickname: string | null;
  groom_parents: string | null;
  bride_parents: string | null;
  date_display: string | null;
  theme_slug: string | null;
  cover_photo_url: string | null;
  music_url: string | null;
  user_id: string | null;
  custom_domain_suffix: string | null;
  view_count: number | null;
  is_published: boolean | null;
  pages_enabled: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface InvitationInsert {
  id?: string;
  slug: string;
  title?: string | null;
  groom_name: string;
  bride_name: string;
  groom_nickname?: string | null;
  bride_nickname?: string | null;
  groom_parents?: string | null;
  bride_parents?: string | null;
  date_display?: string | null;
  theme_slug?: string | null;
  cover_photo_url?: string | null;
  music_url?: string | null;
  user_id?: string | null;
  custom_domain_suffix?: string | null;
  view_count?: number | null;
  is_published?: boolean | null;
  pages_enabled?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface InvitationUpdate {
  id?: string;
  slug?: string;
  title?: string | null;
  groom_name?: string;
  bride_name?: string;
  groom_nickname?: string | null;
  bride_nickname?: string | null;
  groom_parents?: string | null;
  bride_parents?: string | null;
  date_display?: string | null;
  theme_slug?: string | null;
  cover_photo_url?: string | null;
  music_url?: string | null;
  user_id?: string | null;
  custom_domain_suffix?: string | null;
  view_count?: number | null;
  is_published?: boolean | null;
  pages_enabled?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MediaRow {
  id: string;
  invitation_id: string | null;
  type: 'photo' | 'music' | 'video';
  url: string;
  caption: string | null;
  sort_index: number | null;
  created_at: string | null;
}

export interface MediaInsert {
  id?: string;
  invitation_id?: string | null;
  type: 'photo' | 'music' | 'video';
  url: string;
  caption?: string | null;
  sort_index?: number | null;
  created_at?: string | null;
}

export interface MediaUpdate {
  id?: string;
  invitation_id?: string | null;
  type?: 'photo' | 'music' | 'video';
  url?: string;
  caption?: string | null;
  sort_index?: number | null;
  created_at?: string | null;
}

export interface GuestRow {
  id: string;
  invitation_id: string | null;
  name: string;
  status: 'yes' | 'no' | 'pending' | null;
  message: string | null;
  seats: number | null;
  created_at: string | null;
}

export interface GuestInsert {
  id?: string;
  invitation_id?: string | null;
  name: string;
  status?: 'yes' | 'no' | 'pending' | null;
  message?: string | null;
  seats?: number | null;
  created_at?: string | null;
}

export interface GuestUpdate {
  id?: string;
  invitation_id?: string | null;
  name?: string;
  status?: 'yes' | 'no' | 'pending' | null;
  message?: string | null;
  seats?: number | null;
  created_at?: string | null;
}

export interface VisitLogRow {
  id: string;
  invitation_id: string | null;
  ip: string | null;
  ua: string | null;
  created_at: string | null;
}

export interface VisitLogInsert {
  id?: string;
  invitation_id?: string | null;
  ip?: string | null;
  ua?: string | null;
  created_at?: string | null;
}

export interface VisitLogUpdate {
  id?: string;
  invitation_id?: string | null;
  ip?: string | null;
  ua?: string | null;
  created_at?: string | null;
}

export interface PaymentRow {
  id: string;
  user_id: string;
  amount: string;
  status: 'unpaid' | 'paid';
  invoice_no: string | null;
  created_at: string | null;
}

export interface PaymentInsert {
  id?: string;
  user_id: string;
  amount?: string;
  status?: 'unpaid' | 'paid';
  invoice_no?: string | null;
  created_at?: string | null;
}

export interface PaymentUpdate {
  id?: string;
  user_id?: string;
  amount?: string;
  status?: 'unpaid' | 'paid';
  invoice_no?: string | null;
  created_at?: string | null;
}

export interface EventRow {
  id: string;
  invitation_id: string | null;
  type: 'akad' | 'resepsi' | 'custom' | null;
  title: string | null;
  date: string | null;
  time: string | null;
  date_display: string | null;
  location: string | null;
  map_url: string | null;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  created_at: string | null;
}

export interface EventInsert {
  id?: string;
  invitation_id?: string | null;
  type?: 'akad' | 'resepsi' | 'custom' | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  date_display?: string | null;
  location?: string | null;
  map_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  note?: string | null;
  created_at?: string | null;
}

export interface EventUpdate {
  id?: string;
  invitation_id?: string | null;
  type?: 'akad' | 'resepsi' | 'custom' | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  date_display?: string | null;
  location?: string | null;
  map_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  note?: string | null;
  created_at?: string | null;
}

export interface GiftRow {
  id: string;
  invitation_id: string | null;
  bank_name: string | null;
  account_number: string | null;
  account_name: string | null;
  qr_image_url: string | null;
}

export interface GiftInsert {
  id?: string;
  invitation_id?: string | null;
  bank_name?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  qr_image_url?: string | null;
}

export interface GiftUpdate {
  id?: string;
  invitation_id?: string | null;
  bank_name?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  qr_image_url?: string | null;
}

export interface StoryRow {
  id: string;
  invitation_id: string | null;
  title: string | null;
  body: string | null;
  date: string | null;
  date_display: string | null;
  photo_url: string | null;
  sort_index: number | null;
  created_at: string | null;
}

export interface StoryInsert {
  id?: string;
  invitation_id?: string | null;
  title?: string | null;
  body?: string | null;
  date?: string | null;
  date_display?: string | null;
  photo_url?: string | null;
  sort_index?: number | null;
  created_at?: string | null;
}

export interface StoryUpdate {
  id?: string;
  invitation_id?: string | null;
  title?: string | null;
  body?: string | null;
  date?: string | null;
  date_display?: string | null;
  photo_url?: string | null;
  sort_index?: number | null;
  created_at?: string | null;
}

export interface TestimonialRow {
  id: string;
  invitation_id: string | null;
  author: string | null;
  body: string | null;
  rating: number | null;
  created_at: string | null;
}

export interface TestimonialInsert {
  id?: string;
  invitation_id?: string | null;
  author?: string | null;
  body?: string | null;
  rating?: number | null;
  created_at?: string | null;
}

export interface TestimonialUpdate {
  id?: string;
  invitation_id?: string | null;
  author?: string | null;
  body?: string | null;
  rating?: number | null;
  created_at?: string | null;
}

export interface ThemeRow {
  id: string;
  slug: string;
  name: string;
  status: 'active' | 'inactive';
  preview_url: string | null;
  package_path: string | null;
  created_at: string | null;
}

export interface ThemeInsert {
  id?: string;
  slug: string;
  name: string;
  status?: 'active' | 'inactive';
  preview_url?: string | null;
  package_path?: string | null;
  created_at?: string | null;
}

export interface ThemeUpdate {
  id?: string;
  slug?: string;
  name?: string;
  status?: 'active' | 'inactive';
  preview_url?: string | null;
  package_path?: string | null;
  created_at?: string | null;
}

export interface SettingRow {
  key: string;
  value: Json;
  updated_at: string | null;
}

export interface SettingInsert {
  key: string;
  value: Json;
  updated_at?: string | null;
}

export interface SettingUpdate {
  key?: string;
  value?: Json;
  updated_at?: string | null;
}

type PublicTables = {
  profiles: {
    Row: ProfileRow;
    Insert: ProfileInsert;
    Update: ProfileUpdate;
    Relationships: SupabaseRelationship[];
  };
  invitations: {
    Row: InvitationRow;
    Insert: InvitationInsert;
    Update: InvitationUpdate;
    Relationships: SupabaseRelationship[];
  };
  events: {
    Row: EventRow;
    Insert: EventInsert;
    Update: EventUpdate;
    Relationships: SupabaseRelationship[];
  };
  media: {
    Row: MediaRow;
    Insert: MediaInsert;
    Update: MediaUpdate;
    Relationships: SupabaseRelationship[];
  };
  guests: {
    Row: GuestRow;
    Insert: GuestInsert;
    Update: GuestUpdate;
    Relationships: SupabaseRelationship[];
  };
  gifts: {
    Row: GiftRow;
    Insert: GiftInsert;
    Update: GiftUpdate;
    Relationships: SupabaseRelationship[];
  };
  stories: {
    Row: StoryRow;
    Insert: StoryInsert;
    Update: StoryUpdate;
    Relationships: SupabaseRelationship[];
  };
  testimonials: {
    Row: TestimonialRow;
    Insert: TestimonialInsert;
    Update: TestimonialUpdate;
    Relationships: SupabaseRelationship[];
  };
  visit_logs: {
    Row: VisitLogRow;
    Insert: VisitLogInsert;
    Update: VisitLogUpdate;
    Relationships: SupabaseRelationship[];
  };
  payments: {
    Row: PaymentRow;
    Insert: PaymentInsert;
    Update: PaymentUpdate;
    Relationships: SupabaseRelationship[];
  };
  themes: {
    Row: ThemeRow;
    Insert: ThemeInsert;
    Update: ThemeUpdate;
    Relationships: SupabaseRelationship[];
  };
  settings: {
    Row: SettingRow;
    Insert: SettingInsert;
    Update: SettingUpdate;
    Relationships: SupabaseRelationship[];
  };
};

type PublicSchema = SupabaseSchema & {
  Tables: PublicTables;
  Views: Record<string, never>;
  Functions: Record<string, never>;
  Enums: Record<string, never>;
  CompositeTypes: Record<string, never>;
};

export type Database = {
  public: PublicSchema;
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
