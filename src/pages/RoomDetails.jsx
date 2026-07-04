import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function RoomDetails(){
  const {id}=useParams();
  const [room,setRoom]=useState(null);
  const [load,setLoad]=useState(true);
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  const [showBook,setShowBook]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [form,setForm]=useState({date:"", start:"08:00", end:"09:00", note:""});
  // edit form
  const [editData,setEditData]=useState({});

  useEffect(()=>{
    api.get(`/api/rooms/${id}`).then(r=>{
      setRoom(r.data);
      setEditData(r.data);
      document.title=`StudyNook – ${r.data.name}`;
      setLoad(false);
    }).catch(()=> setLoad(false));
  },[id]);

  if(load) return <Spinner/>;
  if(!room) return <p className="text-center py-20">Room not found</p>;

  const isOwner = user && room.owner === user.email || room.ownerId === user?.uid || room.ownerEmail === user?.email;
  // fallback check via email or uid
  const ownerCheck = user && (room.owner == user.email || room.ownerEmail == user.email);

  const total = (parseInt(form.end)-parseInt(form.start))*room.hourlyRate || 0;

  const doBook = async()=>{
    if(!form.date) return toast.error("Pick a date");
    if(parseInt(form.end) <= parseInt(form.start)) return toast.error("End after start");
    try{
      await api.post("/api/bookings",{roomId: id, date: form.date, startTime: form.start, endTime: form.end, note: form.note});
      toast.success("Room booked successfully!");
      setShowBook(false);
      // refresh bookingCount
      const r = await api.get(`/api/rooms/${id}`);
      setRoom(r.data);
    }catch(e){
      toast.error(e.response?.data?.message || "Booking failed - slot taken");
    }
  }

  const doDelete = async()=>{
    if(!confirm("Delete this room?")) return;
    try{
      await api.delete(`/api/rooms/${id}`);
      toast.success("Room deleted successfully");
      navigate("/rooms");
    }catch(e){ toast.error("Delete failed")}
  }

  const doUpdate = async(e)=>{
    e.preventDefault();
    try{
      await api.put(`/api/rooms/${id}`,editData);
      toast.success("Room updated successfully");
      setShowEdit(false);
      const r= await api.get(`/api/rooms/${id}`);
      setRoom(r.data);
    }catch(err){ toast.error(err.response?.data?.message || "Update failed")}
  }

  const slots = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <img src={room.image} className="w-full h-[380px] object-cover rounded-2xl border border-line" alt="" />
      <div className="grid md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2">
          <h1 className="font-display text-[28px] font-bold text-ink">{room.name}</h1>
          <p className="text-muted mt-2 leading-relaxed">{room.description}</p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="px-3 py-1 bg-paper border border-line rounded-full">{room.floor}</span>
            <span className="px-3 py-1 bg-paper border border-line rounded-full">{room.capacity} people</span>
            <span className="px-3 py-1 bg-ink text-paper rounded-full">${room.hourlyRate}/hr</span>
            <span className="px-3 py-1 bg-white border border-line rounded-full">Bookings: {room.bookingCount || 0}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {room.amenities?.map(a=> <span key={a} className="text-xs px-3 py-1.5 bg-white border border-line rounded-full">{a}</span>)}
          </div>
          {ownerCheck && (
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setShowEdit(true)} className="px-5 py-2 border border-ink rounded-full text-sm">Edit</button>
              <button onClick={doDelete} className="px-5 py-2 bg-rose-600 text-white rounded-full text-sm">Delete</button>
            </div>
          )}
        </div>
        <div className="bg-white border border-line rounded-2xl p-6 h-fit">
          <div className="text-sm text-muted">Total cost will compute live</div>
          {user ? (
            <button onClick={()=> setShowBook(true)} className="w-full mt-3 py-3 bg-ink text-paper rounded-full text-sm font-medium">Book Now</button>
          ) : (
            <Link to="/login" className="block text-center w-full mt-3 py-3 bg-ink text-paper rounded-full text-sm">Login to Book</Link>
          )}
          <div className="text-xs text-muted mt-2 text-center">Hourly slots 08:00–20:00</div>
        </div>
      </div>

      {showBook && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-line">
            <h3 className="font-semibold text-ink">Book {room.name}</h3>
            <div className="space-y-3 mt-4 text-sm">
              <input type="date" className="w-full border border-line rounded-xl px-3 py-2" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={e=> setForm({...form, date:e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <select className="border border-line rounded-xl px-3 py-2" value={form.start} onChange={e=> setForm({...form, start:e.target.value})}>
                  {slots.map(s=> <option key={s}>{s}</option>)}
                </select>
                <select className="border border-line rounded-xl px-3 py-2" value={form.end} onChange={e=> setForm({...form, end:e.target.value})}>
                  {slots.filter(s=> parseInt(s)>parseInt(form.start)).map(s=> <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="p-3 bg-paper border border-line rounded-xl">Total Cost: <span className="font-bold text-ink">${total}</span> <span className="text-muted">({form.start}–{form.end} × ${room.hourlyRate})</span></div>
              <input placeholder="Special note (optional)" className="w-full border border-line rounded-xl px-3 py-2" value={form.note} onChange={e=> setForm({...form, note:e.target.value})} />
              <div className="flex gap-3">
                <button onClick={()=> setShowBook(false)} className="flex-1 py-2 border border-line rounded-full">Cancel</button>
                <button onClick={doBook} className="flex-1 py-2 bg-ink text-paper rounded-full">Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <form onSubmit={doUpdate} className="bg-white rounded-2xl p-6 w-full max-w-lg border border-line space-y-3 text-sm">
            <h3 className="font-semibold">Edit Room</h3>
            <input className="w-full border border-line rounded-xl px-3 py-2" value={editData.name||""} onChange={e=> setEditData({...editData, name:e.target.value})} placeholder="Room Name" required />
            <textarea className="w-full border border-line rounded-xl px-3 py-2" value={editData.description||""} onChange={e=> setEditData({...editData, description:e.target.value})} placeholder="Description" />
            <input className="w-full border border-line rounded-xl px-3 py-2" value={editData.image||""} onChange={e=> setEditData({...editData, image:e.target.value})} placeholder="Image URL" />
            <div className="grid grid-cols-3 gap-3">
              <input className="border border-line rounded-xl px-3 py-2" value={editData.floor||""} onChange={e=> setEditData({...editData, floor:e.target.value})} placeholder="Floor" />
              <input type="number" className="border border-line rounded-xl px-3 py-2" value={editData.capacity||""} onChange={e=> setEditData({...editData, capacity:e.target.value})} placeholder="Capacity" />
              <input type="number" className="border border-line rounded-xl px-3 py-2" value={editData.hourlyRate||""} onChange={e=> setEditData({...editData, hourlyRate:e.target.value})} placeholder="Rate" />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={()=> setShowEdit(false)} className="flex-1 py-2 border border-line rounded-full">Cancel</button>
              <button type="submit" className="flex-1 py-2 bg-ink text-paper rounded-full">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
// details booked
// booking cost live
