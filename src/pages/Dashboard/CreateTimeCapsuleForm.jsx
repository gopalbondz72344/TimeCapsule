import { useState, useEffect } from 'react';


// Dummy data for boxes (to simulate data from Firebase)
const dummyBoxes = [
  { id: 'box1', name: 'Memory Box 1' },
  { id: 'box2', name: 'Memory Box 2' },
  { id: 'box3', name: 'Memory Box 3' },
  { id: 'box4', name: 'Memory Box 4' },
  { id: 'box5', name: 'Memory Box 5' },
];

const CreateTimeCapsuleForm = () => {
  const [availableBoxes, setAvailableBoxes] = useState([]);
  const [stackedBoxes, setStackedBoxes] = useState([]);

  useEffect(() => {
    // Simulate fetching the list of boxes from Firebase
    setAvailableBoxes(dummyBoxes);
  }, []);


  const addToStack = (box) => {
    if (!stackedBoxes.some((item) => item.id === box.id)) {
      setStackedBoxes((prev) => [...prev, box]);
    }
  };

  const removeFromStack = (boxId) => {
    setStackedBoxes((prev) => prev.filter((box) => box.id !== boxId));
  };

  const viewBox = (boxId) => {
    alert(`Viewing contents of ${boxId}`); // Placeholder for viewing box contents
  };

  return (
    <div className="flex flex-col items-center bg-[#01112E] text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Create Time Capsule</h1>

      <div className="flex w-full gap-8">
        {/* Available Boxes List */}
        <div className="w-1/2 bg-[#1B2B47] p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Available Boxes</h2>
          <ul className="space-y-2">
            {availableBoxes.map((box) => (
              <li 
                key={box.id} 
                className="bg-[#243A5E] p-3 rounded flex justify-between items-center">
                <span>{box.name}</span>
                <button 
                  onClick={() => addToStack(box)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stacked Boxes */}
        <div className="w-1/2 bg-[#1B2B47] p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Stacked Boxes</h2>
          {stackedBoxes.length === 0 ? (
            <p className="text-gray-400">No boxes added yet.</p>
          ) : (
            <ul className="space-y-2">
              {stackedBoxes.map((box) => (
                <li 
                  key={box.id} 
                  className="bg-[#243A5E] p-3 rounded flex justify-between items-center">
                  <span 
                    onClick={() => viewBox(box.id)} 
                    className="cursor-pointer underline text-blue-400">
                    {box.name}
                  </span>
                  <button 
                    onClick={() => removeFromStack(box.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTimeCapsuleForm;
