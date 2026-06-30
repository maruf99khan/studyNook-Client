import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import api from "../utils/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (fbUser)=>{
      if(fbUser){
        // try to get jwt cookie via backend google login already, but set local user
        setUser({
          name: fbUser.displayName,
          email: fbUser.email,
          photo: fbUser.photoURL,
          uid: fbUser.uid
        });
      } else {
        // check cookie session
        try{
          const res = await api.get("/api/auth/me");
          setUser(res.data.user);
        }catch(e){
          setUser(null);
        }
      }
      setLoading(false);
    });
    return ()=> unsub();
  },[]);

  const logout = async()=>{
    await api.post("/api/auth/logout");
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user,setUser,loading,logout}}>
      {children}
    </AuthContext.Provider>
  )
}
