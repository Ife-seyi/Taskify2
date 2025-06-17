// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // Make sure you've exported Firestore DB from firebase.js
import { HiOutlineSearch, HiOutlineBell } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import BottomNav from "../Components/BottomNav";
import LogoutButton from "../Components/LogoutButton";


const Home = () => {
  const user = auth.currentUser;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(userTasks);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#e6f7f6] px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="rounded-full w-full h-full"
              />
            ) : (
              user?.displayName?.charAt(0).toUpperCase()
            )}
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

      {/* Tasks Section */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p className="text-gray-500">{task.description}</p>
              <p className="text-sm text-gray-400">
                {new Date(task.timestamp).toLocaleString()}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  task.completed ? "text-green-600" : "text-gray-500"
                }`}
              >
                {task.completed ? "Completed" : "Mark as completed"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaEdit className="text-gray-400 cursor-pointer" />
              <input type="checkbox" checked={task.completed} readOnly />
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
