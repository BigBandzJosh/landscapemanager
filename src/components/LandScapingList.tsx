'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const LandscapingList = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/landscaping');
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching landscaping entries:', error);
            }
        };
        fetchData();
    }, []);

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
              Landscaping Entries
          </h2>
          <ul className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow md:max-w-2xl">
              {entries.map((entry: any) => (
                  <li key={entry.id} className="p-4 border-b-2 border-gray-200">
                      <h3 className="mb-2 text-xl font-bold">
                          Date: <span className="font-normal">{entry.dateCompleted}</span>
                      </h3>
                      <p className="mb-2 text-gray-700">
                          Client: <span className="font-normal">{entry.clientName}</span>
                      </p>
                      <p className="mb-2 text-gray-700">
                          Address: <span className="font-normal">{entry.address}</span>
                      </p>
                      <p className="mb-2 text-gray-700">
                          Amount Paid: <span className="font-normal">${entry.amountPaid}</span>
                      </p>
                      <p className="text-gray-700">
                          Notes: <span className="font-normal">{entry.notes}</span>
                      </p>
                  </li>
              ))}
          </ul>
      </div>
  );
  
};

export default LandscapingList;
