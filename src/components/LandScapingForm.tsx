// landscape/src/components/LandscapingForm.tsx
'use client'
import { useState } from 'react';
import axios from 'axios';

const LandscapingForm = () => {
    const [formData, setFormData] = useState({
        dateCompleted: '',
        clientName: '',
        address: '',
        lengthOfTime: '',
        amountPaid: 0,
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/api/landscaping', formData);
            alert('Landscaping entry added successfully!');
            setFormData({
                dateCompleted: '',
                clientName: '',
                address: '',
                lengthOfTime: '',
                amountPaid: 0,
                notes: ''
            });
        } catch (error) {
            console.error('Error adding landscaping entry:', error);
            alert('An error occurred while adding the landscaping entry.');
        }
    };

    return (
      <div className="flex flex-col justify-center items-center space-y-10">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-4">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dateCompleted">
                          Date Completed
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" name="dateCompleted" value={formData.dateCompleted} onChange={handleChange} />
                  </div>
  
                  <div className="w-full px-3 mt-4">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="clientName">
                          Client Name
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" />
                  </div>
  
                  { /* Add the other form controls using the same approach as above */}
  
                  <div className="w-full px-3 mt-6">
                      <button className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                          Add Landscaping Entry
                      </button>
                  </div>
              </div>
  
          </form>
      </div>
          );
};

export default LandscapingForm;

