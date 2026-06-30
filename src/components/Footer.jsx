import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="bg-ink text-paper mt-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold text-ink grid place-items-center rounded text-sm font-bold">SN</div>
            <span className="font-display font-bold text-lg">StudyNook</span>
          </div>
          <p className="text-sm text-white/70 mt-3 max-w-[32ch]">Quiet private study rooms in your library. List your room and earn, or book the perfect nook.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Useful Links</h4>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-white/70">studynook@mail.com</p>
          <p className="text-sm text-white/70">+880 1234 567890</p>
          <div className="flex gap-3 mt-3">
            <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs">f</a>
            <a href="https://x.com" className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs">𝕏</a>
            <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs">in</a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs">◎</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/50 py-4">
        © {new Date().getFullYear()} StudyNook. All rights reserved.
      </div>
    </footer>
  )
}
