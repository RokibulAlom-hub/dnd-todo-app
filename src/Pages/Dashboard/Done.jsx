import { useDroppable } from "@dnd-kit/core";
import { TaskItem } from "./Todo";

const Done = ({ tasks }) => {
    const { setNodeRef } = useDroppable({ id: "done" });
  
    return (
      <div ref={setNodeRef} className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-500">Done</h2>
        <div className="space-y-4">
          {tasks?.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Done;
  