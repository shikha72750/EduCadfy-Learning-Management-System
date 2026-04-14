import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const UserDashboard = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800/80 backdrop-blur rounded-2xl shadow-2xl p-6 border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-2">User Dashboard</h1>

          <p className="text-gray-300 mb-6">
            Welcome, 
            <span className="font-semibold text-blue-400 ml-1">{username}</span> 👋
          </p>

          <div className="grid gap-4">
            <button
              disabled
              className="bg-blue-600/60 text-white py-2 rounded-xl cursor-not-allowed opacity-70"
            >
              Profile
            </button>

            <button
              disabled
              className="bg-green-600/60 text-white py-2 rounded-xl cursor-not-allowed opacity-70"
            >
              Settings
            </button>

            <button
              disabled
              className="bg-red-600/60 text-white py-2 rounded-xl cursor-not-allowed opacity-70"
            >
              Logout
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            * Buttons currently disabled (UI only)
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;