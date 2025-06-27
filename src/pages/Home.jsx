// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { HiOutlineSearch, HiOutlineBell } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import BottomNav from "../Components/BottomNav";
import LogoutButton from "../Components/LogoutButton";
import {
  requestPermissionAndSaveToken,
  listenForForegroundMessages,
} from "../utils/notifications";

const Home = () => {
  useEffect(() => {
    requestPermissionAndSaveToken();
    listenForForegroundMessages();
  }, []);
  const user = auth.currentUser;
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (user) {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(userTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCheckboxChange = async (taskId, currentStatus) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { completed: !currentStatus });
    fetchTasks(); // Refresh
  };

  return (
    <div className="min-h-screen bg-[#e6f7f6] px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hello {user?.displayName?.split(" ")[0] || "there"} 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Let’s get started keeping your tasks organized
            </p>
            <LogoutButton />
          </div>
        </div>
        <div className="flex gap-4 text-gray-700 text-xl">
          <HiOutlineSearch />
          <HiOutlineBell />
        </div>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 mb-4 rounded-xl shadow-sm flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                {task.title}
              </h2>
              <p className="text-gray-500 mb-1">{task.description}</p>
              <p className="text-sm text-gray-400">
                {new Date(task.timestamp?.seconds * 1000).toLocaleString()}
              </p>
              <button
                onClick={() => handleCheckboxChange(task.id, task.completed)}
                className={`mt-2 text-sm font-medium flex items-center gap-1 ${
                  task.completed ? "text-green-600" : "text-gray-600"
                }`}
              >
                {task.completed ? (
                  <>Marked as completed ✅</>
                ) : (
                  <>
                    Mark as completed <input type="checkbox" className="ml-2" />
                  </>
                )}
              </button>
            </div>
            <div className="text-gray-500">
              <FaEdit className="cursor-pointer" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-6">You have no tasks yet.</p>
      )}

      <BottomNav />
    </div>
  );
};

export default Home;
