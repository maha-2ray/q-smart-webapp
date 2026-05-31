import type { AuthRole } from "../services/auth";

export interface AppNavItem {
  name: string;
  path: string;
  allowedRoles: AuthRole[];
}

export const appNavItems: AppNavItem[] = [
  {
    name: "Book Ticket",
    path: "/customer",
    allowedRoles: ["USER", "STAFF", "ADMIN", "SUPER_ADMIN"],
  },
  {
    name: "Queue Operations",
    path: "/queue-operations",
    allowedRoles: ["STAFF", "ADMIN", "SUPER_ADMIN"],
  },
  {
    name: "Live Dashboard",
    path: "/dashboard",
    allowedRoles: ["STAFF", "ADMIN", "SUPER_ADMIN"],
  },
  {
    name: "Departments",
    path: "/departments",
    allowedRoles: ["STAFF", "ADMIN", "SUPER_ADMIN"],
  },
  {
    name: "Scheduling",
    path: "/scheduling",
    allowedRoles: ["STAFF", "ADMIN", "SUPER_ADMIN"],
  },
  {
    name: "User Management",
    path: "/staff-management",
    allowedRoles: ["SUPER_ADMIN"],
  },
];

export const defaultPathByRole: Record<AuthRole, string> = {
  USER: "/customer",
  STAFF: "/dashboard",
  ADMIN: "/dashboard",
  SUPER_ADMIN: "/dashboard",
};

export const normalizeRole = (role?: AuthRole | string): AuthRole | null => {
  if (
    role === "USER" ||
    role === "STAFF" ||
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  ) {
    return role;
  }

  return null;
};

export const canAccessPath = (role: AuthRole | null, path: string) => {
  if (!role) return false;

  if (path === "/profile") return true;

  return appNavItems.some(
    (item) => item.path === path && item.allowedRoles.includes(role),
  );
};

export const getDefaultPathForRole = (role: AuthRole | null) =>
  role ? defaultPathByRole[role] : "/login";

export const getNavItemsForRole = (role: AuthRole | null) =>
  role ? appNavItems.filter((item) => item.allowedRoles.includes(role)) : [];
