export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "call" | "meeting" | "deadline" | "review";
  attendees?: string[];
  location?: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", title: "Client call — Brightline Studio", date: "2026-08-13", time: "10:30 AM", type: "call", attendees: ["u1", "u5"], location: "Zoom" },
  { id: "e2", title: "Team design review", date: "2026-08-13", time: "1:00 PM", type: "review", attendees: ["u3", "u6", "u4"], location: "Studio Room" },
  { id: "e3", title: "Project status meeting", date: "2026-08-13", time: "3:30 PM", type: "meeting", attendees: ["u1", "u2"], location: "Main Room" },
  { id: "e4", title: "Client Onboarding System due", date: "2026-08-16", time: "5:00 PM", type: "deadline" },
  { id: "e5", title: "Horizon Website Redesign due", date: "2026-08-18", time: "5:00 PM", type: "deadline" },
  { id: "e6", title: "Northstar campaign kickoff call", date: "2026-08-14", time: "9:00 AM", type: "call", attendees: ["u4", "u5"], location: "Zoom" },
  { id: "e7", title: "Sales pipeline review", date: "2026-08-15", time: "11:00 AM", type: "meeting", attendees: ["u5", "u1"], location: "Main Room" },
  { id: "e8", title: "Vertex Labs discovery call", date: "2026-08-19", time: "2:00 PM", type: "call", attendees: ["u1", "u7"], location: "Zoom" },
  { id: "e9", title: "Northstar Marketing Campaign due", date: "2026-08-24", time: "5:00 PM", type: "deadline" },
  { id: "e10", title: "Design system review", date: "2026-08-20", time: "10:00 AM", type: "review", attendees: ["u3", "u6"], location: "Studio Room" },
  { id: "e11", title: "Quarterly planning session", date: "2026-08-27", time: "9:30 AM", type: "meeting", attendees: ["u1", "u2", "u4", "u5"], location: "Main Room" },
  { id: "e12", title: "Q3 Business Review due", date: "2026-08-30", time: "5:00 PM", type: "deadline" },
];
