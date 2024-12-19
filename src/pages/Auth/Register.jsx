/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useFirebase } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader } from 'react-spinners';

const RegisterPage = () => {
    const firebase = useFirebase();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== reEnterPassword) {
            setPasswordError("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            await firebase.addUserDetails(result.user.uid, { firstName, lastName, email });
            firebase.setUser(null);
            toast.success('Registration successful!', {
                position: "bottom-right",
                autoClose: 3000,
            });
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setReEnterPassword('');
            setPasswordError('');
        } catch (error) {
            toast.error("Error Registering User, Please try again!", {
                position: "bottom-right",
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (reEnterPassword && e.target.value !== reEnterPassword) {
            setPasswordError('Passwords do not match!');
        } else {
            setPasswordError('');
        }
    };

    const handleReEnterPasswordChange = (e) => {
        setReEnterPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordError('Passwords do not match!');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#01112E] px-4">
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <MoonLoader color="#01112E" size={60} />
                </div>
            )}
            <div className="w-full max-w-md bg-white p-6 md:p-8 mt-[100px] rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            placeholder="Enter your first name" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            placeholder="Enter your last name" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reEnterPassword" className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                        <input 
                            type="password" 
                            id="reEnterPassword" 
                            value={reEnterPassword} 
                            onChange={handleReEnterPasswordChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                            placeholder="Re-enter your password" 
                            required 
                        />
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-sm mb-4">{passwordError}</p>
                    )}

                    <button 
                        type="submit" 
                        className={`w-full bg-indigo-600 text-white p-2 rounded-md ${password !== reEnterPassword ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                        disabled={isLoading || password !== reEnterPassword}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
