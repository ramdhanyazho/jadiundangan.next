export type Couple = {
  panggilanPria: string;
  namaPria: string;
  panggilanWanita: string;
  namaWanita: string;
  fotoCoverUrl?: string;
};

export type EventItem = {
  label: string;
  tanggal: string; // ISO Date string (YYYY-MM-DD)
  jamMulai: string; // HH:mm
  jamSelesai: string; // HH:mm
  alamat: string;
  gmapsUrl?: string;
};

export type Stats = {
  comments: number;
  present: number;
  absent: number;
  likes: number;
};

export type Comment = {
  nama: string;
  pesan: string;
  waktuISO: string;
};

export type Parents = {
  pria: string;
  wanita: string;
};

export type InvitationContent = {
  couple: Couple;
  events: EventItem[];
  stats: Stats;
  comments: Comment[];
  gallery: string[];
  orangTua: Parents;
};
