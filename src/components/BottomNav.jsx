import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#E6F7F6] border-t py-2 flex justify-around items-center shadow-md">
      <Link
        to="/home"
        className={`text-center ${
          location.pathname === "/home" ? "text-[#4FBDBA]" : "text-gray-400"
        }`}
      >
        <AiFillHome size={24} />
        <p className="text-xs">Home</p>
      </Link>

      <Link
        to="/add-task"
        className={`text-center ${
          location.pathname === "/add-task" ? "text-[#4FBDBA]" : "text-gray-400"
        }`}
      >
        <FaPlusCircle size={24} />
        <p className="text-xs">Add Task</p>
      </Link>

      <Link
        to="/tasks"
        className={`text-center ${
          location.pathname === "/tasks" ? "text-[#4FBDBA]" : "text-gray-400"
        }`}
      >
        <MdDone size={24} />
        <p className="text-xs">Tasks</p>
      </Link>

      <Link
        to="/calendar"
        className={`text-center ${
          location.pathname === "/calendar" ? "text-[#4FBDBA]" : "text-gray-400"
        }`}
      >
        <FaCalendarAlt size={24} />
        <p className="text-xs">Calendar</p>
      </Link>
    </nav>
  );
};

export default BottomNav;
