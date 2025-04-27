import { createRootRoute, Navigate, Outlet } from "@tanstack/react-router";
import MainLayout from "../pages/Layout/components/MainLayout";

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  notFoundComponent: () => <Navigate to="/home" />,
});
