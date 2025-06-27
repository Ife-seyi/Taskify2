import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalDateTimePicker = ({ deadline, setDeadline, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] bg-transparent flex items-end justify-center">
      <div className="w-full bg-white rounded-t-2xl p-4 shadow-xl max-h-[80%] animate-slide-up">
        <DatePicker
          selected={deadline}
          onChange={(date) => {
            setDeadline(date);
            onClose();
          }}
          showTimeSelect
          inline
          timeFormat="hh:mm aa"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full"
        />
        <button
          onClick={onClose}
          className="mt-3 text-[#4FBDBA] w-full py-2 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalDateTimePicker;
