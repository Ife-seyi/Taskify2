import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { listenToMessages } from "./utils/notifications";
import SplashScreen from "./components/SplashScreen";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Verification from "./pages/EmailVerification";
import NewPassword from "./pages/NewPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Tasks from "./pages/Tasks";
import CalendarView from "./components/CalendarView";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    listenToMessages();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
      if (location.pathname === "/") {
        navigate("/get-started");
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, location]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verify-email" element={<Verification />} />
        <Route path="/create-new-password" element={<NewPassword />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarView />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
