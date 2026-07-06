# StudyNook – Library Study Room Booking

Live: https://studyNook-Client.vercel.app

StudyNook lets students list and book quiet library study rooms with real time-slot conflict prevention.

Features:
- Browse latest 6 rooms on home via sort().limit(6) and all rooms with $regex search + $in amenities filter
- JWT httpOnly cookie auth with Google OAuth, persistent on reload via vercel.json rewrite
- Owner-only CRUD for rooms with bookingCount increment
- Hourly booking modal (08:00-20:00) with live total cost and $gte/$lte overlap check plus $push/$pull user bookings
- My Bookings with cancel for future confirmed bookings and responsive warm-paper design
- deployment to vercel
