import React, { useEffect, useState } from "react";

const Dashboard = () => {
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
          Loading Linksphere...
        </p>
      </div>

    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>
    </div>
  );
};

export default Dashboard;
