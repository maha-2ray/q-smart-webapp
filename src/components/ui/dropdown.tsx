import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiSettings } from "react-icons/fi";
import { LuLogOut, LuUser } from "react-icons/lu";
interface UserDropdownProps {
  userName: string;
  userTitle?: string;
  userAvatar?: string;
}

const DropDown: React.FC<UserDropdownProps> = ({
  userName,
  userTitle = "User",
  userAvatar,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const handleSettings = () => {
    navigate("/settings");
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* User Info */}
        <div className="text-left">
          <p className="font-semibold text-sm text-gray-900">{userName}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {userTitle}
          </p>
        </div>

        {/* Chevron */}
        {isOpen ? (
          <FiChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {/* Profile Option */}
          <button
            onClick={handleProfile}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
          >
            <LuUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-900 dark:text-white">
              Profile
            </span>
          </button>

          {/* Settings Option */}
          <button
            onClick={handleSettings}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
          >
            <FiSettings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-900 dark:text-white">
              Settings
            </span>
          </button>

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
          >
            <LuLogOut className="w-4 h-4" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
