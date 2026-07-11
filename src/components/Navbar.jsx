import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
  const {user, logout} = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 bg-paper border-b border-line">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ink text-paper grid place-items-center rounded">
            <span className="text-sm font-bold">SN</span>
          </div>
          <span className="font-display font-bold text-[20px] text-ink tracking-tight">StudyNook</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=> isActive? "text-ink font-semibold underline underline-offset-4" : "text-muted hover:text-ink"}>Home</NavLink>
          <NavLink to="/rooms" className={({isActive})=> isActive? "text-ink font-semibold underline underline-offset-4" : "text-muted hover:text-ink"}>Rooms</NavLink>
          {user && <>
            <NavLink to="/add-room" className={({isActive})=> isActive? "text-ink font-semibold" : "text-muted"}>Add Room</NavLink>
            <NavLink to="/my-listings" className={({isActive})=> isActive? "text-ink font-semibold" : "text-muted"}>My Listings</NavLink>
            <NavLink to="/my-bookings" className={({isActive})=> isActive? "text-ink font-semibold" : "text-muted"}>My Bookings</NavLink>
          </>}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={()=>setProfileOpen(!profileOpen)} aria-expanded={profileOpen} className="flex items-center gap-2">
                <img src={user.photo || "https://i.pravatar.cc/100"} className="w-8 h-8 rounded-full object-cover border border-line" alt="" />
                <span className="hidden md:block text-sm font-medium text-ink">{user.name || user.email}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-line rounded-xl shadow p-2 text-sm">
                  <Link to="/my-listings" onClick={()=>setProfileOpen(false)} className="block px-3 py-2 hover:bg-paper rounded">My Listings</Link>
                  <Link to="/my-bookings" onClick={()=>setProfileOpen(false)} className="block px-3 py-2 hover:bg-paper rounded">My Bookings</Link>
                  <button onClick={logout} className="w-full text-left px-3 py-2 hover:bg-paper rounded text-rose-600">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden md:inline text-sm px-4 py-2 border border-ink text-ink rounded-full">Login</Link>
              <Link to="/register" className="text-sm px-5 py-2 bg-ink text-paper rounded-full">Register</Link>
            </>
          )}
          <button className="md:hidden" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>☰</button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-paper px-4 py-3 flex flex-col gap-2 text-sm">
          <Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
          <Link to="/rooms" onClick={()=>setMenuOpen(false)}>Rooms</Link>
          {user && <>
            <Link to="/add-room" onClick={()=>setMenuOpen(false)}>Add Room</Link>
            <Link to="/my-listings" onClick={()=>setMenuOpen(false)}>My Listings</Link>
            <Link to="/my-bookings" onClick={()=>setMenuOpen(false)}>My Bookings</Link>
            <button onClick={logout} className="text-left text-rose-600">Logout</button>
          </>}
          {!user && <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>}
        </div>
      )}
    </nav>
  )
}
