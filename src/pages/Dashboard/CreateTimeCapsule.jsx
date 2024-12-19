

const CreateTimeCapsule = () => {
    const handleCreateTimeCapsule = () => {
        // Simulate time capsule creation logic here
        alert("Time Capsule Created!");
    };

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <button onClick={handleCreateTimeCapsule} className="bg-blue-500 text-white py-2 px-4 rounded">
                Create Time Capsule
            </button>
        </div>
    );
}

export default CreateTimeCapsule