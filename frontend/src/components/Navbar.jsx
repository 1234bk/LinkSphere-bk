import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.png"; // make sure image exists

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., API fetch, auth check)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);


  if (loading) {
    return (
       <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-[6px] border-gray-300 rounded-full"></div>
          <div className="absolute inset-0 border-[6px] border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-xl font-bold text-blue-600 animate-pulse tracking-wide">
          Loading LinkSphere...
        </p>
      </div>

    );
  }

  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">LinkSphere</Link>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4 hidden sm:flex">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right - Avatar and Admin Link */}
      <div className="flex items-center gap-4">
        {token && user?.isAdmin && (
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-600 font-medium hidden sm:block"
          >
            Admin Page
          </Link>
        )}

        <img
        {...token ? { src: avatar2 } : { src: avatar }}
          
          alt="User"
          onClick={handleOpenMenu}
          className="w-10 h-10 rounded-full cursor-pointer"
        />

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {token ? (
              [
      <MenuItem key="myprofile" onClick={() => { navigate("/myprofile"); handleCloseMenu(); }}>
        My Profile
      </MenuItem>,
      <MenuItem key="logout" onClick={() => { logout(); navigate("/"); }}>
        Logout
      </MenuItem>
    ]
          ) : (
            <MenuItem onClick={() => { navigate("/auth"); handleCloseMenu(); }}>
              Login / Sign Up
            </MenuItem>
          )}
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
