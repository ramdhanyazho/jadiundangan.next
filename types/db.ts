export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export interface GuestRow {
  id: string;
  invitation_id: string | null;
  message: string | null;
}

export interface GuestInsert {
  id?: string;
  invitation_id?: string | null;
  message?: string | null;
}

export interface GuestUpdate {
  id?: string;
  invitation_id?: string | null;
  message?: string | null;
}

export interface VisitLogRow {
  id: string;
  invitation_id: string | null;
}

export interface VisitLogInsert {
  id?: string;
  invitation_id?: string | null;
}

export interface VisitLogUpdate {
  id?: string;
  invitation_id?: string | null;
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

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      invitations: {
        Row: InvitationRow;
        Insert: InvitationInsert;
        Update: InvitationUpdate;
        Relationships: [];
      };
      guests: {
        Row: GuestRow;
        Insert: GuestInsert;
        Update: GuestUpdate;
        Relationships: [];
      };
      visit_logs: {
        Row: VisitLogRow;
        Insert: VisitLogInsert;
        Update: VisitLogUpdate;
        Relationships: [];
      };
      payments: {
        Row: PaymentRow;
        Insert: PaymentInsert;
        Update: PaymentUpdate;
        Relationships: [];
      };
      themes: {
        Row: ThemeRow;
        Insert: ThemeInsert;
        Update: ThemeUpdate;
        Relationships: [];
      };
      settings: {
        Row: SettingRow;
        Insert: SettingInsert;
        Update: SettingUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
