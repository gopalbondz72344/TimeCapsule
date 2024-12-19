import { Navigate, Outlet } from 'react-router-dom';
import { useFirebase } from '../firebase/firebase';

const ProtectedRoute = () => {
    const { user, loading } = useFirebase(); // Add loading state from Firebase context

    // Show a loading spinner or placeholder while authentication is being determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if the user is not authenticated
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
