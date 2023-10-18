import { useState, useEffect } from "react";

const TodoCard = (props) => {
  const { handleDelete, editContent, task } = props;
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  function handleDeleteClick(taskId) {
    console.log(taskId);
    handleDelete(taskId);
  }

  function handleEditContent(id) {
    editContent(content, id);
    setIsEdit(false);
  }

  function enableEdit() {
    setIsEdit(false);
  }

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <>
      <form className="list-group">
        <div className="list-item title" draggable>
          <button onClick={() => handleDeleteClick(task.id)}>X</button>
        </div>
        <div className="list-item-message" onClick={enableEdit}>
          <textarea
            className="textarea"
            placeholder="Enter text..."
            value={isEdit ? task.text : content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => handleEditContent(task.id)}
            required
          />
        </div>
        <div className="list-item time">
          Last Updated: {formattedTime}
        </div>
      </form>
    </>
  );
};

export default TodoCard;
