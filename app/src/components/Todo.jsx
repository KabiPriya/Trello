import TodoCard from "./TodoCard";
const Todo = ({ handleAdd, handleDelete, handleEdit, todos }) => {
  const updateAdd = (value, id) => {
    handleAdd(value, id);
  };

  const addCard = () => {
    handleAdd("");
  };

  return (
    <div className="taskDiv">
      <div className="task-header">
        <h2>Todo</h2>
        <button onClick={addCard}>+</button>
      </div>
      <div>
        {/* {card.map((card, index) update
          <div key={index}>{card}</div>
        ))} */}
        {todos.map((t) => (
          <div key={t.id}>
            <TodoCard
              sendAdd={updateAdd}
              handleDelete={handleDelete}
              editContent={handleEdit}
              task={t}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;