import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskCard from "./Components/TaskCard";
import TaskBoard from "./Components/TaskBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="container mt-4 ">
          <h1 className="text-center mb-4">
            📝 Trello-Style Task Management Board
          </h1>
          <TaskBoard />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
