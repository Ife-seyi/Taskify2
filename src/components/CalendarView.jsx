// // src/pages/CalendarView.jsx
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { db, auth } from "../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { format } from "date-fns";
// import { toast } from "react-hot-toast";
// import { IoArrowBack } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// // 🌟 No Tasks Animation Component
// const NoTasksAnimation = () => {
//   return (
//     <div className="flex flex-col items-center justify-center py-8">
//       <div className="relative mb-4">
//         <div className="animate-bounce">
//           <svg
//             className="w-16 h-16 text-[#4FBDBA] opacity-70"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
//           </svg>
//         </div>
//         <div className="absolute -top-2 -right-2 flex space-x-1">
//           <div className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"></div>
//           <div
//             className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"
//             style={{ animationDelay: "0.4s" }}
//           ></div>
//         </div>
//       </div>
//       <div className="text-center">
//         <h3 className="text-lg font-medium text-[#002F2F] mb-2 animate-fade-in">
//           All clear for today! 🌟
//         </h3>
//         <p className="text-gray-500 animate-fade-in-delay">
//           No tasks scheduled for this day. Time to relax or plan ahead!
//         </p>
//       </div>
//       <div className="mt-4 flex space-x-1">
//         <span className="text-2xl animate-wave">👋</span>
//         <span className="text-2xl animate-wave" style={{ animationDelay: "0.1s" }}>
//           ✨
//         </span>
//         <span className="text-2xl animate-wave" style={{ animationDelay: "0.2s" }}>
//           🎉
//         </span>
//       </div>
//     </div>
//   );
// };

// const CalendarView = () => {
//   const [date, setDate] = useState(new Date());
//   const [tasks, setTasks] = useState([]);
//   const [taskDates, setTaskDates] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const user = auth.currentUser;

//   const fetchTasksForDate = async (selectedDate) => {
//     if (!user) return;
//     setIsLoading(true);

//     const startOfDay = new Date(
//       selectedDate.getFullYear(),
//       selectedDate.getMonth(),
//       selectedDate.getDate()
//     );
//     const endOfDay = new Date(startOfDay);
//     endOfDay.setDate(endOfDay.getDate() + 1);

//     const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
//     const snapshot = await getDocs(q);
//     const tasksOnDate = snapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .filter((task) => {
//         const taskTime = task.timestamp?.seconds
//           ? new Date(task.timestamp.seconds * 1000)
//           : new Date();
//         return taskTime >= startOfDay && taskTime < endOfDay;
//       });

//     setTasks(tasksOnDate);
//     setIsLoading(false);
//   };

//   const checkReminders = async () => {
//     const now = new Date();
//     const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

//     const q = query(collection(db, "tasks"), where("userId", "==", user?.uid));
//     const snapshot = await getDocs(q);

//     snapshot.docs.forEach((doc) => {
//       const task = { id: doc.id, ...doc.data() };
//       const taskTime = task.timestamp?.seconds
//         ? new Date(task.timestamp.seconds * 1000)
//         : null;

//       if (
//         taskTime &&
//         taskTime >= now &&
//         taskTime <= oneHourFromNow &&
//         !task.completed
//       ) {
//         toast(
//           `🔔 '${task.title}' is due by ${taskTime.toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}`,
//           { icon: "⏰" }
//         );
//       }
//     });
//   };

//   const fetchAllTaskDates = async () => {
//     if (!user) return;

//     const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
//     const snapshot = await getDocs(q);
//     const dates = snapshot.docs.map((doc) => {
//       const task = doc.data();
//       return task.timestamp?.seconds
//         ? new Date(task.timestamp.seconds * 1000).toDateString()
//         : null;
//     });
//     setTaskDates(dates.filter(Boolean));
//   };

//   useEffect(() => {
//     fetchTasksForDate(date);
//     checkReminders();
//     fetchAllTaskDates();

//     const section = document.getElementById("task-section");
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [date]);

//   return (
//     <div className="min-h-screen bg-[#E6F7F6] p-6">
//       {/* 🔤 Animation styles */}
//       <style jsx>{`
//         @keyframes wave {
//           0%,
//           100% {
//             transform: rotate(0deg);
//           }
//           25% {
//             transform: rotate(20deg);
//           }
//           75% {
//             transform: rotate(-15deg);
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fade-in-delay {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-wave {
//           animation: wave 2s ease-in-out infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out forwards;
//         }

//         .animate-fade-in-delay {
//           animation: fade-in-delay 0.8s ease-out forwards;
//           animation-delay: 0.2s;
//           opacity: 0;
//         }
//       `}</style>

//       <div className="max-w-md mx-auto">
//         <div className="flex items-center mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             aria-label="Go back"
//             className="text-[#002F2F] text-xl mr-3"
//           >
//             <IoArrowBack />
//           </button>
//           <h1 className="text-2xl font-bold text-[#002F2F]">📅 Calendar</h1>
//         </div>

//         {/* 📆 Calendar */}
//         <Calendar
//           onChange={setDate}
//           value={date}
//           tileClassName={({ date }) =>
//             taskDates.includes(date.toDateString())
//               ? "bg-[#4FBDBA] text-white rounded-full"
//               : null
//           }
//           className="bg-white rounded-lg shadow-md p-2"
//         />

//         {/* 📍 Today Button */}
//         <button
//           aria-label="Jump to today"
//           onClick={() => setDate(new Date())}
//           className="fixed bottom-20 right-6 bg-[#4FBDBA] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#3ca9a6] transition"
//         >
//           Today
//         </button>

//         <div id="task-section" className="mt-6">
//           <h2 className="text-lg font-semibold text-[#002F2F] mb-2">
//             Tasks for {format(date, "PPP")}:
//           </h2>

//           {isLoading ? (
//             <div className="flex justify-center py-8" role="status">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FBDBA]"></div>
//             </div>
//           ) : tasks.length > 0 ? (
//             tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-white p-4 mb-3 rounded shadow-sm text-[#002F2F] transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//               >
//                 <h3 className="font-bold">{task.title}</h3>
//                 <p className="text-sm text-gray-600">{task.description}</p>
//                 <p className="text-xs text-gray-400">
//                   Due:{" "}
//                   {task.timestamp?.seconds
//                     ? new Date(
//                         task.timestamp.seconds * 1000
//                       ).toLocaleString()
//                     : "No deadline"}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm">
//               <NoTasksAnimation />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;

// src/pages/CalendarView.jsx
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { FaEdit, FaCheck, FaTimes, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// CSS Animation Component for No Tasks
const NoTasksAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Animated Calendar Icon */}
      <div className="relative mb-4">
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 text-[#4FBDBA] opacity-70"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
          </svg>
        </div>
        {/* Floating dots animation */}
        <div className="absolute -top-2 -right-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#4FBDBA] rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Animated text */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-[#002F2F] mb-2 animate-fade-in">
          All clear for today! 🌟
        </h3>
        <p className="text-gray-500 animate-fade-in-delay">
          No tasks scheduled for this day. Time to relax or plan ahead!
        </p>
      </div>

      {/* Gentle wave animation */}
      <div className="mt-4 flex space-x-1">
        <span className="text-2xl animate-wave">👋</span>
        <span
          className="text-2xl animate-wave"
          style={{ animationDelay: "0.1s" }}
        >
          ✨
        </span>
        <span
          className="text-2xl animate-wave"
          style={{ animationDelay: "0.2s" }}
        >
          🎉
        </span>
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [taskDates, setTaskDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal editing states
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPriority, setEditedPriority] = useState(false);
  const [editedDeadline, setEditedDeadline] = useState(null);

  // Inline editing states
  const [inlineEditingId, setInlineEditingId] = useState(null);
  const [inlineTitle, setInlineTitle] = useState("");
  const [inlineDescription, setInlineDescription] = useState("");

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // 🔄 Fetch tasks for selected date
  const fetchTasksForDate = async (selectedDate) => {
    if (!user) return;

    setIsLoading(true);

    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    try {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const tasksOnDate = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((task) => {
          const taskTime = task.timestamp?.seconds
            ? new Date(task.timestamp.seconds * 1000)
            : new Date();
          return taskTime >= startOfDay && taskTime < endOfDay;
        });

      setTasks(tasksOnDate);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }

    setIsLoading(false);
  };

  // 🧠 Smart reminder for upcoming tasks
  const checkReminders = async () => {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    try {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", user?.uid)
      );
      const snapshot = await getDocs(q);

      snapshot.docs.forEach((doc) => {
        const task = { id: doc.id, ...doc.data() };
        const taskTime = task.timestamp?.seconds
          ? new Date(task.timestamp.seconds * 1000)
          : null;

        if (
          taskTime &&
          taskTime >= now &&
          taskTime <= oneHourFromNow &&
          !task.completed
        ) {
          toast(
            `🔔 '${task.title}' is due by ${taskTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
            { icon: "⏰" }
          );
        }
      });
    } catch (error) {
      console.error("Error checking reminders:", error);
    }
  };

  // 🟢 Highlight all dates with tasks
  const fetchAllTaskDates = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const dates = snapshot.docs.map((doc) => {
        const task = doc.data();
        return task.timestamp?.seconds
          ? new Date(task.timestamp.seconds * 1000).toDateString()
          : null;
      });
      setTaskDates(dates.filter(Boolean));
    } catch (error) {
      console.error("Error fetching task dates:", error);
    }
  };

  // Task management functions
  const toggleComplete = async (task) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      });
      toast.success(`Marked as ${task.completed ? "pending" : "completed"}`);
      fetchTasksForDate(date);
      fetchAllTaskDates(); // Refresh calendar highlights
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Task deleted!");
      fetchTasksForDate(date);
      fetchAllTaskDates(); // Refresh calendar highlights
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Enhanced modal edit
  const handleModalEdit = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority || false);
    setEditedDeadline(
      task.timestamp?.seconds ? new Date(task.timestamp.seconds * 1000) : null
    );
  };

  const saveModalEdit = async () => {
    if (!editedTitle.trim() || !editedDescription.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    try {
      const updateData = {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        priority: editedPriority,
      };

      if (editedDeadline) {
        updateData.timestamp = editedDeadline;
      }

      await updateDoc(doc(db, "tasks", editingTask.id), updateData);
      toast.success("Task updated!");
      setEditingTask(null);
      fetchTasksForDate(date);
      fetchAllTaskDates(); // Refresh calendar highlights
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  // Inline editing functions
  const startInlineEdit = (task) => {
    setInlineEditingId(task.id);
    setInlineTitle(task.title);
    setInlineDescription(task.description);
    // Focus on title input after state update
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const saveInlineEdit = async (taskId) => {
    if (!inlineTitle.trim() || !inlineDescription.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    try {
      await updateDoc(doc(db, "tasks", taskId), {
        title: inlineTitle.trim(),
        description: inlineDescription.trim(),
      });
      toast.success("Task updated!");
      setInlineEditingId(null);
      fetchTasksForDate(date);
      fetchAllTaskDates(); // Refresh calendar highlights
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const cancelInlineEdit = () => {
    setInlineEditingId(null);
    setInlineTitle("");
    setInlineDescription("");
  };

  // Handle Enter key for quick save
  const handleKeyPress = (e, taskId) => {
    if (e.key === "Enter" && e.ctrlKey) {
      saveInlineEdit(taskId);
    } else if (e.key === "Escape") {
      cancelInlineEdit();
    }
  };

  useEffect(() => {
    fetchTasksForDate(date);
    checkReminders();
    fetchAllTaskDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="min-h-screen bg-[#E6F7F6] p-6 relative">
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>

      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#002F2F] text-xl mr-3 hover:text-[#4FBDBA] transition"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-2xl font-bold text-[#002F2F]">📅 Calendar</h1>
      </div>

      {/* Calendar Component */}
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => {
          return taskDates.includes(date.toDateString())
            ? "bg-[#4FBDBA] text-white rounded-full"
            : null;
        }}
        className="bg-white rounded-lg shadow-md p-2 mb-6"
      />

      {/* Floating 'Today' button */}
      <button
        onClick={() => setDate(new Date())}
        className="fixed bottom-20 right-6 bg-[#4FBDBA] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#3ca9a6] transition z-40"
      >
        Today
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-[#002F2F] mb-4">
          Tasks for {format(date, "PPP")}:
        </h2>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FBDBA]"></div>
          </div>
        ) : (
          <>
            {tasks.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${task.priority ? "border-l-4 border-orange-500" : ""
                        } ${task.completed ? "opacity-75" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 mr-4">
                          {inlineEditingId === task.id ? (
                            // Inline editing mode
                            <div className="space-y-3">
                              <input
                                ref={titleInputRef}
                                value={inlineTitle}
                                onChange={(e) => setInlineTitle(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, task.id)}
                                className="w-full font-semibold text-lg p-2 border-2 border-[#4FBDBA] rounded focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]/50"
                                placeholder="Task title"
                              />
                              <textarea
                                ref={descriptionInputRef}
                                value={inlineDescription}
                                onChange={(e) =>
                                  setInlineDescription(e.target.value)
                                }
                                onKeyDown={(e) => handleKeyPress(e, task.id)}
                                className="w-full p-2 border-2 border-[#4FBDBA] rounded focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]/50 resize-none"
                                rows={2}
                                placeholder="Task description"
                              />
                              <div className="flex gap-2 flex-wrap">
                                <button
                                  onClick={() => saveInlineEdit(task.id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-green-600 transition"
                                >
                                  <FaSave size={12} /> Save
                                </button>
                                <button
                                  onClick={cancelInlineEdit}
                                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-600 transition"
                                >
                                  <FaTimes size={12} /> Cancel
                                </button>
                                <span className="text-xs text-gray-500 self-center">
                                  Ctrl+Enter to save
                                </span>
                              </div>
                            </div>
                          ) : (
                            // View mode
                            <div
                              className="cursor-pointer"
                              onDoubleClick={() => startInlineEdit(task)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={`font-bold ${task.completed
                                      ? "line-through text-gray-500"
                                      : "text-[#002F2F]"
                                    }`}
                                >
                                  {task.title}
                                </h3>
                                {task.priority && (
                                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    Priority
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-sm mb-2 ${task.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-600"
                                  }`}
                              >
                                {task.description}
                              </p>
                              <p className="text-xs text-gray-400">
                                Due:{" "}
                                {task.timestamp?.seconds
                                  ? new Date(
                                    task.timestamp.seconds * 1000
                                  ).toLocaleString()
                                  : "No deadline"}
                              </p>
                              <p className="text-xs text-gray-400 italic mt-1">
                                Double-click to edit
                              </p>
                            </div>
                          )}

                          {inlineEditingId !== task.id && (
                            <div className="flex gap-3 mt-3 text-sm font-medium flex-wrap">
                              <button
                                className="text-blue-500 hover:text-blue-700 flex items-center gap-1 transition"
                                onClick={() => startInlineEdit(task)}
                              >
                                <FaEdit size={12} /> Quick Edit
                              </button>
                              <button
                                className="text-yellow-500 hover:text-yellow-700 transition"
                                onClick={() => handleModalEdit(task)}
                              >
                                Full Edit
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                                onClick={() => handleDelete(task.id)}
                              >
                                <FaTrash size={12} /> Delete
                              </button>
                              <button
                                className={`${task.completed
                                    ? "text-orange-500 hover:text-orange-700"
                                    : "text-green-500 hover:text-green-700"
                                  } flex items-center gap-1 transition`}
                                onClick={() => toggleComplete(task)}
                              >
                                {task.completed ? (
                                  <>
                                    <FaTimes size={12} /> Undo
                                  </>
                                ) : (
                                  <>
                                    <FaCheck size={12} /> Complete
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        {inlineEditingId !== task.id && (
                          <FaEdit
                            className="text-gray-400 hover:text-gray-600 cursor-pointer transition"
                            onClick={() => startInlineEdit(task)}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                <NoTasksAnimation />
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#002F2F]">
                  Edit Task
                </h2>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#002F2F] mb-1 font-medium">
                    Task title
                  </label>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
                  />
                </div>

                <div>
                  <label className="block text-[#002F2F] mb-1 font-medium">
                    Description
                  </label>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Enter task description"
                    rows={3}
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
                  />
                </div>

                <div>
                  <label className="block text-[#002F2F] mb-1 font-medium">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      editedDeadline
                        ? editedDeadline.toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditedDeadline(
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[#002F2F] font-medium">
                    Priority task
                  </label>
                  <input
                    type="checkbox"
                    checked={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.checked)}
                    className="w-5 h-5 accent-[#4FBDBA]"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 gap-3">
                <button
                  onClick={saveModalEdit}
                  className="flex-1 bg-[#4FBDBA] text-white py-3 rounded-lg font-semibold hover:bg-[#3ca9a6] transition flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
