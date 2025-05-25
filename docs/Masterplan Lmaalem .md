# **Lmaalem \- Masterplan**

## **🧭 App Overview and Objectives**

Lmaalem is a local service booking platform built for Moroccan cities, focused on helping users find and book **trusted, verified service providers** like cleaners, plumbers, and handymen. The goal is to deliver a **fast, culturally native, mobile-first web experience** with full **RTL Arabic support** and a simple, secure admin interface.

## **🎯 Target Audience**

* Arabic-speaking residents of Moroccan cities (starting with Casablanca, Rabat, Salé)

* Users seeking **reliable and vetted** service providers

* Internal admin team responsible for managing providers and booking requests

## **🧩 Core Features and Functionality**

* **City and Service Selection on Homepage**

* **Filtered Listings of Providers** based on selection

* **Detailed Provider Profiles** with experience, availability, and WhatsApp contact

* **Booking Request Form** tied to a specific provider

* **Confirmation and WhatsApp Follow-up**

* **Admin View:** to manage providers and booking statuses securely

## **🛠️ High-Level Tech Stack**

* **Frontend:** Vite, React (with TypeScript), shadcn/ui, Tailwind CSS \+ RTL support

* **Backend & DB:** Supabase (database, auth, API)

* **Storage:** Supabase Storage for profile images

* **Authentication:** None (admin access gated by passworded URL)

* **Hosting:** Vercel, Netlify, or Supabase hosting

## **🗃️ Conceptual Data Model**

### **`ServiceProvider`**

* ID

* Name

* City

* Neighborhood

* Service Type

* Experience Description (in Arabic)

* Languages Spoken

* Availability (days/times)

* Verified (boolean)

* WhatsApp Link

* Profile Image URL

### **`BookingRequest`**

* ID

* Full Name

* Phone Number

* Optional WhatsApp Number

* Requested Date/Time

* Description of Work

* Linked `ServiceProviderID`

* Status (New, Contacted, Completed)

## **🎨 User Interface Design Principles**

* RTL by default with Arabic typography

* Mobile-first with clear visual hierarchy

* Clean, card-based UI

* Fonts: Cairo or Tajawal for Arabic readability

* Whitespace-rich layout with intuitive tap targets

## **🔐 Security Considerations**

* Admin route gated by password (not public or guessable)

* All submissions routed through Supabase with server-side validation

* No sensitive auth or payment data stored in MVP phase

## **🚧 Development Phases**

### **Phase 1: MVP**

* Static city/service selector \+ dynamic provider list

* Basic profile and booking form functionality

* Admin-only management UI

### **Phase 2: Feedback-Based Enhancements**

* Filter by availability or language

* Provider rating or review indicators (non-public for now)

* Admin analytics dashboard

### **Phase 3: AI Assistant (Optional/Future)**

* Chat assistant (Arabic/French) for recommending providers or helping users complete bookings

* Smart suggestions based on time, location, and prior data

## **🧗 Potential Challenges**

* Full RTL compatibility with modern UI frameworks

* Ensuring mobile performance in low-bandwidth areas

* Gating admin access securely without full auth system

* Scaling to other cities or more complex categories in future

## **🚀 Future Expansion Possibilities**

* Allowing providers to self-manage via login panel

* SMS/WhatsApp booking confirmations

* In-app chat or call integrations

* Ratings, reviews, and community reputation layer

* Multi-language interface (French \+ Arabic toggle)

* Payment gateway integration for pre-paid services

