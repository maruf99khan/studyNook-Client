import { useEffect, useState } from "react";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import Spinner from "../components/Spinner";

export default function MyListings(){
  const [rooms,setRooms]=useState([]);
  const [load,setLoad]=useState(true);
  useEffect(()=>{
    document.title="StudyNook – My Listings";
    api.get("/api/rooms/mine").then(r=>{ setRooms(r.data); setLoad(false)}).catch(()=> setLoad(false));
  },[]);
  if(load) return <Spinner/>;
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <h1 className="font-display text-[24px] font-bold text-ink">My Listings</h1>
      {rooms.length===0 ? <p className="text-center py-16 text-muted">No listings yet.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {rooms.map(r=> <RoomCard key={r._id} room={r}/>)}
        </div>
      )}
    </div>
  )
}
// listings
