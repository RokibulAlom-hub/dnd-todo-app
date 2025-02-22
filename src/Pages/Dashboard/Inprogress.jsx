
const Inprogress = () => {
    return (
        <div className="flex justify-center  items-center p-4">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">
                    In Progress
                </h2>
                <div className="flex-grow space-y-4">
                    <p className="text-gray-500">No tasks yet.</p>
                </div>
            </div>
        </div>
    );
};

export default Inprogress;
