import { Link } from "react-router-dom";
import Logout from "../../hooks/Logout";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#5a877d] p-6 text-white">
      <div className="w-2/6 mx-auto flex  justify-center items-center gap-2">
        <Link to="/" className="bg-yellow-900 p-2 rounded-md">
          
          Go Home
        </Link>
  
        <Logout></Logout>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Task Management Dashboard
      </h1>
      <div className="md:w-6/12 mx-auto space-y-4">
        {/* Add Section */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Add</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Add Task
          </button>
        </div>

        {/* Todo Section */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center">To Do</h2>
          <div className="flex-grow">
            <p className="text-gray-500">No tasks yet.</p>
          </div>
        </div>

        {/* In Progress Section */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center">
            In Progress
          </h2>
          <div className="flex-grow">
            <p className="text-gray-500">No tasks yet.</p>
          </div>
        </div>

        {/* Done Section */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center">Done</h2>
          <div className="flex-grow">
            <p className="text-gray-500">No tasks yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
