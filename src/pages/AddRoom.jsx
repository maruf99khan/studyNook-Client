import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const options = ["Whiteboard","Projector","Wi-Fi","Power Outlets","Quiet Zone","Air Conditioning"];

export default function AddRoom(){
  const [form,setForm]=useState({name:"",description:"",image:"",floor:"",capacity:"",hourlyRate:"",amenities:[]});
  const nav=useNavigate();

  const toggle = (a)=>{
    if(form.amenities.includes(a)) setForm({...form, amenities: form.amenities.filter(x=> x!==a)});
    else setForm({...form, amenities: [...form.amenities, a]});
  }

  const submit = async(e)=>{
    e.preventDefault();
    try{
      await api.post("/api/rooms",{
        name: form.name,
        description: form.description,
        image: form.image,
        floor: form.floor,
        capacity: Number(form.capacity),
        hourlyRate: Number(form.hourlyRate),
        amenities: form.amenities
      });
      toast.success("Room added successfully");
      nav("/my-listings");
    }catch(err){ toast.error(err.response?.data?.message || "Failed")}
  }

  return (
    <div className="max-w-[640px] mx-auto px-4 py-8">
      <h1 className="font-display text-[24px] font-bold text-ink">Add Room</h1>
      <form onSubmit={submit} className="mt-6 bg-white border border-line rounded-2xl p-6 space-y-3 text-sm">
        <input required placeholder="Room Name" className="w-full border border-line rounded-xl px-3 py-2.5" value={form.name} onChange={e=> setForm({...form, name:e.target.value})} />
        <textarea required placeholder="Description" className="w-full border border-line rounded-xl px-3 py-2.5" value={form.description} onChange={e=> setForm({...form, description:e.target.value})} />
        <input required placeholder="Image URL from internet" className="w-full border border-line rounded-xl px-3 py-2.5" value={form.image} onChange={e=> setForm({...form, image:e.target.value})} />
        <div className="grid grid-cols-3 gap-3">
          <input required placeholder="3rd Floor" className="border border-line rounded-xl px-3 py-2.5" value={form.floor} onChange={e=> setForm({...form, floor:e.target.value})} />
          <input required type="number" placeholder="Capacity 4" className="border border-line rounded-xl px-3 py-2.5" value={form.capacity} onChange={e=> setForm({...form, capacity:e.target.value})} />
          <input required type="number" placeholder="$5/hr" className="border border-line rounded-xl px-3 py-2.5" value={form.hourlyRate} onChange={e=> setForm({...form, hourlyRate:e.target.value})} />
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map(o=>(
            <label key={o} className={`px-3 py-1.5 rounded-full border text-xs cursor-pointer ${form.amenities.includes(o) ? "bg-ink text-paper border-ink" : "bg-paper border-line"}`}>
              <input type="checkbox" className="hidden" checked={form.amenities.includes(o)} onChange={()=> toggle(o)} /> {o}
            </label>
          ))}
        </div>
        <button className="w-full py-2.5 bg-ink text-paper rounded-full">Add Room</button>
      </form>
    </div>
  )
}
// add room form ok
