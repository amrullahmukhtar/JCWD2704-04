'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import RTEComponent with no SSR
const RTEComponent = dynamic(() => import('./rteComponent'), { ssr: false });

const AdminProfile: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform something with the submitted content (e.g., save to database)
    console.log('Submitted content:', content);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-800">Admin Page</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to the admin page. Manage your company profile content here.
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Company Profile Content
            </label>
            <div className="mt-1">
              <RTEComponent value={content} onChange={handleContentChange} />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
