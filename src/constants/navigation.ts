import type { AuthRole } from "../services/auth";

export interface AppNavItem {
  name: string;
  path: string;
  allowedRoles: AuthRole[];
}

const operatorRoles: AuthRole[] = ["STAFF", "ADMIN", "SUPER_ADMIN"];

export const customerNavItems: AppNavItem[] = [
  {
    name: "Current Tickets",
    path: "/customer/current-tickets",
    allowedRoles: ["USER"],
  },
  {
    name: "Previously Booked",
    path: "/customer/previous-tickets",
    allowedRoles: ["USER"],
  },
  {
    name: "Book Ticket",
    path: "/customer",
    allowedRoles: ["USER"],
  },
];

export const appNavItems: AppNavItem[] = [
  {
    name: "Book Ticket",
    path: "/customer",
    allowedRoles: operatorRoles,
  },
  {
    name: "Queue Operations",
    path: "/queue-operations",
    allowedRoles: operatorRoles,
  },
  {
    name: "Live Dashboard",
    path: "/dashboard",
    allowedRoles: operatorRoles,
  },
  {
    name: "Departments",
    path: "/departments",
    allowedRoles: operatorRoles,
  },
  {
    name: "Scheduling",
    path: "/scheduling",
    allowedRoles: operatorRoles,
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

const protectedPathItems: AppNavItem[] = [
  ...appNavItems,
  ...customerNavItems,
  {
    name: "Profile",
    path: "/profile",
    allowedRoles: ["STAFF", "ADMIN", "SUPER_ADMIN"],
  },
];

const pathMatches = (path: string, allowedPath: string) =>
  path === allowedPath || path.startsWith(`${allowedPath}/`);

export const canAccessPath = (role: AuthRole | null, path: string) => {
  if (!role) return false;

  if (role === "SUPER_ADMIN") return true;

  return protectedPathItems.some(
    (item) => pathMatches(path, item.path) && item.allowedRoles.includes(role),
  );
};

export const getDefaultPathForRole = (role: AuthRole | null) =>
  role ? defaultPathByRole[role] : "/login";

export const getNavItemsForRole = (role: AuthRole | null) =>
  role
    ? [...appNavItems, ...customerNavItems].filter((item) =>
        item.allowedRoles.includes(role),
      )
    : [];
