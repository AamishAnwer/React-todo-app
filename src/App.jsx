import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

import BG from "../src/assets/bg.jpg";

function App() {
  // Loading the todo list from local storage
  const initialToDoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const [toDoList, setToDoList] = useState(initialToDoList);
  const tasksLeft = toDoList.filter((task) => !task.checked).length;

  //for clear complete

  const clearCompletedTasks = () => {
    const remainingTasks = toDoList.filter((task) => !task.checked);
    setToDoList(remainingTasks);
  };
  // New state variable for the current filter
  const [filter, setFilter] = useState("all");

  // Function to update the filter
  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  // Function to get filtered tasks based on the current filter
  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return toDoList.filter((task) => !task.checked);
      case "completed":
        return toDoList.filter((task) => task.checked);
      default:
        return toDoList;
    }
  };

  // for drag and drop functionality

  const handleDragStart = (e, startIndex) => {
    e.dataTransfer.setData("startIndex", startIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, endIndex) => {
    const startIndex = e.dataTransfer.getData("startIndex");
    const newList = [...toDoList];
    const [movedItem] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, movedItem);
    setToDoList(newList);
  };

  useEffect(() => {
    // Saving todo list to local storage
    localStorage.setItem("todoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const addTask = (taskName) => {
    const newTask = { taskName, checked: false };
    setToDoList([...toDoList, newTask]);
  };

  function deleteTask(deleteTaskName) {
    setToDoList(toDoList.filter((task) => task.taskName !== deleteTaskName));
  }

  function toggleCheck(taskName) {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.taskName === taskName ? { ...task, checked: !task.checked } : task
      )
    );
  }

  console.log(toDoList);
  return (
    <div className="relative">
      <div className="flex justify-center ">
        <img
          src={BG}
          alt=""
          className="object-cover h-56 w-full absolute top-0 left-0 right-0 -z-10"
        />

        <div className="flex justify-center flex-col z-50 md:max-w-[750px] max-w-[550px] px-10">
          <h1 className="text-4xl text-white mt-8 mb-8 text-left w-screen px-10">
            TODO
          </h1>
          <TaskInput addTask={addTask} />
          <div className="bg-white rounded mt-4 w-full border-r border-l shadow-lg">
            <ul className="list-items w-full">
              {getFilteredTasks().map((task, index) => (
                <TaskItem
                  task={task}
                  key={index}
                  index={index}
                  deleteTask={deleteTask}
                  toggleCheck={toggleCheck}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              ))}
            </ul>

            <div className="flex flex-col md:flex-row justify-between items-center p-2">
              <div className="mb-2 md:mb-0">
                <p className="notify text-start flex">{tasksLeft} items left</p>
              </div>
              <div className="hidden md:flex gap-4 mb-2 md:mb-0">
                <p
                  className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                  onClick={() => updateFilter("all")}
                >
                  All
                </p>
                <p
                  className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                  onClick={() => updateFilter("active")}
                >
                  Active
                </p>
                <p
                  className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                  onClick={() => updateFilter("completed")}
                >
                  Completed
                </p>
              </div>

              <div>
                {/* Clear Complete Button */}
                <p
                  className="cursor-pointer text-end text-gray-400"
                  onClick={clearCompletedTasks}
                >
                  Clear Complete
                </p>
              </div>
            </div>

            {/* Mobile Filter Buttons */}
            <div className="flex gap-4 justify-center bg-gray-200 p-2 md:hidden">
              <p
                className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                onClick={() => updateFilter("all")}
              >
                All
              </p>
              <p
                className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                onClick={() => updateFilter("active")}
              >
                Active
              </p>
              <p
                className="cursor-pointer text-gray-400 hover:text-blue-500 font-semibold"
                onClick={() => updateFilter("completed")}
              >
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-12 text-gray-400 text-sm">
        Drag and drop to reorder list
      </p>
    </div>
  );
}

export default App;
