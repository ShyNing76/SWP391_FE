import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ServicesPage from "./pages/Service/ServicesPage.jsx";
import LocationPage from "./pages/Location/LocationPage.jsx";
import AboutPage from "./pages/About/AboutPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import User from "./pages/User/User.jsx";
import SinglePOD from "./pages/SinglePOD/SinglePOD.jsx";
import DoublePOD from "./pages/DoublePOD/DoublePOD.jsx";
import QuadPOD from "./pages/QuadPOD/QuadPOD.jsx";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom.jsx";
import WorkingRoom from "./pages/WorkingRoom/WorkingRoom.jsx";
import EventSpace from "./pages/EventSpace/EventSpace.jsx";

const router = createBrowserRouter([
  // Customer
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      //path of services
      {
        path: "services/single-pod",
        element: <SinglePOD />,
      },

      {
        path: "services/double-pod",
        element: <DoublePOD />,
      },

      {
        path: "services/quad-pod",
        element: <QuadPOD />,
      },

      {
        path: "services/meeting-room",
        element: <MeetingRoom />,
      },

      {
        path: "services/working-room",
        element: <WorkingRoom />,
      },

      {
        path: "services/event-space",
        element: <EventSpace />,
      },

      {
        path: "services",
        element: <ServicesPage />,
        children: [
         
          
          
        ],
      },
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            path: "account",
            element: <Profile />,
          },
          {
            path: "booking",
            element: <Profile />,
          },
          {
            path: "membership",
            element: <Profile />,
          },
          {
            path: "support",
            element: <Profile />,
          },
          {
            path: "notification",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  // Regiser
  {
    path: "register",
    element: <RegisterPage />,
  },

  // Login
  {
    path: "login",
    element: <LoginPage />,
  },

  {
    path: "*",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </StrictMode>,
);
