import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import api from '../api/axios';
const EditProfile = () => {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    role: user?.role || "",
    college: user?.college || "",
    skills: user?.skills?.join(", ") || "",
    age: user?.age || "",
    gender: user?.gender || "",
    description: user?.description || "",
    working: user?.working || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    try {
      // const res = await api.post(endpoint, body);
    const res = await api.put(`${BASE_URL}/auth/updateprofile`, updatedUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

      alert("Profile updated!");
    login(token, data.updatedUser); // update local storage and context
    navigate("/myprofile");
      
    } catch (error) {
      console.error(error);
          alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {["name", "phone", "role", "college", "age", "gender", "description"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="working"
            checked={formData.working}
            onChange={handleChange}
          />
          <label>Currently Working</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
