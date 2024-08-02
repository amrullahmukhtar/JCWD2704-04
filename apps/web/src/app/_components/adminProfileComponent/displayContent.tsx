'use client';

import React, { useState, useEffect } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { useAppSelector } from '@/app/_lib/redux/hooks';
import { IAdmin } from '@/app/_model/user.model';

interface ContentData {
  id: number;
  company_id: string;
  content: string;
}

const DisplayContent: React.FC = () => {
  const [contents, setContents] = useState<ContentData[]>([]);
  const adminData: IAdmin | null = useAppSelector((state) => state.adminData);

  // Use useEffect to log adminData only when it changes
  useEffect(() => {
    console.log(adminData, "ini admindata");
  }, [adminData]);

  useEffect(() => {
    const fetchContent = async () => {
      if (adminData?.id) {
        try {
          const response = await csrMainApi().get(`/admin/content/${adminData.id}`);
          console.log('API response:', response.data);
          setContents(response.data.data);
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      }
    };

    fetchContent();
  }, [adminData]);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-800">Company Content</h1>
          {contents.length > 0 ? (
            contents.map((contentItem) => (
              <div key={contentItem.id} className="mt-4 p-4 bg-white shadow-md rounded-lg">
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: contentItem.content }}
                ></div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-700">No content available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
