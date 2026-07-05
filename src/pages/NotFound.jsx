import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <div className="text-center py-20">
      <h1 className="font-display text-[32px] font-bold text-ink">Page not found</h1>
      <p className="text-muted mt-2">The page you are looking for doesn't exist.</p>
      <Link to="/" className="inline-block mt-6 px-6 py-2.5 bg-ink text-paper rounded-full text-sm">Back to Home</Link>
    </div>
  )
}
// 404 added
