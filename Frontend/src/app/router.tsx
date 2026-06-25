import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import PlaceholderPage from "./PlaceholderPage";
import Login from "../features/auth/Login";
import Onboarding from "../features/profile/Onboarding";
import Dashboard from "../features/dashboard/Dashboard";
import AppLayout from "../shared/components/AppLayout";
import Setup from "../features/interview/setup/Setup";
import Room from "../features/interview/room/pages/Room";
// import Profile from "../features/profile/Profile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element=<Login /> />
      <Route path="onboarding" element=<Onboarding /> />
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="interview/setup" element=<Setup /> />
      <Route path="interview/room" element=<Room /> />
      <Route path="interview" element={<PlaceholderPage title="Interview" />} />
    </Route>
  )
);
