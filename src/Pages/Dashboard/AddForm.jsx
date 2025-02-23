import {  useState } from "react";
import useAuth from "../../hooks/useAuth";

const AddForm = ({refetch}) => {
  const {user} = useAuth()
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const newEntry = {
      email: user?.email,
      title: title.trim(),
      timestamp: new Date().toLocaleString(),
      status:"todo"
    };

    fetch(`${import.meta.env.VITE_LOCALHOST_URL}/todo-creation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json({}))
      .then((data) =>{
        console.log(data);
        refetch()
      })
      .catch((error) => console.error("Error creating item:", error));
    // console.log(newEntry);
     

    // Reset form
    setTitle("");
    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-2 mb-5 text-black rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Title *
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#006D77] text-white py-2 rounded-lg"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddForm;
