import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const initialTasks = {
  todo: [{ id: "1", title: "Learn React" }, { id: "2", title: "Build a project" }],
  inProgress: [{ id: "3", title: "Design UI" }],
  done: [{ id: "4", title: "Setup environment" }]
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceList = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );

    if (sourceList && sourceList !== over.id) {
      const movedTask = tasks[sourceList].find((task) => task.id === active.id);
      setTasks((prev) => ({
        ...prev,
        [sourceList]: prev[sourceList].filter((task) => task.id !== active.id),
        [over.id]: [...prev[over.id], movedTask]
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-800 p-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
        <div className="grid grid-cols-3 gap-4 mx-auto md:w-10/12">
          {["todo", "inProgress", "done"].map((section) => (
            <TaskSection key={section} id={section} tasks={tasks[section]} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

const TaskSection = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-white text-black p-4 rounded-lg shadow-md min-h-[200px]">
      <h2 className="text-xl font-semibold mb-4 text-center capitalize">
        {id.replace(/([A-Z])/g, " $1")}
      </h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
      }}
      className="bg-gray-200 p-4 rounded-md shadow-sm mb-2 cursor-grab"
    >
      {task.title}
    </div>
  );
};

export default Dashboard;
