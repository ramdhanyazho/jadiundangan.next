export interface InvitationHero {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt: string;
  avatarImage: string;
  avatarAlt: string;
  googleCalendarUrl: string;
}

export interface InvitationPerson {
  name: string;
  role: string;
  parents: string[];
  image: string;
}

export interface InvitationCouple {
  groom: InvitationPerson;
  bride: InvitationPerson;
}

export interface InvitationSchedule {
  title: string;
  start: string;
  end: string;
  timeLabel: string;
}

export interface InvitationGalleryItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface InvitationMessage {
  id: string;
  name: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface InvitationStats {
  comments: number;
  present: number;
  absent: number;
  likes: number;
}

export interface InvitationContent {
  slug: string;
  hero: InvitationHero;
  couple: InvitationCouple;
  schedules: InvitationSchedule[];
  headline: string;
  description: string;
  dressCode: string;
  mapUrl: string;
  venue: string;
  gallery: InvitationGalleryItem[];
  messages: InvitationMessage[];
  stats: InvitationStats;
}
