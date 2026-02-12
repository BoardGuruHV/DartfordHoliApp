export interface EventInfo {
  name: string;
  tagline: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  postcode: string;
  organizer: string;
  website: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  description: string;
  location: string;
  category: "ceremony" | "performance" | "activity" | "food" | "break";
  highlight?: boolean;
}

export interface FoodStall {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  items: MenuItem[];
  location: string;
}

export interface MenuItem {
  name: string;
  price: string;
  dietary: DietaryLabel[];
  description?: string;
}

export type DietaryLabel = "vegetarian" | "vegan" | "gluten-free" | "nut-free" | "halal" | "dairy-free" | "spicy";

export interface EmergencyInfo {
  firstAid: {
    location: string;
    description: string;
  };
  emergencyNumber: string;
  nonEmergencyNumber: string;
  nearestHospital: {
    name: string;
    address: string;
    phone: string;
    distance: string;
  };
  eventSecurity: {
    phone: string;
    description: string;
  };
  safetyTips: string[];
  waterStations: string[];
}

export interface MapMarker {
  id: string;
  label: string;
  type: "stage" | "food" | "toilet" | "first-aid" | "entrance" | "water" | "info" | "prayer" | "parking";
  x: number;
  y: number;
  description?: string;
}

export interface Announcement {
  id: string;
  time: string;
  title: string;
  message: string;
  priority: "normal" | "important" | "urgent";
  category: "general" | "schedule" | "safety" | "fun";
}

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  zone: string;
  photo?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver" | "community";
  logo?: string;
  website?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LostFoundItem {
  id: string;
  type: "lost" | "found";
  description: string;
  location: string;
  time: string;
  contact?: string;
  resolved: boolean;
}

export interface FeedbackEntry {
  id: string;
  overallRating: number;
  entertainmentRating: number;
  foodRating: number;
  organizationRating: number;
  comments: string;
  timestamp: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption?: string;
  timestamp: string;
}
