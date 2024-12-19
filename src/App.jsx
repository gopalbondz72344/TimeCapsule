import { Routes, Route } from 'react-router-dom';
import { useFirebase } from './firebase/firebase'
// components
import Navbar from './components/Navbar';

// pages
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Home';

import NotFound from './components/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import CreateBoxForm from './pages/Dashboard/CreateBoxForm';
import Header from './components/Header';
import CreateTimeCapsuleForm from './pages/Dashboard/CreateTimeCapsuleForm';

const App = () => {
    const firebase = useFirebase();
    return (
        <div>
            {firebase.isLoggedIn ?  <Header /> : <Navbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/createBox" element={<CreateBoxForm />} />
                    <Route path="/createCapsule" element={<CreateTimeCapsuleForm />} /> */}

                    <Route path="/createBox/:id" element={<CreateBoxForm />} />
                    <Route path="/createCapsule/:id" element={<CreateTimeCapsuleForm />} />
                </Route>
                {/* Error Pages */}
                <Route path="/400" element={<NotFound errorCode={400} />} />
                <Route path="/500" element={<NotFound errorCode={500} />} />
                <Route path="/404" element={<NotFound errorCode={404} />} />
                
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<NotFound errorCode={404} />} />
            </Routes>
        </div>
    );
};

export default App;
