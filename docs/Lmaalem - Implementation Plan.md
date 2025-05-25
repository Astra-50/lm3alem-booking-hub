# **Lmaalem \- Implementation Plan**

## **🛠️ Step-by-Step Action Plan**

### **Phase 1: MVP Launch**

**Goal:** Deliver core features for browsing, booking, and admin management

1. **Project Setup**

   * Initialize project with Vite \+ React \+ TypeScript

   * Set up Tailwind CSS with RTL plugin

   * Configure shadcn/ui components

   * Connect frontend to Supabase instance

2. **Supabase Configuration**

   * Create `ServiceProvider` and `BookingRequest` tables

   * Enable public read access for providers, secure write access for bookings

   * Store profile images in Supabase Storage

3. **Frontend Pages**

   * Homepage with city/service selectors (Dropdown UI)

   * Provider Listing Page (filtered list by city/service)

   * Provider Profile Page (detailed info \+ CTA to book)

   * Booking Form Page (submission linked to provider)

   * Confirmation Page (success message \+ WhatsApp deep link)

   * Admin Page (protected route for data management)

4. **Admin Access Logic**

   * Simple password gate for Admin page

   * Use environment variable or protected route to hide admin link

5. **Testing & QA**

   * Device testing across iOS and Android

   * RTL display verification and form validation

   * Booking flow end-to-end check (data stored in Supabase)

6. **Deployment**

   * Deploy to Vercel or Netlify with Supabase connected

   * Monitor real-time database updates during first usage phase

### **Phase 2: Post-MVP Improvements**

* Filter listings by availability

* Add basic analytics to admin view (e.g., booking counts)

* Improve admin UI with editable fields and batch actions

* Add WhatsApp message templates or quick links

### **Phase 3: Optional AI Features**

* Build an assistant interface (Arabic/French)

* Integrate logic to recommend providers based on:

  * Location proximity

  * Availability match

  * Booking history or ratings

## **👥 Team Recommendations**

* **Solo Founder/Developer:** MVP is doable solo with modern tools

* **Optionally:** Add a UI/UX designer or Arabic localization QA tester

## **✅ Optional Tasks & Integrations**

* WhatsApp API for business account linking (future phase)

* RTL UI QA library or browser plugin for validation

* CMS (e.g., Notion, Sanity) if switching to more editorial content later

* Stripe integration if moving to pre-payments in later phase

