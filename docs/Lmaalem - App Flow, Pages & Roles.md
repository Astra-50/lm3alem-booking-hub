# **Lmaalem \- App Flow, Pages & Roles**

## **🔁 User Flow Overview**

1. User visits homepage

2. Selects city \+ service → clicks CTA

3. Views filtered list of providers

4. Clicks on a provider → views profile

5. Submits a booking form

6. Sees confirmation message with WhatsApp option

7. Admin reviews new booking in secure panel

## **📄 Core Pages**

### **1\. Homepage**

* City dropdown (`اختر المدينة`)

* Service dropdown (`اختر الخدمة`)

* CTA: "اعرض مقدمي الخدمة"

### **2\. Provider Listing Page**

* Dynamic cards filtered by city \+ service

* Provider snapshot: photo, name, service, location

* Tags: "✅ موثّق من معلم", "متاح اليوم"

* CTA: "عرض الملف الشخصي"

### **3\. Provider Profile Page**

* Full profile details in Arabic

* Availability, experience, verified badge

* CTA: “احجز هذا المعلم” → links to form with provider ID

### **4\. Booking Form Page**

* Input fields: name, phone, WhatsApp, date/time, job description

* Hidden field: provider ID

* Submit → saves to Supabase `BookingRequest`

### **5\. Confirmation Page**

* Message: success \+ provider name

* Optional: WhatsApp deep link

* CTA: back to homepage

### **6\. Admin Panel (Private)**

* URL-gated \+ password form

* Table views for:

  * `ServiceProvider` list with "Verified" toggle

  * `BookingRequest` with status: جديد، تم التواصل، مكتمل

* Quick contact buttons for clients/providers

## **👥 User Roles**

### **1\. Guest User**

* Can browse, search, and submit bookings

* No login required

### **2\. Admin**

* Accesses private admin panel

* Can add/edit providers, mark bookings as completed/contacted

* Manual contact via phone or WhatsApp

### **🚫 No Provider Login (MVP)**

* All provider data managed by admin only

