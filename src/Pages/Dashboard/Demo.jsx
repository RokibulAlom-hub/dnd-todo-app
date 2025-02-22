import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../hooks/Logout";
import AddForm from "./AddForm";
import Todo from "./Todo";
import Inprogress from "./Inprogress";
import Done from "./Done";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const {user} = useAuth()
//   this is task section data category
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCALHOST_URL}/myTutorials/${user?.email}`
        );
        const data = await response.json();

        // Categorize tasks based on status
        const categorizedTasks = {
          todo: data.filter((task) => task.status === "todo"),
          inProgress: data.filter((task) => task.status === "inProgress"),
          done: data.filter((task) => task.status === "done"),
        };
        setTasks(categorizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user?.email]);

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceId = active.id;
    const destinationId = over.id;

    if (sourceId !== destinationId) {
      // Find task
      let movedTask;
      let sourceColumn;
      let targetColumn;

      for (const [key, value] of Object.entries(tasks)) {
        const index = value.findIndex((task) => task.id === sourceId);
        if (index !== -1) {
          movedTask = value[index];
          sourceColumn = key;
          break;
        }
      }

      if (movedTask) {
        targetColumn = destinationId; // New category

        // Remove from old category
        setTasks((prev) => ({
          ...prev,
          [sourceColumn]: prev[sourceColumn].filter(
            (task) => task.id !== sourceId
          ),
          [targetColumn]: [...prev[targetColumn], { ...movedTask, status: targetColumn }],
        }));

        // Optional: Update task status in backend
        fetch(`${import.meta.env.VITE_LOCALHOST_URL}/update-task/${sourceId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: targetColumn }),
        }).catch((err) => console.error("Error updating task:", err));
      }
    }
  };

  return (
    <div className="bg-[#5a877d] p-6 text-white">
      <div className="w-2/6 mx-auto flex justify-center items-center gap-2">
        <Link to="/" className="bg-yellow-900 p-2 rounded-md">Go Home</Link>
        <Logout />
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Task Management Dashboard</h1>
      <AddForm />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Todo tasks={tasks.todo} />
          <Inprogress tasks={tasks.inProgress} />
          <Done tasks={tasks.done} />
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
