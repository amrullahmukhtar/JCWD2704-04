'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { IAdmin } from '@/app/_model/user.model';
import { useAppSelector } from '@/app/_lib/redux/hooks';
import Loading1 from '../loadingComponent/loading1';

interface ContentData {
  id: number;
  company_id: string;
  content: string;
}

// Import RTEComponent secara dinamis tanpa SSR
const RTEComponent = dynamic(() => import('./rteComponent'), { ssr: false });

const AdminContent: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [contents, setContents] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const adminData: IAdmin | null = useAppSelector((state) => state.adminData);

  const fetchContent = useCallback(async () => {
    if (adminData?.id) {
      setLoading(true); // Mulai loading
      try {
        const response = await csrMainApi().get(`/admin/content/${adminData.id}`);
        console.log('API response:', response.data);
        setContents(response.data.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false); // Selesaikan loading
      }
    }
  }, [adminData?.id]);

  useEffect(() => {
    fetchContent(); // Fetch content saat komponen mount atau adminData.id berubah
  }, [fetchContent]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Mulai loading
    try {
      await csrMainApi().post(`/admin/content/${adminData?.id}`, { content });
      console.log('Content submitted successfully');
      setContent('');
      await fetchContent();
    } catch (error) {
      console.error('Error submitting content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {loading ? (
            <Loading1 />
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800">Admin Page</h1>
              <p className="mt-2 text-sm text-gray-600">
                Welcome to the admin page. Manage your company profile content here.
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
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
            </>
          )}
        </div>
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-800">Company Content</h1>
          {loading ? (
            <Loading1 />
          ) : contents.length > 0 ? (
            contents.map((contentItem) => (
              <div
                key={contentItem.id}
                className="mt-4 p-4 bg-white shadow-md rounded-lg"
              >
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: contentItem.content }}
                />
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

export default AdminContent;
