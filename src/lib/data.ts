import eventData from "../../data/event.json";
import scheduleData from "../../data/schedule.json";
import foodStallsData from "../../data/food-stalls.json";
import emergencyData from "../../data/emergency.json";
import mapMarkersData from "../../data/map-markers.json";
import announcementsData from "../../data/announcements.json";
import volunteersData from "../../data/volunteers.json";
import sponsorsData from "../../data/sponsors.json";
import faqData from "../../data/faq.json";
import lostFoundData from "../../data/lost-found.json";

import type {
  EventInfo,
  ScheduleItem,
  FoodStall,
  EmergencyInfo,
  MapMarker,
  Announcement,
  Volunteer,
  Sponsor,
  FaqItem,
  LostFoundItem,
} from "@/types";

export const event = eventData as EventInfo;
export const schedule = scheduleData as ScheduleItem[];
export const foodStalls = foodStallsData as FoodStall[];
export const emergency = emergencyData as EmergencyInfo;
export const mapMarkers = mapMarkersData as MapMarker[];
export const announcements = announcementsData as Announcement[];
export const volunteers = volunteersData as Volunteer[];
export const sponsors = sponsorsData as Sponsor[];
export const faq = faqData as FaqItem[];
export const lostFound = lostFoundData as LostFoundItem[];
