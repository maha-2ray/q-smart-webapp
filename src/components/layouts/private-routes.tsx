import { useState } from "react";
import NavBar from "./navbar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import { authStorage } from "../../services/auth";
import { useCurrentUser } from "../../hooks/use-auth";
import {
  canAccessPath,
  getDefaultPathForRole,
  normalizeRole,
} from "../../constants/navigation";

const PrivateRoute = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentUserQuery = useCurrentUser();

  // Derive isAuthenticated from localStorage without setState
  const isAuthenticated = !!authStorage.getAccessToken();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUserQuery.isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-sm text-gray-500">
        Loading account...
      </div>
    );
  }

  const role = normalizeRole(currentUserQuery.data?.role);

  if (!canAccessPath(role, location.pathname)) {
    return <Navigate to={getDefaultPathForRole(role)} replace />;
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
