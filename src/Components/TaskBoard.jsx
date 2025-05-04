import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import "../assets/css/TaskBoard.css";

const TaskBoard = () => {
  const [isModal, setModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("task-list");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(tasks));
  }, [tasks]);

  const handleTask = () => {
    if (!taskTitle.trim()) {
      return alert("Task title is mandatory");
    }
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      description,
      status: "backlog",
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setTaskTitle("");
    setDescription("");
    setModal(false);
  };

  const closeModal = () => setModal(false);
  const addNewTask = () => setModal(true);

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleDropTask = (draggedTask, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="header">
        <header>
          <button className="btn btn-primary" onClick={addNewTask}>
            + Add Task
          </button>
        </header>

        {isModal && (
          <div
            className="modal fade show d-block modal-bootstrap"
            tabIndex="-1"
          >
            <div className="modal-dialog dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">New Task</h1>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Task Title: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        value={taskTitle}
                        required
                        type="text"
                        className="form-control"
                        onChange={(e) => setTaskTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Description:</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={handleTask}>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cool">
        <div className="row mt-4">
          {["backlog", "todo", "inprogress", "done"].map((status) => (
            <div className="col-md-3" key={status}>
              <Column
                title={status.charAt(0).toUpperCase() + status.slice(1)}
                tasks={tasks.filter((task) => task.status === status)}
                handleDeleteTask={handleDeleteTask}
                handleDropTask={handleDropTask}
              />
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
