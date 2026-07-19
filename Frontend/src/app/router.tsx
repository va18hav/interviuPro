import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import Onboarding from "../features/profile/pages/Onboarding";
import Dashboard from "../features/dashboard/pages/Dashboard";
import AppLayout from "../shared/components/AppLayout";
import Setup from "../features/interview/setup/pages/Setup";
import Session from "../features/interview/session/pages/Session";
import Sessions from "../features/history/sessions/pages/Sessions"
import Interviews from "../features/history/interviews/pages/Interviews"
import Interview from "../features/history/interview/pages/Interview"
import Result from "../features/history/session/pages/Session";
import Profile from "../features/profile/pages/Profile";
// import Landing from "../features/landing/pages/Landing";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="interview/setup/:interviewId?" element={<Setup />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="interviews/:interviewId" element={<Interview />} />
        <Route path="settings" element={<Profile />} />
      </Route>
      <Route path="interview/:interviewId/session/:sessionId" element={<Session />} />
      <Route path="sessions/:sessionId" element={<Result />} />
    </Route>
  )
);
