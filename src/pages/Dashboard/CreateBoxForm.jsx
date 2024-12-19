/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useFirebase } from '../../firebase/firebase';  // Import Firebase context

const CreateBoxForm = ({ user }) => {
  const { createBox } = useFirebase();  // Use the createBox function from Firebase context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files).filter(file =>
      ['.zip', '.rar', '.7z'].some(ext => file.name.endsWith(ext))
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Title and Description are required');
      return;
    }
    setError(null);
    setLoading(true);
    
    try {
      await createBox({ title, description, files });
      setTitle('');
      setDescription('');
      setFiles([]);
    } catch (error) {
      setError('Failed to create box. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#01112E] flex justify-center items-center min-h-screen'>
  <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 w-[100%] sm:w-[500px] p-6">

    <h2 className="text-2xl font-semibold text-white mb-6">Create Box Form</h2>

    {/* Title Input */}
    <div className="form-group w-full">
      <label htmlFor="title" className="block text-sm font-medium text-white mb-2">Title</label>
      <input 
        type="text" 
        id="title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"   
      />
    </div>

    {/* Description Input */}
    <div className="form-group w-full">
      <label htmlFor="description" className="block text-sm font-medium text-white mb-2">Description</label>
      <textarea 
        id="description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none" 
      ></textarea>
    </div>

    {/* Drag and Drop File Upload */}
    <div className="form-group w-full">
      <label htmlFor="files" className="block text-sm font-medium text-white mb-2">Upload Zipped Folders</label>
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex justify-center items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100"
      >
        <input
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
          accept=".zip,.rar,.7z"
          className="hidden"
        />
        <label htmlFor="files" className="text-center">
          <p className="text-gray-500 text-sm">
            Drag and drop your zipped folders here, or 
            <span className="text-blue-600 underline cursor-pointer"> browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Only .zip, .rar, .7z files are supported</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Uploaded Files</h3>
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

    {/* Submit Button */}
    <div className="form-group w-full">
      <button 
        type="submit" 
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Creating Box...' : 'Create Box'}
      </button>
    </div>

  </form>
</div>

  );
};

export default CreateBoxForm;
