import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import avatar2 from "../assets/avatar2.png"; // your colored avatar

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // if (!user) return <div className="text-center py-10 text-gray-600">User not found.</div>;

  const {
    name, email, phone, role, college, skills,
    age, gender, description, working,
  } = user;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
      {/* Banner */}
      <div className="h-40 bg-blue-600 relative">
        <img
          src={avatar2}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-white absolute left-6 -bottom-14 object-cover bg-white"
        />
      </div>

      <div className="pt-20 px-6 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">{name || "Unnamed User"}</h1>
            <p className="text-gray-500">{email}</p>
          </div>
          <button
            onClick={() => navigate("/editprofile")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-6 space-y-4 text-gray-700 text-sm">
          {phone && <ProfileItem label="Phone" value={phone} />}
          {role && <ProfileItem label="Role" value={role} />}
          {college && <ProfileItem label="College" value={college} />}
          {age && <ProfileItem label="Age" value={age} />}
          {gender && <ProfileItem label="Gender" value={gender} />}
          {typeof working === "boolean" && (
            <ProfileItem label="Working" value={working ? "Yes" : "No"} />
          )}
          {skills && skills.length > 0 && (
            <ProfileItem label="Skills" value={skills.join(", ")} />
          )}
          {description && <ProfileItem label="Description" value={description} />}
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <span className="font-medium">{label}:</span> <span>{value}</span>
  </div>
);

export default MyProfile;
