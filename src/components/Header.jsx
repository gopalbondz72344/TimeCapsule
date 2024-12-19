
import { useFirebase } from "../firebase/firebase";

const Header = () => {
    const { user, logout } = useFirebase();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="fixed top-0 right-0 left-0 z-50">
            <div className="absolute left-0 right-0 z-40 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
                <nav className="flex items-center justify-between p-4 text-white">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="/">
                        <img src="/logo.png" alt="Time Capsule Logo" className="w-[200px] h-auto" />
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        )
                        : (
                            <></>
                        )
                    }
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
