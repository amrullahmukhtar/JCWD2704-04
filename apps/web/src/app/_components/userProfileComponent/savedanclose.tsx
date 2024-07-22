'use client';

import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { IUser } from '@/app/_model/user.model';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<IUser>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await csrMainApi().get<{ data: IUser }>(
          `userdata/${userId}`,
        );
        const userDataFromApi = response.data.data;
        setUserData(userDataFromApi);
        setEditedData(userDataFromApi); // Initialize editedData with fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    csrMainApi()
      .patch(`userdata/${userId}`, editedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        setUserData(editedData as IUser); // Update displayed user data with edited data
        setEditing(false); // Exit editing mode
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [name]: value,
    }));
  };

  if (!userData) {
    return <div className="text-center p-4">Loading...</div>; // Tailwind CSS for loading state
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {editing ? (
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-sm font-medium mb-2">
              Fullname:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={editedData.fullname || userData.fullname}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 rounded-md w-full px-3 py-2 text-base leading-tight"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedData.email || userData.email}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 rounded-md w-full px-3 py-2 text-base leading-tight"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedData.address || userData.address || ''}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 rounded-md w-full px-3 py-2 text-base leading-tight"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-sm font-medium mb-2">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={editedData.age || userData.age || ''}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 rounded-md w-full px-3 py-2 text-base leading-tight"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="education" className="text-sm font-medium mb-2">
              Education:
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={editedData.education || userData.education || ''}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 rounded-md w-full px-3 py-2 text-base leading-tight"
            />
          </div>
          {/* Add other fields as needed */}
          <button
            onClick={handleSave}
            className="bg-primary-500 hover:bg-primary-600 text-black font-medium py-2 px-4 rounded-md"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Fullname:</span> {userData.fullname}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-medium">Address:</span> {userData.address}
          </p>
          <p>
            <span className="font-medium">Age:</span> {userData.age}
          </p>
          <p>
            <span className="font-medium">Education:</span> {userData.education}
          </p>
          {/* Display other fields */}
          <button
            onClick={handleEdit}
            className="bg-primary-500 hover:bg-primary-600 text-black font-medium py-2 px-4 rounded-md"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
