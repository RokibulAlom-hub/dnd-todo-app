import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

export const TaskItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task?._id,
  });
  // console.log(task);
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 bg-gray-50 rounded-md shadow-sm cursor-grab"
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "" }}
    >
      <h1 className="text-xl font-semibold">{task?.title}</h1>
    </div>
  );
};

const Todo = ({ tasks }) => {
  const { setNodeRef } = useDroppable({ id: "todo" });

  return (
    <div ref={setNodeRef} className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">To Do</h2>
      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
