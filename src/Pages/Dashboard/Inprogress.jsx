import { useDroppable } from "@dnd-kit/core";
import { TaskItem } from "./Todo";

const Inprogress = ({ tasks }) => {
    const { setNodeRef } = useDroppable({ id: "inProgress" });
  
    return (
      <div ref={setNodeRef} className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-500">In Progress</h2>
        <div className="space-y-4">
          {tasks?.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Inprogress;
  