import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaEdit, FaCheck, FaTimes, FaSave } from "react-icons/fa";
import BottomNav from "../Components/BottomNav";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Tabs = ["All tasks", "Pending", "Completed"];

const Tasks = () => {
  const [selectedTab, setSelectedTab] = useState("All tasks");
  const [tasks, setTasks] = useState([]);
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
  const user = auth.currentUser;

  const fetchTasks = async () => {
    if (!user) return;
    let q = query(collection(db, "tasks"), where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    let data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (selectedTab === "Pending") {
      data = data.filter((t) => !t.completed);
    } else if (selectedTab === "Completed") {
      data = data.filter((t) => t.completed);
    }

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const toggleComplete = async (task) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      });
      toast.success(`Marked as ${task.completed ? "pending" : "completed"}`);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Task deleted!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Enhanced modal edit with more fields
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
      fetchTasks();
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
      fetchTasks();
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

  return (
    <div className="min-h-screen bg-[#e6f7f6] px-4 py-6">
      {/* Tabs */}
      <div className="flex justify-around mb-4 border-b pb-2">
        {Tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`font-medium transition-colors ${
              selectedTab === tab
                ? "text-[#f59e0b] border-b-2 border-[#f59e0b]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`bg-white p-4 mb-4 rounded-lg shadow hover:shadow-md transition-shadow ${
              task.priority ? "border-l-4 border-orange-500" : ""
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
                      onChange={(e) => setInlineDescription(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, task.id)}
                      className="w-full p-2 border-2 border-[#4FBDBA] rounded focus:outline-none focus:ring-2 focus:ring-[#4FBDBA]/50 resize-none"
                      rows={2}
                      placeholder="Task description"
                    />
                    <div className="flex gap-2">
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
                      <span className="text-xs text-gray-500 self-center ml-2">
                        Ctrl+Enter to save, Esc to cancel
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
                      <h2
                        className={`font-semibold ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </h2>
                      {task.priority && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Priority
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-gray-500 mb-2 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      {task.timestamp?.seconds
                        ? new Date(
                            task.timestamp.seconds * 1000
                          ).toLocaleString()
                        : "No deadline"}
                    </p>
                    <p className="text-xs text-gray-400 italic mt-1">
                      Double-click to edit inline
                    </p>
                  </div>
                )}

                {inlineEditingId !== task.id && (
                  <div className="flex gap-4 mt-3 text-sm font-medium">
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
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`${
                        task.completed
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

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No tasks in this category
          </h3>
          <p className="text-gray-500">
            {selectedTab === "All tasks"
              ? "Start by adding your first task!"
              : `No ${selectedTab.toLowerCase()} tasks found.`}
          </p>
        </motion.div>
      )}

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
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4"
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

      <BottomNav />
    </div>
  );
};

export default Tasks;
