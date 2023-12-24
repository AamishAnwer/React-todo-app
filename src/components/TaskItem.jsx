import React, { useState } from "react";
// import { HiX } from "react-icons/hi";

const TaskItem = ({
  task,
  deleteTask,
  toggleCheck,
  handleDragStart,
  handleDragOver,
  handleDrop,
  index,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (e) => {
    setIsDragging(true);
    handleDragStart(e, index);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <li
      className={`task-item items border-t border-gray-200 ${
        isDragging ? "bg-blue-100 shadow-lg scale-105" : ""
      }`}
      draggable
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
    >
      <div className="items-text">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleCheck(task.taskName)}
        />
        <p className={task.checked ? "isChecked " : ""}>{task.taskName}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={() => deleteTask(task.taskName)}
		
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </li>
  );
};

export default TaskItem;
