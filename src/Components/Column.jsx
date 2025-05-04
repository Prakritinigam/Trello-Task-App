import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, handleDeleteTask, handleDropTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== title.toLowerCase()) {
        handleDropTask(item, title.toLowerCase());
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`column ${isOver ? "over" : ""}`}
      style={{
        border: isOver ? "2px solid #007bff" : "1px solid #ddd",
      }}
    >
      <h4 className="text-center">{title}</h4>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default Column;
