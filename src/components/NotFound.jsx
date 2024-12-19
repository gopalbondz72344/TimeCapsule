import { useLocation, useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /**
   * Returns the appropriate message based on the current URL path.
   * 
   * @returns {string} The message to be displayed on the page.
   */

  const getMessage = () => {
    switch (location.pathname) {
      case '/400':
        return '400 - Bad Request';
      case '/500':
        return '500 - Internal Server Error';
      default:
        return '404 - Page Not Found';
    }
  };

  /**
   * Navigate to the home page when the button is clicked.
   */
  const handleNavigateHome = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#01112E] text-center">
      <h1 className="text-5xl font-bold text-white mb-4">{getMessage()}</h1>
      <p className="text-lg text-white mb-6">
        Sorry, the page you are looking for does not exist or an error occurred.
      </p>
      <button
        onClick={handleNavigateHome}
        className="bg-blue-900 p-3 rounded-xl hover:bg-blue-700 transition text-white"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;