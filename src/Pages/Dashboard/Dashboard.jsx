import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../hooks/Logout";
import Todo from "./Todo";
import Inprogress from "./Inprogress";
import Done from "./Done";
import { DndContext, closestCenter } from "@dnd-kit/core";
import useAuth from "../../hooks/useAuth";
import AddForm from "./AddForm";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user } = useAuth();
  //   this is task section data category
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const { data: data, refetch } = useQuery({
    queryKey: ["allTodos"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST_URL}/myTutorials/${user?.email}`
      );
      return response.json();
    },
  });
  // console.log(data);
  // 🛠️ Use useEffect to update tasks when `data` changes
  useEffect(() => {
    if (data) {
      setTasks({
        todo: data.filter((task) => task.status === "todo"),
        inProgress: data.filter((task) => task.status === "inProgress"),
        done: data.filter((task) => task.status === "done"),
      });
    }
  }, [data]); // Runs only when `data` updates

  // Handle Drag End function imported from dnd kit
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
        const index = value.findIndex((task) => task._id === sourceId);
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
            (task) => task._id !== sourceId
          ),
          [targetColumn]: prev[targetColumn]
            ? [...prev[targetColumn], { ...movedTask, status: targetColumn }]
            : [{ ...movedTask, status: targetColumn }],
        }));
      }
      fetch(`${import.meta.env.VITE_LOCALHOST_URL}/update-todo/${sourceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetColumn }),
      })
        .then(() => refetch())
        .catch((err) => console.error("Error updating task:", err));
    }
  };
  // handle delte 
  const handleDelele = (id) => {
     console.log(id);
     
  }

  return (
    <div className="bg-[#5a877d] min-h-screen p-6 text-white">
      <div className="w-2/6 mx-auto flex justify-center items-center gap-2">
        <Link to="/" className="bg-yellow-900 p-2 rounded-md">
          Go Home
        </Link>
        <Logout />
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Task Management Dashboard
      </h1>
      <AddForm  refetch={refetch}></AddForm>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Todo tasks={tasks.todo} handleDelele={handleDelele}/>
          <Inprogress tasks={tasks.inProgress} />
          <Done tasks={tasks.done} />
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
