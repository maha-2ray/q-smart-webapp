import React from "react";
import { lazyWithReload } from "../libs/lazy-with-reloads";

// const Landing = lazyWithReload(() => import("../pages/landing"));
const Login = lazyWithReload(() => import("../pages/login"));
const Signup = lazyWithReload(() => import("../pages/signup"));
const Dashboard = lazyWithReload(() => import("../pages/dashboard"));
const Customer = lazyWithReload(() => import("../pages/customer"));
const Departments = lazyWithReload(() => import("../pages/departments"));
const QueueOperations = lazyWithReload(
  () => import("../pages/queue-operations"),
);
const Reports = lazyWithReload(() => import("../pages/reports"));
const Settings = lazyWithReload(() => import("../pages/settings"));
const Scheduling = lazyWithReload(() => import("../pages/scheduling"));
const StaffManagement = lazyWithReload(
  () => import("../pages/staff-management"),
);

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  protected: boolean;
  requireAdmin?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Login as React.LazyExoticComponent<React.ComponentType<unknown>>,
    protected: false,
  },
  {
    path: "/login",
    component: Login as React.LazyExoticComponent<React.ComponentType<unknown>>,
    protected: false,
  },
  {
    path: "/signup",
    component: Signup as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: false,
  },
  {
    path: "/dashboard",
    component: Dashboard as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/customer",
    component: Customer as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/departments",
    component: Departments as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/queue-operations",
    component: QueueOperations as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/reports",
    component: Reports as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/settings",
    component: Settings as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/staff-management",
    component: StaffManagement as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
  {
    path: "/scheduling",
    component: Scheduling as React.LazyExoticComponent<
      React.ComponentType<unknown>
    >,
    protected: true,
  },
];
