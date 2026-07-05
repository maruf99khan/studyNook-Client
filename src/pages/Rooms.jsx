import { useEffect, useState } from "react";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import Spinner from "../components/Spinner";

const allAmenities = ["Whiteboard","Projector","Wi-Fi","Power Outlets","Quiet Zone","Air Conditioning"];

export default function Rooms(){
  const [rooms,setRooms]=useState([]);
  const [search,setSearch]=useState("");
  const [amenities, setAmenities] = useState([]);
  const [loading,setLoading]=useState(true);

  const fetchRooms = ()=>{
    setLoading(true);
    let q = "/api/rooms?";
    if(search) q+= `search=${search}&`;
    if(amenities.length) q+= `amenities=${amenities.join(",")}&`;
    api.get(q).then(r=>{ setRooms(r.data); setLoading(false)}).catch(()=> setLoading(false));
  }

  useEffect(()=>{
    document.title="StudyNook – Available Rooms";
    fetchRooms();
  },[]);

  // intentionally not debounced - simple beginner
  const toggleAmenity = (a)=>{
    let next;
    if(amenities.includes(a)) next = amenities.filter(x=> x!==a);
    else next = [...amenities, a];
    setAmenities(next);
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <h1 className="font-display text-[26px] font-bold text-ink">All Rooms</h1>
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <input value={search} onChange={e=> setSearch(e.target.value)} placeholder="Search by room name" className="flex-1 border border-line rounded-full px-4 py-2.5 text-sm bg-white" />
        <button onClick={fetchRooms} className="px-6 py-2.5 bg-ink text-paper rounded-full text-sm">Search</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {allAmenities.map(a=>(
          <label key={a} className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer ${amenities.includes(a) ? "bg-ink text-paper border-ink" : "bg-white border-line"}`}>
            <input type="checkbox" className="hidden" checked={amenities.includes(a)} onChange={()=> toggleAmenity(a)} /> {a}
          </label>
        ))}
      </div>

      {loading ? <Spinner/> : rooms.length===0 ? <p className="text-center py-16 text-muted">No rooms found</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {rooms.map(r=> <RoomCard key={r._id} room={r}/>)}
        </div>
      )}
    </div>
  )
}
// rooms grid
// search filter done
