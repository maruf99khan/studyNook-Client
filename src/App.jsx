import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRoom from "./pages/AddRoom";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Private({children}){
  const {user, loading}=useContext(AuthContext);
  if(loading) return <div className="text-center py-20 text-sm">Loading...</div>;
  if(!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-paper flex flex-col">
          <Navbar/>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/rooms" element={<Rooms/>} />
              <Route path="/rooms/:id" element={<RoomDetails/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/add-room" element={<Private><AddRoom/></Private>} />
              <Route path="/my-listings" element={<Private><MyListings/></Private>} />
              <Route path="/my-bookings" element={<Private><MyBookings/></Private>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <Footer/>
        </div>
        <Toaster position="top-center"/>
      </BrowserRouter>
    </AuthProvider>
  )
}
