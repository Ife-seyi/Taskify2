// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../index.css'; // To override some calendar styles
// import { motion } from 'framer-motion';

// const CalendarView = ({ todos }) => {
//   const [value, setValue] = useState(new Date());
//   const [selectedDateTasks, setSelectedDateTasks] = useState([]);

//   // Function to format date to YYYY-MM-DD
//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   // Update tasks when date is clicked
//   useEffect(() => {
//     const selectedTasks = todos.filter(todo =>
//       formatDate(new Date(todo.dueDate)) === formatDate(value)
//     );
//     setSelectedDateTasks(selectedTasks);
//   }, [value, todos]);

//   return (
//     <motion.div
//       className="bg-white p-6 rounded-lg shadow-lg mt-5"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">📅 Calendar View</h2>

//       <Calendar
//         onChange={setValue}
//         value={value}
//         tileClassName={({ date }) => {
//           const formattedDate = formatDate(date);
//           const taskOnDate = todos.some(todo => formatDate(new Date(todo.dueDate)) === formattedDate);

//           if (taskOnDate) {
//             return 'bg-blue-200';
//           }
//           return null;
//         }}
//       />

//       <div className="mt-5">
//         <h3 className="text-xl font-semibold mb-3">Tasks for {value.toDateString()}:</h3>
//         {selectedDateTasks.length > 0 ? (
//           <ul>
//             {selectedDateTasks.map((task) => (
//               <li key={task.id} className="mb-2">
//                 <span className={`px-2 py-1 rounded-lg text-white ${task.completed ? 'bg-green-500' : 'bg-red-500'}`}>
//                   {task.text}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No tasks for this date.</p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default CalendarView;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css'; // To override some calendar styles
import { motion } from 'framer-motion';

const CalendarView = ({ todos }) => {
  const [value, setValue] = useState(new Date());
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  // 🗓️ Function to format date to DD-MM-YYYY for Display
  const formatDisplayDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🗓️ Function to format date to YYYY-MM-DD for Storage
  const formatStorageDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // 🎯 Update tasks when date is clicked
  useEffect(() => {
    const selectedTasks = todos.filter(todo =>
      formatStorageDate(new Date(todo.dueDate)) === formatStorageDate(value)
    );
    setSelectedDateTasks(selectedTasks);

    // Update the selected date in both formats
    setSelectedDate(formatDisplayDate(value)); // Display Format
  }, [value, todos]);

  // 🔄 Load tags from localStorage
  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem('tags')) || [];
    setTags(storedTags);
  }, []);

  // ➕ Handle Add Tag
  const handleAddTag = () => {
    if (!selectedDate || !newTag) {
      alert('Please select a date and enter a tag.');
      return;
    }

    const dateParts = selectedDate.split('-');
    if (dateParts.length !== 3) {
      alert('Please enter the correct date format.');
      return;
    }

    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const dateObject = new Date(formattedDate);

    if (isNaN(dateObject.getTime())) {
      alert('Please enter the correct date format.');
      return;
    }

    const newTagItem = {
      date: selectedDate, // Store in Display Format
      tag: newTag,
    };

    const updatedTags = [...tags, newTagItem];
    setTags(updatedTags);
    localStorage.setItem('tags', JSON.stringify(updatedTags));
    setNewTag('');
    alert('Tag added successfully!');
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">📅 Calendar View</h2>

      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={({ date }) => {
          const formattedDate = formatStorageDate(date);
          const taskOnDate = todos.some(todo => formatStorageDate(new Date(todo.dueDate)) === formattedDate);

          if (taskOnDate) {
            return 'bg-blue-200';
          }
          return null;
        }}
      />

      <div className="mt-5">
        <h3 className="text-xl font-semibold mb-3">Tasks for {selectedDate}:</h3>
        {selectedDateTasks.length > 0 ? (
          <ul>
            {selectedDateTasks.map((task) => (
              <li key={task.id} className="mb-2">
                <span className={`px-2 py-1 rounded-lg text-white ${task.completed ? 'bg-green-500' : 'bg-red-500'}`}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this date.</p>
        )}
      </div>

      {/* Tag Input */}
      <div className="mt-5 flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1"
          placeholder="Add a tag"
        />
        <button
          onClick={handleAddTag}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Tag
        </button>
      </div>

      {/* Displaying Tags */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold mb-3">Tags:</h3>
        {tags.length > 0 ? (
          <ul>
            {tags.map((tag, index) => (
              <li key={index} className="mb-2">
                <span className="px-2 py-1 rounded-lg bg-yellow-500 text-white">
                  {tag.tag} - {tag.date}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tags added yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default CalendarView;
   

