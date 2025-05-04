import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task, handleDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h5 className="task-card-title">{task.title}</h5>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteTask(task.id)}
      >
        Delete Task
      </button>
    </div>
  );
};

export default TaskCard;
