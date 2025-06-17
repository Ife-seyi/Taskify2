import React, { useState } from 'react';

function AddTodo({ addTodo }) {
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputTag, setInputTag] = useState('Personal'); // Default tag

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Input Text:", inputText);
    console.log("Input Date (raw):", inputDate);
    
    if (inputText.trim() && inputDate) {
      // Check if the date is valid
      const validDate = new Date(inputDate);
      console.log("Parsed Date (as Date object):", validDate);
  
      if (isNaN(validDate.getTime())) {
        alert('Invalid date. Please enter a correct date format.');
        return;
      }
      
      console.log("Formatted Date (ISO):", validDate.toISOString());
      
      // Call the parent addTodo function with formatted date
      addTodo(inputText, validDate.toISOString(), inputTag);
      setInputText('');
      setInputDate('');
    } else {
      alert('Please fill in all fields correctly.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input 
        type="text" 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        className="p-2 border border-gray-300 rounded" 
        placeholder="Add a new task"
      />
      
      <input 
        type="date" 
        value={inputDate} 
        onChange={(e) => setInputDate(e.target.value)} 
        className="p-2 border border-gray-300 rounded" 
        placeholder="Select Date"
      />

      <select 
        value={inputTag} 
        onChange={(e) => setInputTag(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Urgent">Urgent</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Tag
      </button>
    </form>
  );
}

export default AddTodo;
