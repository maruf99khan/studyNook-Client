import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import Spinner from "../components/Spinner";

export default function Home(){
  const [rooms,setRooms]=useState([]);
  const [load,setLoad]=useState(true);
  useEffect(()=>{
    document.title="StudyNook – Home";
    api.get("/api/rooms?limit=6").then(r=>{
      setRooms(r.data);
      setLoad(false);
    }).catch(()=> setLoad(false));
  },[]);

  if(load) return <Spinner/>;

  return (
    <div>
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-[36px] md:text-[52px] leading-[0.95] tracking-tight text-ink font-bold">Find Your Perfect<br/><span className="text-gold">Study Room</span></h1>
          <p className="text-muted mt-4 max-w-[48ch] leading-relaxed">Browse and book quiet, private study rooms in your library. List your own room and earn.</p>
          <Link to="/rooms" className="inline-block mt-6 px-7 py-3 bg-ink text-paper rounded-full text-sm font-medium">Explore Rooms →</Link>
          <div className="flex gap-6 mt-8 text-sm">
            <div><div className="font-bold text-ink text-lg">120+</div><div className="text-muted text-xs">Rooms listed</div></div>
            <div className="w-px bg-line"></div>
            <div><div className="font-bold text-ink text-lg">4.8★</div><div className="text-muted text-xs">Avg rating</div></div>
          </div>
        </div>
        <div className="relative h-[380px] md:h-[440px]">
          <img src="https://images.unsplash.com/photo-1526245991693-74a0f82f2851?w=800&q=80" className="absolute top-0 right-0 w-[68%] h-[60%] object-cover rounded-2xl border border-line shadow" alt="" />
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" className="absolute bottom-0 left-0 w-[60%] h-[52%] object-cover rounded-2xl border border-line shadow" alt="" />
          <div className="absolute bottom-6 right-6 bg-white border border-line rounded-xl p-3 shadow flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-forest text-white grid place-items-center text-xs">✓</div>
            <div><div className="text-xs font-semibold text-ink">Instant Booking</div><div className="text-[11px] text-muted">No double booking</div></div>
          </div>
        </div>
      </section>

      {/* Available */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[26px] font-bold text-ink">Available Study Rooms</h2>
          <Link to="/rooms" className="text-sm text-muted underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {rooms.map(r=> <RoomCard key={r._id} room={r}/>)}
        </div>
      </section>

      {/* Extra 1 - How it works */}
      <section className="bg-paper border-y border-line mt-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
          <h2 className="font-display text-[22px] font-bold text-ink text-center">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {t:"Browse rooms",d:"Search by name, filter by amenities, see floor and rate."},
              {t:"Pick a slot",d:"Choose date and hourly slot 08:00-20:00. Price computed live."},
              {t:"Book instantly",d:"Conflict check prevents double booking. Manage in My Bookings."}
            ].map(s=>(
              <div key={s.t} className="bg-white border border-line rounded-xl p-6">
                <div className="w-8 h-8 bg-ink text-paper rounded-full grid place-items-center text-sm">{s.t[0]}</div>
                <h3 className="font-semibold mt-3 text-ink">{s.t}</h3>
                <p className="text-sm text-muted mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra 2 - Why */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" className="rounded-2xl border border-line object-cover h-[360px] w-full" alt="" />
        <div>
          <h2 className="font-display text-[24px] font-bold text-ink">A quieter campus starts here</h2>
          <p className="text-muted mt-3 leading-relaxed">Owners list rooms they control. Students book what they need. No noise, no double-booking, no hidden fees. Built for the library, not the marketplace.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-forest">—</span> Floor-wise browsing and seat capacity at a glance</li>
            <li className="flex gap-2"><span className="text-forest">—</span> Hourly rate, amenities, and booking count shown</li>
            <li className="flex gap-2"><span className="text-forest">—</span> Owner-only edit/delete, secure JWT httpOnly cookie</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
// hero done
