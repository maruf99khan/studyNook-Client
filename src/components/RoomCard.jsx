import { Link } from "react-router-dom";

export default function RoomCard({room}){
  const desc = room.description?.slice(0,100) || "";
  return (
    <div className="bg-white border border-line rounded-[14px] overflow-hidden flex flex-col h-[420px] hover:shadow-[0_8px_24px_rgba(26,26,23,0.08)] transition">
      <img src={room.image} alt={room.name} className="h-[48%] w-full object-cover" />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-semibold text-[18px] text-ink leading-tight">{room.name}</h3>
        <p className="text-sm text-muted line-clamp-2">{desc}{room.description?.length>100 ? "..." : ""}</p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="px-2 py-1 bg-paper border border-line rounded-full">{room.floor}</span>
          <span>{room.capacity} people</span>
          <span className="ml-auto font-semibold text-ink">${room.hourlyRate}/hr</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {room.amenities?.slice(0,3).map(a=> <span key={a} className="text-[11px] px-2 py-1 bg-paper border border-line rounded-full">{a}</span>)}
          {room.amenities?.length>3 && <span className="text-[11px] px-2 py-1 bg-ink text-paper rounded-full">+{room.amenities.length-3} more</span>}
        </div>
        <Link to={`/rooms/${room._id}`} className="mt-auto w-full text-center text-sm py-2.5 bg-ink text-paper rounded-full hover:bg-black">View Details</Link>
      </div>
    </div>
  )
}
