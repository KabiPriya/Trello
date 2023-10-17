import React, { useReducer, useState } from "react";
import "./App.css";

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { text: action.text, isEditing: false }];
    case "EDIT_TASK":
      return state.map((task, index) => {
        if (index === action.index) {
          return { ...task, isEditing: true };
        }
        return task;
      });
    case "UPDATE_TASK":
      return state.map((task, index) => {
        if (index === action.index) {
          return { ...task, text: action.text, isEditing: false };
        }
        return task;
      });
    case "DELETE_TASK":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}

function App() {
  const [todoItems, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    if (newTask) {
      dispatch({ type: "ADD_TASK", text: newTask });
      setNewTask("");
      setIsAddingTask(false);
    }
  };

  const handleEditTask = (index) => {
    dispatch({ type: "EDIT_TASK", index });
  };

  const handleUpdateTask = (index) => {
    dispatch({ type: "UPDATE_TASK", index, text: newTask });
  };

  const handleDeleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", index });
  };

  return (
    <div>
      <div>
        <h1>Trello</h1>
      </div>
      <div className="app">
        <div className="column">
          <h2>TO DO</h2>
          {isAddingTask ? (
            <div className="task adding">
              <input
                type="text"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={handleAddTask}>Save</button>
            </div>
          ) : (
            <button className="add-button" onClick={() => setIsAddingTask(true)}>
              +
            </button>
          )}
          {todoItems.map((task, index) => (
            <div key={index} className={`task ${task.isEditing ? "editing" : ""}`}>
              {task.isEditing ? (
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              ) : (
                task.text
              )}
              {task.isEditing ? (
                <button onClick={() => handleUpdateTask(index)}>Update</button>
              ) : (
                <>
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="column">PROCESSING</div>
        <div className="column">COMPLETED</div>
      </div>
    </div>
  );
}

export default App;
