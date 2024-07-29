import { IAdmin } from '@/app/_model/user.model';
import React, { ChangeEvent } from 'react';

interface InputAdminProfileProps {
  input: IAdmin | null;
  isEditing: boolean;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputAdminProfile: React.FC<InputAdminProfileProps> = ({
  input,
  isEditing,
  inputHandler,
}) => {
  const fields: Array<keyof IAdmin> = [
    "company_name",
    'contact_email',
    'contact_phone',
    'company_summary',
    'company_location',
    'provinsi',
    'kota_kabupaten',
    



  ];

  const handleAvatarClick = () => {
    if (isEditing) {
      const avatarInput = document.getElementById('company_logo') as HTMLInputElement;
      if (avatarInput) {
        avatarInput.click();
      }
    }
  };

  return (
    <div className="w-full items-center bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4 w-full">
        <img
          src={
            input?.company_logo
              ? URL.createObjectURL(new Blob([input.company_logo]))
              : '/profileDefault.svg'
          }
          alt="Profile Picture"
          className="w-16 h-16 rounded-full mr-4"
          style={{ cursor: isEditing ? 'pointer' : 'default' }}
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          id="company_logo"
          onChange={inputHandler}
          className="ml-2"
          style={{ display: 'none' }}
        />
      </div>

      {fields.map((field) => (
        <div className="mb-4" key={field}>
          <label htmlFor={field} className="block text-gray-700">
            {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
          <input
            type="text" // Type should be "text"
            id={field}
            value={input?.[field] as string || ''}
            onChange={inputHandler}
            className={`w-full border rounded p-2 focus:outline-none ${isEditing ? 'focus:border-blue-500' : 'bg-gray-200'}`}
            readOnly={!isEditing}
          />
        </div>
      ))}
    </div>
  );
};

export default InputAdminProfile;
