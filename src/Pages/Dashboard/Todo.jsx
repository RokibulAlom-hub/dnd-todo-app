import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const Todo = () => {
  const { user } = useAuth();
  const [mytodoList, setMytodoList] = useState(null);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCALHOST_URL}/myTutorials/${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMytodoList(data);
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };

    fetchTodoList();
  }, [user?.email]);
  const handledelete = (id) => {
    console.log(id);
    // Delete an item
 fetch(`${import.meta.env.VITE_LOCALHOST_URL}/todo-delete/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Item deleted');
        alert("item deleted")
      } else {
        throw new Error('Error deleting item');
      }
    })
    .catch(error => console.error('Error deleting item:', error));  
  }
//   console.log(mytodoList);
  

  return (
    <div className="flex justify-center items-center   p-4">
    <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">To Do</h2>
      <div className="flex-grow space-y-4">
        {mytodoList?.map((data, key) => (
          <div key={key} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <span className="block mb-2 font-medium ">{key + 1}.</span>
            <h1 className="text-xl font-semibold ">{data.title}</h1>
            <button onClick={() =>handledelete(data._id)} className="p-2 bg-[#006D77] rounded text-white ">Delete</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Todo;
