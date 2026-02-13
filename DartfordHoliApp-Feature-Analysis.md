# Dartford Holi Festival PWA — Feature Gap Analysis & Strategic Roadmap

## 1. Executive Summary

The Dartford Holi Festival PWA currently delivers a solid information-first experience across 13 routes (home, schedule, map, food, emergency, announcements, volunteers, sponsors, gallery, FAQ, feedback, lost & found). It outperforms every comparable UK community cultural festival app in feature breadth — most rely on fragmented social media and Eventbrite pages.

However, competitor analysis against major festival apps (Glastonbury, Coachella, Tomorrowland, SXSW) and domain-specific research into Holi/colour festival needs reveals **significant gaps** in three areas: **contextual awareness** (the app doesn't know what time it is), **engagement loops** (features are mostly passive read-only), and **Holi-specific safety & culture** (the app could be for any generic event). Closing these gaps would transform the app from an information brochure into an indispensable event-day companion.

---

## 2. Current Feature Inventory

| Page | What It Does | Interactivity Level |
|------|-------------|-------------------|
| Home | Hero banner, countdown, quick nav, section previews | Passive (read-only) |
| Schedule | 11-item timeline with category filter | Low (filter only) |
| Map | 12 CSS-positioned markers on illustrated background | Low (tap to reveal info) |
| Food | 4 stalls with dietary filter, expandable menus | Medium (filter + expand) |
| Emergency | Call buttons, safety tips, water stations, hospital info | Medium (tap-to-call) |
| Announcements | 3 static announcements with priority badges | Passive |
| Volunteers | 8 volunteers in avatar grid | Passive |
| Sponsors | 6 sponsors in tiered display | Passive |
| FAQ | 10 Q&As in grouped accordions | Low (expand/collapse) |
| Gallery | Upload photos from device, lightbox, delete | High (CRUD, localStorage) |
| Feedback | 4 star ratings + free text, saved locally | High (form, localStorage) |
| Lost & Found | Browse items + report form, saved locally | High (form, localStorage) |

**PWA Features:** Manifest, service worker (cache-first + offline fallback), install prompt, 8 icon sizes.

---

## 3. Feature Gap Analysis

### 3.1 The App Doesn't Know What Time It Is

**The Problem:** The schedule page shows a static timeline. There is no indication of what is happening *right now*, what's coming up next, or what's already passed. On event day, the most critical question an attendee asks is "What should I be doing RIGHT NOW?" — and the app can't answer it.

**Current State:**
- Utility functions `isCurrentEvent()` and `isUpcoming()` exist in `lib/utils.ts` but are **never used** anywhere in the UI
- The countdown timer shows pre-event / live / over states, but no per-item awareness
- No visual distinction between past, current, and future schedule items on event day

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **"Now & Up Next" Banner** | Persistent banner on home page and schedule page showing the current event and what's next with a countdown. This is the #1 most-used feature in all major festival apps. | Critical — reduces decision fatigue, the top reason users open festival apps |
| **Timeline Time Marker** | A horizontal "now" line on the schedule timeline that auto-scrolls to the current position, with past events dimmed | High — visual context at a glance |
| **Schedule Item State Styling** | Past items greyed out, current item highlighted with a pulsing indicator, upcoming items full colour | High — information hierarchy |

**Borrowed From:** Glastonbury ("Today Screen"), SXSW GO ("Events Nearby" sorted by time), Coachella (Live Activities on lock screen)

---

### 3.2 No Personalisation or Favouriting

**The Problem:** Every attendee sees the same content. There's no way to mark items of interest, build a personal itinerary, or get reminders for things they care about. Research shows personalisation is the #1 driver of repeat app opens during an event.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Favourite Schedule Items** | Heart/star toggle on schedule items, saved to localStorage, filterable to show "My Schedule" | High — drives engagement, proven by Glastonbury/Coachella |
| **Favourite Food Stalls** | Bookmark stalls to find them quickly later | Medium |
| **Pre-Event Reminders** | Local notification 5 minutes before a favourited item starts (Notification API, no server needed) | High — prevents missed highlights |

**Borrowed From:** Glastonbury (favourites with clash detection), Coachella (starred artist alerts with 15-min pre-show reminders, home screen widget)

---

### 3.3 No "What's Near Me" Context on the Map

**The Problem:** The map shows all 12 markers simultaneously with no way to filter, search, or understand proximity. When someone is standing near the Food Court and wants the nearest water station, they have to visually scan all markers.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Map Marker Filtering** | Filter buttons by type (food, water, toilets, stages, etc.) to reduce visual clutter | High — usability |
| **Search/Quick Find** | Text search or quick buttons: "Find Toilets", "Find Water", "Find First Aid" | Medium |
| **Colour Zone Overlays** | Show designated colour-throwing zones vs. colour-free safe zones (unique to Holi) | High — safety and inclusivity |

**Borrowed From:** Glastonbury (map search by cuisine, amenity type), Notting Hill Carnival (safer spaces marked), Coachella (GPS blue dot positioning)

---

### 3.4 No Holi-Specific Safety & Cultural Content

**The Problem:** The emergency page has generic safety tips. But Holi has very specific safety needs around colour powder (eyes, skin, breathing), hydration, clothing, phone protection, and cultural etiquette. No existing festival app properly addresses these — this is the single biggest differentiator opportunity.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Colour Safety Guide** | Dedicated section: organic vs chemical colours, eye/skin/respiratory protection, first aid for colour contact, cleanup tips | Critical — duty of care, unique differentiator |
| **Preparation Checklist** | Interactive checklist: white clothes, sunscreen/oil, zip-lock bags for valuables, sunglasses, water bottle. Checkable items saved to localStorage | High — reduces pre-event anxiety, drives app opens before event |
| **Hydration Reminders** | Timed local notifications every 30-45 minutes during the event reminding attendees to drink water | High — genuine safety value for outdoor colour events |
| **Cultural Context Page** | The story of Holi: why we celebrate, the legend of Holika, the meaning of colours, traditions. This enriches the experience beyond logistics | Medium — educational value, cultural respect, makes the app more than a logistics tool |
| **Consent & Respect Guide** | Brief guidance: ask before throwing colour at someone, respect boundaries, be mindful of children and those not participating | Medium — community safety, inclusivity |

**Borrowed From:** No direct competitor — this would be a first. Inspired by NHC's cultural storytelling on map pins and general Holi safety research from medical organisations.

---

### 3.5 No Social Sharing or Community Features

**The Problem:** The gallery stores photos locally on one device only. There's no way to share moments, tag the event hashtag, or feel like part of a collective experience. Festival apps that drive post-event engagement (and next-year return) all have some form of social features.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Share to Social** | Share buttons on schedule items, photos, and the event itself (Web Share API — works natively in PWA, no server needed) | High — viral reach, free marketing |
| **Event Hashtag Banner** | Prominent #DartfordHoli hashtag displayed with direct links to Instagram/Facebook/Twitter search results for the tag | Medium — aggregates UGC (user-generated content) |
| **Photo Caption Support** | The `GalleryPhoto.caption` field exists in TypeScript types but is never exposed in the UI — add caption input on upload | Low — nice-to-have |
| **Post-Event Recap** | "Your Holi Highlights" — summary of which events they attended, photos taken, feedback given. Shareable card. | Medium — drives social sharing and next-year anticipation |

**Borrowed From:** Glastonbury 2025 ("My Highlights" wrap with step counter), Coachella (custom AR camera filters), SXSW GO (social feed)

---

### 3.6 No Weather Awareness

**The Problem:** Holi is an outdoor event. Weather directly affects the experience (rain + colour powder = more mess and slippery surfaces; sun = dehydration risk). The FAQ mentions "the festival goes ahead rain or shine" but provides no live or forecasted weather information.

**Gap Feature:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Event Day Weather Widget** | Show temperature, conditions, and any alerts for Dartford on March 8. Can be a static pre-fetched forecast baked into the build, or a simple Open-Meteo API call (free, no key required, works with static export via client-side fetch) | High — one of the most-checked features at outdoor events |

**Borrowed From:** All major outdoor festival apps include weather integration. Research shows it's checked constantly at outdoor events.

---

### 3.7 No Accessibility Information Layer

**The Problem:** The FAQ mentions the venue is "largely flat and accessible" but there's no dedicated accessibility information. UK equality law and best practice require events to proactively communicate accessibility provisions.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Accessibility Info Page** | Dedicated page or section: wheelchair routes, accessible toilet locations, quiet/sensory-friendly zones, assistance available | High — legal and ethical responsibility |
| **Map Accessibility Layer** | Mark accessible paths, ramp locations, accessible toilets, and quiet zones on the venue map | Medium |
| **BSL / Language Info** | Note if BSL interpreters are available, and any multilingual support (Hindi, Gujarati — relevant for Holi) | Medium — cultural relevance |

**Borrowed From:** Lytham Festival (BSL interpreter info), Hay Festival (hearing loop/audio assistance locations), ADA event planning guidelines

---

### 3.8 Feedback Is a Dead End

**The Problem:** Feedback is saved to localStorage only. Organisers will never see it. There's no way to export, email, or share feedback. The form also only allows one submission per session.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Export/Share Feedback** | After submission, offer to "Share via Email" using a `mailto:` link with the feedback pre-filled, or copy to clipboard | Medium — actually gets feedback to organisers |
| **Multi-Submission** | Allow multiple feedback entries (e.g., one for food, one for entertainment) instead of single session lock | Low |

---

### 3.9 Sponsor & Volunteer Pages Are Passive

**The Problem:** Sponsor cards show name + description but the TypeScript types include `website` and `logo` fields that are defined but never populated or rendered. Volunteers show name/role/zone but have no contact mechanism.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Sponsor Website Links** | Populate and render `website` field as tappable link — sponsors expect visibility for their support | Medium — sponsor satisfaction |
| **Sponsor Logos** | Add logo images — significantly increases perceived value for sponsors | Medium |
| **Volunteer Zone Finder** | "Find a Volunteer" feature linked to the map — tap a zone to see who's assigned there | Low |

---

### 3.10 Missing Cross-Section Connections

**The Problem:** Sections exist in isolation. The schedule mentions "Food Court Area" as a location but doesn't link to the food page. The map shows markers but doesn't deep-link to related content. There's no connective tissue between sections.

**Gap Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| **Schedule-to-Map Links** | Tap a schedule item's location to jump to that marker on the map | High — natural user flow |
| **Map-to-Content Links** | Tap "Food Court" on the map to jump to the food page; tap "First Aid" to jump to emergency | High — reduces navigation friction |
| **Food-to-Map Links** | Each stall shows its location — make it tappable to show on the map | Medium |
| **Announcement-to-Schedule Links** | Announcements about schedule changes should deep-link to the relevant schedule item | Medium |

---

## 4. Competitor Feature Comparison

### Features We Should Borrow

| Feature | Source | Rationale | Complexity |
|---------|--------|-----------|------------|
| "What's On Now" banner | Glastonbury, SXSW | Single most-used festival app feature. Already have the utility functions, just not wired up. | Low |
| Favourite/star schedule items | Glastonbury, Coachella | Proven engagement driver. localStorage only, no backend needed. | Low |
| Map marker filtering | Glastonbury, Coachella | Usability essential when >10 markers. Already have marker types. | Low |
| Share via Web Share API | All major apps | Free viral reach. Native PWA capability, zero backend. | Low |
| Weather widget | All outdoor festival apps | Highly checked. Open-Meteo API is free and requires no key. | Medium |
| Pre-event preparation checklist | None (novel for Holi) | Drives pre-event app engagement. Interactive, localStorage. | Low |
| Colour safety guide | None (novel) | Unique differentiator. No competitor does this. Duty of care. | Low (content only) |
| Cultural education content | NHC (cultural map pins) | Enriches experience. Unique to cultural festivals. | Low (content only) |
| Post-event highlights recap | Glastonbury 2025 | Drives social sharing and return visits. | Medium |
| Hydration reminders | None (novel for Holi) | Genuine safety value. Notification API in PWA. | Medium |
| Cross-section deep linking | SXSW, Coachella | Connective tissue between sections. Natural UX. | Low |

### Features We Should NOT Borrow

| Feature | Source | Why Not |
|---------|--------|---------|
| NFC wristband payments | Tomorrowland, Coachella | Requires hardware infrastructure. Overkill for a free community event. |
| GPS live location sharing | Glastonbury 2025 | Requires real-time backend, privacy concerns, battery drain. |
| AI/ML recommendations | SXSW GO | 11 schedule items don't need AI to navigate. |
| AR camera filters | Coachella | High development cost, low ROI for a single-day community event. |
| Attendee directory / networking | SXSW GO | Conference feature, not festival feature. |
| In-app messaging | Various | WhatsApp and social media already serve this need. |
| Spotify integration | Glastonbury | Not a music-focused festival. |
| Gamification / leaderboards | Various | Adds complexity without clear value for a 4-hour community event. |

---

## 5. User Persona Analysis

### Persona 1: Priya — The Family Organiser

**Who:** Mother of two (ages 5 and 9), lives in Dartford, active in the local community. First time bringing the family to a Holi festival. Wants her kids to connect with their cultural heritage.

**Core Problem:** She needs to manage logistics for her entire family at an unfamiliar outdoor event — keeping everyone safe, fed, and entertained while juggling timing, kids' needs, and colour powder concerns.

**Emotional State:** Excited but anxious. Worried about colour powder safety for her kids, whether there's food her younger child will eat (allergies), and where the toilets are.

| Feature | Value to Priya |
|---------|---------------|
| **Preparation Checklist** (gap) | Reduces pre-event anxiety massively. "Have I packed everything?" becomes checkable, not stressful. |
| **Colour Safety Guide** (gap) | Directly answers her biggest worry. How to protect kids' eyes and skin. What to do if something goes wrong. |
| **Schedule with "Now & Next"** (gap) | Lets her plan family movements without constantly checking the time. "Kids' Dance Workshop is next in 15 minutes!" |
| **Favourite Schedule Items** (gap) | Stars the kids' workshop and colour throws so she won't miss them. |
| **Map with Marker Filtering** (gap) | Quickly finds the nearest toilet, water station, or first aid without scanning the whole map. |
| **Food Page with Dietary Filter** (existing) | Finds nut-free options for her younger child instantly. |
| **Emergency Call Buttons** (existing) | Peace of mind. One tap to call if something happens. |
| **FAQ** (existing) | Answers "Is it suitable for children?" before she even arrives. |
| **Countdown Timer** (existing) | Builds excitement with the kids: "Only 3 more sleeps!" |
| **Hydration Reminders** (gap) | Reminds her to make the kids drink water — easily forgotten in the excitement. |
| **Weather Widget** (gap) | Decides whether to bring raincoats or extra sun cream. |

---

### Persona 2: Rav — The First-Timer

**Who:** 22-year-old university student, born in the UK, never attended a Holi festival before. Saw an Instagram post and is coming with three friends. Wants great photos for social media.

**Core Problem:** He doesn't know what Holi is really about, what to expect, what to wear, or how to participate. He wants to have the best time possible and capture shareable moments.

**Emotional State:** Curious and enthusiastic. Wants to look like he knows what he's doing. Doesn't want to seem ignorant of the culture.

| Feature | Value to Rav |
|---------|---------------|
| **Cultural Context Page** (gap) | Lets him understand Holi's meaning before arriving. He can talk about it knowledgeably with friends. Feels respectful, not just performative. |
| **Preparation Checklist** (gap) | Tells him exactly what to wear and bring. No guesswork. |
| **Gallery with Photo Upload** (existing) | Stores his photos. |
| **Share to Social** (gap) | One-tap share of photos with #DartfordHoli — exactly what he's there for. |
| **Colour Safety Guide** (gap) | Practical tips he wouldn't have thought of (oil on skin before, sunglasses, zip-lock for phone). |
| **Schedule Timeline** (existing) | Knows when the colour throws happen so he and his friends are in the right place. |
| **"Now & Next" Banner** (gap) | Answers "What should we do now?" without needing to figure out the schedule. |
| **Quick Nav** (existing) | Gets to any section fast — low cognitive load. |
| **Consent Guide** (gap) | Knows the etiquette without having to ask awkward questions. |
| **Post-Event Recap** (gap) | Shareable "My Holi Highlights" card for Instagram stories. |

---

### Persona 3: Mrs. Patel — The Elder Community Member

**Who:** 68-year-old retired teacher, has celebrated Holi in India for decades. Active in the local Hindu community. Not very tech-savvy. Uses a smartphone but only for WhatsApp and phone calls.

**Core Problem:** She needs simple, clear information she can access without navigating complex menus. Large text, obvious buttons, and minimal steps. She's coming to enjoy the atmosphere, not to engage with technology.

**Emotional State:** Happy to see Holi celebrated locally. Slightly overwhelmed by apps. Will ask a family member to "show me on the phone."

| Feature | Value to Mrs. Patel |
|---------|---------------|
| **Large Tap Targets (48px+)** (existing) | She can actually press the buttons without frustration. |
| **Emergency Call Buttons** (existing) | One tap to call for help. No dialling, no searching. |
| **Quick Nav Grid** (existing) | Visual icons she can understand without reading. |
| **Bottom Navigation** (existing) | Always visible, persistent way to move between key sections. |
| **Schedule Timeline** (existing) | Simple visual flow of the day. |
| **Water Station Locations** (existing) | Knows where to find water, essential for someone who may tire more quickly. |
| **FAQ (Accessibility)** (existing) | Confirms the venue is accessible. |
| **PWA Offline** (existing) | No app store — someone just opens a link for her. It works even if signal drops. |
| **Accessibility Info Page** (gap) | Would confirm seating areas, accessible routes, quiet zones. |
| **BSL / Language Info** (gap) | Confirmation if Hindi-speaking volunteers are available. |

---

### Persona 4: Jake — The Event Volunteer

**Who:** 30-year-old local council worker volunteering as a Car Park Marshall. First time volunteering at a community event. Needs to know his duties, who to report to, and how to handle incidents.

**Core Problem:** He needs quick access to operational information — his zone, his coordinator's contact, emergency procedures — while also staying aware of schedule changes so he can direct attendees.

**Emotional State:** Willing and enthusiastic but slightly uncertain about protocols.

| Feature | Value to Jake |
|---------|---------------|
| **Schedule with "Now & Next"** (gap) | Knows what's happening so he can direct attendees ("The colour throw starts in 5 minutes at the open area"). |
| **Map with Marker Types** (existing) | Knows where everything is when people ask him. |
| **Emergency Page** (existing) | Has all emergency numbers instantly available. |
| **Announcements** (existing) | Stays informed of any live changes (schedule delays, safety alerts). |
| **Volunteer Zone Finder** (gap) | Sees who else is volunteering in nearby zones if he needs backup. |
| **Cross-Section Deep Links** (gap) | Quickly jumps from a schedule item to the map to direct someone. |
| **Weather Widget** (gap) | Knows if rain is coming and can prepare accordingly. |

---

### Persona 5: Sunita — The Festival Organiser

**Who:** Festival Director. Has been planning this for 6 months. On event day, she's managing volunteers, handling problems, and making real-time decisions.

**Core Problem:** She needs the app to be a reliable information source so attendees stop asking volunteers basic questions. She also needs to understand how the event went afterwards (feedback, engagement, issues).

**Emotional State:** Stressed and busy. Needs the app to reduce her workload, not add to it.

| Feature | Value to Sunita |
|---------|---------------|
| **All Information Pages** (existing) | Every question an attendee asks is answerable via the app. Reduces volunteer burden. |
| **Lost & Found** (existing) | Centralises found item reports instead of random people handing things to random volunteers. |
| **Feedback Form** (existing) | Collects structured feedback she can review later. |
| **Export/Share Feedback** (gap) | Currently feedback is trapped in individual browsers. She needs it emailed or exportable. |
| **Announcements Page** (existing) | Static currently — if made editable (JSON update + redeploy), she could push live updates. |
| **Sponsor Page with Links/Logos** (gap) | Sponsors expect to see their logos and links. Their continued support depends on perceived value. |
| **Post-Event Analytics** (gap) | Understanding which pages were most visited, how many people used the app. |
| **Preparation Checklist** (gap) | Reduces the flood of "What should I wear?" messages on social media. |

---

## 6. Persona-Feature Value Matrix

| Feature | Priya (Family) | Rav (First-Timer) | Mrs. Patel (Elder) | Jake (Volunteer) | Sunita (Organiser) |
|---------|:-:|:-:|:-:|:-:|:-:|
| **Now & Up Next Banner** | HIGH | HIGH | MED | HIGH | MED |
| **Favourite Schedule Items** | HIGH | HIGH | LOW | MED | LOW |
| **Preparation Checklist** | HIGH | HIGH | LOW | LOW | HIGH |
| **Colour Safety Guide** | HIGH | HIGH | LOW | MED | HIGH |
| **Cultural Context Page** | MED | HIGH | LOW | LOW | MED |
| **Map Marker Filtering** | HIGH | MED | MED | HIGH | LOW |
| **Cross-Section Deep Links** | MED | MED | MED | HIGH | LOW |
| **Weather Widget** | HIGH | MED | MED | HIGH | HIGH |
| **Hydration Reminders** | HIGH | MED | HIGH | MED | MED |
| **Share to Social** | LOW | HIGH | LOW | LOW | HIGH |
| **Post-Event Recap** | MED | HIGH | LOW | LOW | HIGH |
| **Export Feedback** | LOW | LOW | LOW | LOW | HIGH |
| **Sponsor Links/Logos** | LOW | LOW | LOW | LOW | HIGH |
| **Accessibility Info** | MED | LOW | HIGH | MED | HIGH |
| **Consent & Respect Guide** | MED | HIGH | LOW | HIGH | HIGH |

---

## 7. Recommended Implementation Priority

### Tier 1 — Must-Have Before Event Day (Low Effort, High Impact)

These features require no backend, no new APIs, and minimal code. They use existing data and utility functions.

1. **"Now & Up Next" Banner** — Wire up the existing `isCurrentEvent()` and `isUpcoming()` functions to a banner on home and schedule pages
2. **Schedule Item State Styling** — Dim past items, highlight current, show countdown to next
3. **Favourite Schedule Items** — Star toggle saved to localStorage, "My Schedule" filter tab
4. **Preparation Checklist** — New data file + interactive checkbox page with localStorage
5. **Colour Safety Guide** — New data file + dedicated content page
6. **Cross-Section Deep Links** — Link schedule locations to map markers, map markers to content pages
7. **Share via Web Share API** — Add share button to schedule items, gallery photos, and the event itself
8. **Map Marker Type Filter** — Add filter buttons above the map (same pattern as schedule/food filters)
9. **Sponsor Website Links** — Populate and render the existing `website` field

### Tier 2 — High Value, Moderate Effort

10. **Cultural Context Page** — Story of Holi, meaning of colours, traditions (content page)
11. **Weather Widget** — Client-side fetch from Open-Meteo API (free, no key)
12. **Consent & Respect Guide** — Brief content section within safety/FAQ
13. **Accessibility Info Section** — Dedicated page or FAQ section expansion
14. **Feedback Export** — `mailto:` link or clipboard copy of feedback data after submission
15. **Hydration Reminders** — Notification API with timed intervals during event hours

### Tier 3 — Differentiators for Next Year

16. **Post-Event Recap** — "My Holi Highlights" shareable summary card
17. **Colour Zone Map Overlays** — Visual zones on the map (colour-throwing vs. colour-free)
18. **Community Photo Feed** — QR-code-based upload to a shared gallery
19. **Live Announcements** — Polling mechanism or simple JSON refresh for real-time updates
20. **Volunteer Zone Finder** — Map integration showing which volunteer covers which area
21. **Push Notifications** — Service worker notification support for schedule reminders and announcements

---

## 8. Competitive Positioning

### The Market Gap

| Competitor Type | Example | App Quality | Holi-Specific? |
|----------------|---------|-------------|----------------|
| Major music festivals | Glastonbury, Coachella | Excellent native apps, millions in budget | No |
| UK cultural festivals | Notting Hill Carnival | Basic digital map, no full app | No |
| UK community festivals | Leicester Diwali, Melas | No dedicated apps — websites and social media only | No |
| Holi-specific apps | Various on app stores | Novelty photo frame / greeting card apps only | Surface-level |

**There is no well-built, dedicated Holi festival app or PWA anywhere.** The Dartford Holi App, with the gap features implemented, would be the first of its kind — a complete event companion purpose-built for a colour festival. The PWA format (no app store, instant access via QR code, works offline) is the correct delivery mechanism for a single-day community event.

### Unique Differentiators (No Competitor Has These)

1. **Colour Safety Guide** — No festival app addresses colour powder safety
2. **Hydration Reminders** — Novel for festival apps
3. **Cultural Education** — Most festival apps are logistics-only; embedding cultural storytelling adds depth
4. **Preparation Checklist** — Interactive pre-event engagement tool
5. **Consent & Respect Guide** — Proactive community safety, not just reactive emergency info

---

## 9. Sources

- Vodafone Glastonbury 2025 App — vodafone.co.uk/newscentre
- Glastonbury 2025 App Features — stuff.tv, timeout.com
- Coachella Official — App Store, laweeklymagazine.com
- Tomorrowland App — App Store
- SXSW GO — sxsw.com/mobile
- Notting Hill Carnival Map — trippin.world, nhcarnival.org
- PWA vs Native for Events 2025 — pressonetwork.com, appcraft.events
- Eventbase Festival Platform — eventbase.com
- Holi Safety Research — holifestival.org, medanta.org, floodlightz.com
- Festival UX Best Practices — ticketfairy.com
- UK Festival Accessibility — hayfestival.com, ADA planning guides
- Event Engagement Metrics — fielddrive.com, businessofapps.com
