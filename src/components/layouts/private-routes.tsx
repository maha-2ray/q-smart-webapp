import { useState } from "react";
import NavBar from "./navbar";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { authStorage } from "../../services/auth";

const PrivateRoute = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derive isAuthenticated from localStorage without setState
  const isAuthenticated = !!authStorage.getAccessToken();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition duration-300 ease-in-out z-30`}
      >
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <NavBar toggleSidebar={toggleSidebar} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateRoute;
