import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import logo from "../../assets/q-smart.png";

import Dropdown from "../ui/dropdown";
import { useCurrentUser } from "../../hooks/use-auth";

type NavBarProps = {
  toggleSidebar: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const currentUserQuery = useCurrentUser();
  const currentUser = currentUserQuery.data;
  const displayName =
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") ||
    currentUser?.username ||
    currentUser?.email ||
    "Profile";
  const displayRole = currentUser?.role ? String(currentUser.role) : "User";

  const navItems = [
    { name: "Queue Operations", path: "/queue-operations" },
    { name: "Live Dashboard", path: "/dashboard" },
    { name: "Departments", path: "/departments" },
    { name: "Scheduling", path: "/scheduling" },
    { name: "User Management", path: "/staff-management" },
    // { name: "Reports", path: "/reports" },
    // { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-6 h-20 border-b border-gray-200 bg-card transition-colors duration-300">
      <button
        title="Toggle sidebar"
        className="lg:hidden absolute left-6"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu size={20} className="text-secondary cursor-pointer" />
      </button>
      <div className="hidden md:flex lg:flex items-center gap-4 md:gap-8">
        <img
          src={logo}
          alt=""
          className="w-20 h-20 md:w-22 md:h-22 lg:w-25 lg:h-25"
        />
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div>
          <ul className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${isActive ? "text-blue-900 border-b-4 pb-1 border-blue-900" : "text-gray-700 hover:text-blue-500"}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Dropdown userName={displayName} userTitle={displayRole} />
    </nav>
  );
};

export default NavBar;
