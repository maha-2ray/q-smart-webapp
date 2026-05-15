import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Queue Operations", path: "/queue-operations" },
    { name: "Live Dashboard", path: "/dashboard" },
    { name: "Departments", path: "/departments" },
    { name: "Staff Management", path: "/staff-management" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white flex md:hidden lg:hidden flex-col border-r border-gray-200 transition-colors duration-300 z-50">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center">
        <img
          src="./src/assets/q-smart.png"
          alt="q-smart-logo"
          className=" object-cover w-25 h-25 mt-6 mb-4"
        />
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-4 mt-1">
        <ul className="space-y-2">
          {navItems.map(({ path, name }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100/10"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
