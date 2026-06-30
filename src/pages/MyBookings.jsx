import { useEffect, useState } from "react";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function MyBookings(){
  const [bookings,setBookings]=useState([]);
  const [load,setLoad]=useState(true);
  const fetchData = ()=>{
    api.get("/api/bookings/mine").then(r=>{ setBookings(r.data); setLoad(false)}).catch(()=> setLoad(false));
  }
  useEffect(()=>{ document.title="StudyNook – My Bookings"; fetchData(); },[]);

  const cancel = async(id)=>{
    if(!confirm("Cancel this booking?")) return;
    try{
      await api.patch(`/api/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      fetchData();
    }catch(e){ toast.error("Cancel failed")}
  }

  if(load) return <Spinner/>;
  if(bookings.length===0) return <p className="text-center py-16 text-muted">You have no bookings yet.</p>;

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-8">
      <h1 className="font-display text-[24px] font-bold text-ink">My Bookings</h1>
      <div className="grid gap-4 mt-6">
        {bookings.map(b=>(
          <div key={b._id} className="bg-white border border-line rounded-xl p-4 flex gap-4 items-center">
            <img src={b.room?.image} className="w-20 h-20 object-cover rounded-xl border border-line" alt="" />
            <div className="flex-1">
              <div className="font-semibold text-ink text-sm">{b.room?.name || b.roomId}</div>
              <div className="text-xs text-muted">{b.date} • {b.startTime}–{b.endTime} • ${b.totalCost}</div>
              <span className={`inline-block mt-1 text-[11px] px-2 py-1 rounded-full ${b.status==='confirmed' ? "bg-forest text-white" : "bg-rose-600 text-white"}`}>{b.status}</span>
            </div>
            {b.status==='confirmed' && new Date(b.date) >= new Date(new Date().toISOString().split("T")[0]) && (
              <button onClick={()=> cancel(b._id)} className="px-4 py-2 border border-line rounded-full text-xs bg-white">Cancel</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
