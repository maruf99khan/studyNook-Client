import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [photo,setPhoto]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const navigate=useNavigate();
  const {setUser}=useContext(AuthContext);

  const validate = ()=>{
    if(pass.length<6) return "At least 6 characters";
    if(!/[A-Z]/.test(pass)) return "At least one uppercase";
    if(!/[a-z]/.test(pass)) return "At least one lowercase";
    return "";
  }

  const handle = async(e)=>{
    e.preventDefault();
    const v = validate();
    if(v){ setErr(v); return; }
    setErr("");
    try{
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user,{displayName: name, photoURL: photo});
      // save to backend mongo
      await api.post("/api/auth/register",{name,email,photoURL: photo, uid: cred.user.uid});
      toast.success("Registration successful! Please login.");
      navigate("/login");
    }catch(er){ toast.error(er.message); }
  }

  const google = async()=>{
    try{
      const r = await signInWithPopup(auth, googleProvider);
      const idToken = await r.user.getIdToken();
      const res = await api.post("/api/auth/google",{idToken, email: r.user.email, name: r.user.displayName, photo: r.user.photoURL});
      setUser(res.data.user);
      toast.success("Logged in with Google");
      navigate("/");
    }catch(e){ toast.error("Google failed")}
  }

  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="font-display text-[24px] font-bold text-ink">Create account</h1>
      <form onSubmit={handle} className="mt-6 space-y-3 bg-white border border-line rounded-2xl p-6">
        <input required placeholder="Name" value={name} onChange={e=> setName(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        <input required type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        <input required placeholder="Photo URL" value={photo} onChange={e=> setPhoto(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        <input required type="password" placeholder="Password" value={pass} onChange={e=> setPass(e.target.value)} className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" />
        {err && <p className="text-xs text-rose-600">{err}</p>}
        <button className="w-full py-2.5 bg-ink text-paper rounded-full text-sm">Register</button>
        <button type="button" onClick={google} className="w-full py-2.5 border border-line rounded-full text-sm bg-white">Continue with Google</button>
        <p className="text-sm text-center text-muted">Already have an account? <Link to="/login" className="text-ink underline">Login</Link></p>
      </form>
    </div>
  )
}
