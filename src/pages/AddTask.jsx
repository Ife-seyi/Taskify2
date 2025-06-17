import React, { useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "tasks"), {
        userId: auth.currentUser.uid,
        title,
        description,
        timestamp: deadline ? deadline : serverTimestamp(),
        completed: false,
        priority,
      });

      alert("Task added!");
      navigate("/home");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F7F6] px-5 py-6 relative">
      {/* Backdrop Blur Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg z-50">
            <DatePicker
              selected={deadline}
              onChange={(date) => {
                setDeadline(date);
                setShowPicker(false);
              }}
              showTimeSelect
              inline
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <button
              onClick={() => setShowPicker(false)}
              className="mt-3 text-[#4FBDBA] font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[#002F2F] text-xl mr-3"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-xl font-semibold text-[#002F2F]">Add task</h1>
      </div>

      <form
        onSubmit={handleAddTask}
        className="bg-white rounded-lg shadow-md p-6 space-y-5"
      >
        <div>
          <label className="block text-[#002F2F] mb-1">Task title</label>
          <input
            type="text"
            placeholder="eg Buy a bike"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
            required
          />
        </div>

        <div>
          <label className="block text-[#002F2F] mb-1">Task description</label>
          <textarea
            placeholder="Add details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-[#002F2F] mb-1">Set deadline</label>
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="w-full p-3 border rounded text-left text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]"
          >
            {deadline
              ? deadline.toLocaleString()
              : "Select date and time"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-[#002F2F]">Set as priority</label>
          <input
            type="checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
            className="w-5 h-5 accent-[#4FBDBA]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#4FBDBA] text-white py-3 rounded font-semibold hover:bg-[#3ca9a6] transition"
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;


// import React, { useState } from "react";
// import { FaApple } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, googleProvider } from "../firebase";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/home"); // update route if needed
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/home");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e6f7f6] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-gradient-to-r from-[#14b8a6] to-[#99f6e4] p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//           Login to your account
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center text-gray-600 text-sm">
//           OR LOGIN WITH:
//         </div>

//         <div className="flex justify-center gap-8 mt-4">
//           <FaApple className="text-2xl text-black cursor-not-allowed opacity-50" />
//           <FcGoogle
//             className="text-2xl cursor-pointer hover:scale-110 transition"
//             onClick={handleGoogleLogin}
//           />
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-700">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-teal-600 font-medium hover:underline"
//           >
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
