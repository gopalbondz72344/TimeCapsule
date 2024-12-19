import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.YOUR_SERVICE_ID,
        import.meta.env.YOUR_TEMPLATE_ID,
        formRef.current,
        import.meta.env.YOUR_PUBLIC_KEY
      )
      .then(() => {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        formRef.current.reset();
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again later.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  return (
    <div id="contact" className="flex flex-col items-center justify-center min-h-screen custom-background py-10 px-5">
      <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-4"
      >
        <div>
          <label htmlFor="user_name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="user_email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Contact;
