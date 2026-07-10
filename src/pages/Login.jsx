import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";

export default function Login(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const navigate=useNavigate();
  const loc=useLocation();
  const {setUser}=useContext(AuthContext);
  const from = loc.state?.from || "/";

  const handleLogin = async(e)=>{
    e.preventDefault();
    const isDemo = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes("Demo") || import.meta.env.VITE_FIREBASE_API_KEY.includes("AIzaSyDemo");
    try{
      if(!isDemo){
        await signInWithEmailAndPassword(auth, email, pass);
      }
      const res = await api.post("/api/auth/login",{email, password: pass});
      setUser(res.data.user);
      toast.success("Login success");
      navigate(from,{replace:true});
    }catch(err){
      if(isDemo){
        try{
          const res2 = await api.post("/api/auth/login",{email, password: pass});
          setUser(res2.data.user);
          toast.success("Login success");
          navigate(from,{replace:true});
          return;
        }catch(e2){}
      }
      toast.error("Invalid email or password");
    }
  }

  const google = async()=>{
    try{
      const r = await signInWithPopup(auth, googleProvider);
      const idToken = await r.user.getIdToken();
      const res = await api.post("/api/auth/google",{idToken, email: r.user.email, name: r.user.displayName, photo: r.user.photoURL});
      setUser(res.data.user);
      toast.success("Login success");
      navigate("/");
    }catch(e){ 
      const isDemo = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes("Demo") || import.meta.env.VITE_FIREBASE_API_KEY.includes("AIzaSyDemo");
      if(isDemo){
        try{
          const res = await api.post("/api/auth/google",{email:"demo.google@studynook.com", name:"Demo Google", photo:"https://i.pravatar.cc/100", uid:"demo-google"});
          setUser(res.data.user);
          toast.success("Login success");
          navigate("/");
          return;
        }catch(err2){ /* ignore */ }
      }
      toast.error("Google login failed")
    }
  }

  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="font-display text-[24px] font-bold text-ink">Welcome back</h1>
      <form onSubmit={handleLogin} className="mt-6 space-y-3 bg-white border border-line rounded-2xl p-6">
        <input type="email" required placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        <input type="password" required placeholder="Password" value={pass} onChange={e=> setPass(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        <button className="w-full py-2.5 bg-ink text-paper rounded-full text-sm">Login</button>
        <button type="button" onClick={google} className="w-full py-2.5 border border-line rounded-full text-sm bg-white">Continue with Google</button>
        <p className="text-sm text-center text-muted">Don't have an account? <Link to="/register" className="text-ink underline">Register</Link></p>
      </form>
    </div>
  )
}
