/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid'; // Importing the UUID generator
import { useNavigate } from 'react-router-dom'; // Import useNavigate to programmatically navigate

const Button = ({ name, baseRoute }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const id = uuidv4(); // Generate a new UUID
        navigate(`${baseRoute}/${id}`); // Navigate to the route with the dynamic id
    };

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <button 
                onClick={handleClick} 
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Create {name}
            </button>
        </div>
    );
};

export default Button;
