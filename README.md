# NexusNH: Nashua Health & Hope Navigator

**NexusNH** is an anonymous Progressive Web App (PWA) to help teens and families in Nashua, NH navigate mental health, substance use, and basic needs resources.

## Tech Stack

- Frontend: React + Vite + TypeScript  
- UI Library: Material‑UI (MUI)  
- Mapping: Leaflet + OpenStreetMap  
- SMS: Twilio via serverless function  
- Data: Google Sheets API  
- Hosting: Netlify  
- PWA: Service worker + manifest via vite-plugin-pwa  

## Setup Instructions

1. Clone this repo or copy these files.  
2. `npm install`  
3. Create `.env.local` with:


4. Run locally: `npm run dev`  
5. Build: `npm run build`  
6. Preview: `npm run preview`  
7. Push to GitHub and connect to Netlify  
8. In Netlify, set environment variables (same as above)  
9. Deploy site with Netlify functions supporting `/api/send-sms`, etc.

## Project Structure & Notes

- Add geolocation (latitude/longitude) fields in your data so map markers appear  
- Implement admin update API (to write to Sheets)  
- Polish UI, add loading/error states & accessibility  
- Add more translations  
- Adjust routing & navigation if desired  
- Test PWA offline behavior & SMS in production  

Enjoy building!  
