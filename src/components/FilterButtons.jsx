// import React from 'react';

// const TAG_COLORS = {
//   All: 'bg-gray-500',
//   Work: 'bg-blue-500',
//   Personal: 'bg-green-500',
//   Urgent: 'bg-red-500',
//   Shopping: 'bg-yellow-500',
//   Others: 'bg-purple-500',
// };

// const FILTERS = ['All', 'Work', 'Personal', 'Urgent', 'Shopping', 'Others'];

// const FilterButtons = ({ filter, setFilter }) => {
//   return (
//     <div className="flex space-x-2 mb-4 md:overflow-x-auto pb-2 scrollbar-hide">
//       {FILTERS.map((tag) => (
//         <button
//           key={tag}
//           className={`px-4 py-2 text-white font-semibold rounded-full transition-all duration-200 ease-in-out whitespace-nowrap
//             ${TAG_COLORS[tag]} 
//             ${filter === tag ? 'opacity-100 scale-105 shadow-lg' : 'opacity-70 hover:opacity-90 hover:scale-105'}`}
//           onClick={() => setFilter(tag)}
//         >
//           {tag}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default FilterButtons;


import React from 'react';

const TAG_COLORS = {
  All: 'bg-gray-500',
  Work: 'bg-blue-500',
  Personal: 'bg-green-500',
  Urgent: 'bg-red-500',
  Shopping: 'bg-yellow-500',
  Others: 'bg-purple-500',
};

const FILTERS = ['All', 'Work', 'Personal', 'Urgent', 'Shopping', 'Others'];

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {FILTERS.map((tag) => (
        <button
          key={tag}
          className={`px-4 py-2 text-white font-semibold rounded-full transition-all duration-200 ease-in-out
            ${TAG_COLORS[tag]} 
            ${filter === tag ? 'opacity-100 scale-105 shadow-lg' : 'opacity-70 hover:opacity-90 hover:scale-105'}`}
          onClick={() => setFilter(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;

