import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roots from "./Root/Roots.jsx";
import ErrorPage from "./component/ErrorPage/ErrorPage.jsx";
import Home from "./component/Home/Home.jsx";
import UserDashboardLayout from "./component/UserDashboard/UserDashboardLayout/UserDashboardLayout.jsx";
import Dashboard from "./component/UserDashboard/UserDashboardPages/Dashboard.jsx";
import Login from "./component/Pages/Login.jsx";
import Register from "./component/Pages/register.jsx";
import EmailVerification from "./component/Pages/EmailVerification.jsx";
import Verification from "./component/Pages/Verification.jsx";
import ForgetPassword from "./component/Pages/forgetPassword.jsx";
import SetNewPassword from "./component/Pages/SetNewPassword.jsx";
import Pricing from "./component/Pages/Pricing.jsx";
import DashboardFeed from "./component/UserDashboard/UserDashboardPages/DashboardFeed.jsx";
import DashboardProfileEdit from "./component/UserDashboard/UserDashboardPages/DashboardProfileEdit.jsx";
import DashboardTalks from "./component/UserDashboard/UserDashboardPages/DashboardTalks.jsx";
import DashboardVideos from "./component/UserDashboard/UserDashboardPages/DashboardVideos.jsx";
import DashboardVideoDetails from "./component/UserDashboard/UserDashboardPages/DashboardVideoDetails.jsx";
import About from "./component/Pages/About.jsx";
import Simulation from "./component/UserDashboard/UserDashboardPages/Simulation.jsx";
import SimulationTaskDetails from "./component/UserDashboard/UserDashboardPages/SimulationTaskDetails.jsx";
import SimulationQuestion from "./component/UserDashboard/UserDashboardPages/SimulationQuestion.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/email_verification",
    element: <EmailVerification></EmailVerification>,
  },
  {
    path: "/verification",
    element: <Verification></Verification>,
  },
  {
    path: "/fotget_password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/set_new_password",
    element: <SetNewPassword></SetNewPassword>,
  },
  {
    path: "/pricing",
    element: <Pricing></Pricing>,
  },
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/feed",
        element: <DashboardFeed />,
      },
      {
        path: "/dashboard/EditProfile",
        element: <DashboardProfileEdit />,
      },
      {
        path: "/dashboard/talks",
        element: <DashboardTalks />,
      },
      {
        path: "/dashboard/video",
        element: <DashboardVideos />,
      },
      {
        path: "/dashboard/details/:id",
        element: <DashboardVideoDetails />,
      },
      {
        path: "/dashboard/simulation",
        element: <Simulation />,
      },
      {
        path: "/dashboard/simulation/:id",
        element: <SimulationTaskDetails />,
      },
      {
        path: "/dashboard/simulationQuestion/:id",
        element: <SimulationQuestion />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </StrictMode>
);
