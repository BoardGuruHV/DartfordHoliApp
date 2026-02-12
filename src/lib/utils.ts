export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getTimeFromSchedule(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date("2025-03-08");
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function isCurrentEvent(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = getTimeFromSchedule(startTime);
  const end = getTimeFromSchedule(endTime);
  return now >= start && now <= end;
}

export function isUpcoming(startTime: string): boolean {
  const now = new Date();
  const start = getTimeFromSchedule(startTime);
  const diff = start.getTime() - now.getTime();
  return diff > 0 && diff <= 30 * 60 * 1000;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
