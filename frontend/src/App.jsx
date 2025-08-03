import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";   
import Myprofile from "./components/Myprofile";
import EditProfile from "./components/EditProfile"; // Assuming you have an EditProfile component
const App = () => {
  const { token } = useAuth();

  return (
     <Router>
       <div className="flex flex-col min-h-screen">
      <Navbar />
       <main className="flex-1">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/editprofile" element={<EditProfile />} />

      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
