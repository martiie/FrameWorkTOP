import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const StudentForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setError(''); // Reset error when toggling form
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'students'), {
        name,
        zone,
        date: new Date().toISOString(), // Optionally, add a timestamp
      });
      console.log('Form submitted');
      // Reset form fields
      setName('');
      setZone('');
      // Close form after submission
      setShowForm(false);
    } catch (error) {
      setError('Error adding document: ' + (error as Error).message);
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleToggleForm}
        className="bg-blue-600 p-2 mb-4 rounded hover:bg-blue-700 transition-colors"
      >
        เพิ่มข้อมูล
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-lg font-bold mb-4">กรอกข้อมูล</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  ชื่อ:
                </label>
                <input
                  type="text"
                  id="name"
                  className="border p-2 w-full"
                  placeholder="ชื่อ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2} // Basic validation
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zone" className="block text-gray-700">
                  ชื่อโซน:
                </label>
                <input
                  type="text"
                  id="zone"
                  className="border p-2 w-full"
                  placeholder="ชื่อโซน"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                  minLength={2} // Basic validation
                />
              </div>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <button
                type="submit"
                className={`bg-green-600 text-white p-2 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </form>
            <button
              onClick={handleToggleForm}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
