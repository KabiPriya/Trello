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
    case "MOVE_TASK":
      const movedTask = state[action.index];
      return state.filter((_, index) => index !== action.index && !movedTask);
    default:
      return state;
  }
}

function App() {
  const [todoItems, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

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

  const handleDragStart = (index) => {
    setDraggedTask(index);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (targetColumn) => {
    if (draggedTask !== null) {
      dispatch({ type: "MOVE_TASK", index: draggedTask, target: targetColumn });
      setDraggedTask(null);
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Trello</h1>
      </div>
      <div className="app">
        <div className="columntodo" onDrop={() => handleDrop("TO DO")} onDragOver={(e) => e.preventDefault()}>
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
            <button
              className="add-button"
              onClick={() => setIsAddingTask(true)}
            >
              +
            </button>
          )}
          {todoItems.map((task, index) => (
            <div
              key={index}
              className={`task ${task.isEditing ? "editing" : ""}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
            >
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
        <div
          className="columnprocess"
          onDrop={() => handleDrop("PROCESSING")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>PROCESSING</h2>
        </div>
        <div
          className="columncomplete"
          onDrop={() => handleDrop("COMPLETED")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>COMPLETED</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
