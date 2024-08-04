import React, { ChangeEvent } from 'react';
import { IUser } from '@/app/_model/user.model';

interface InputProfileProps {
  input: IUser | null;
  isEditing: boolean;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  requiredFields: Array<'age' | 'education' | 'position'>;
}

const InputProfile: React.FC<InputProfileProps> = ({
  input,
  isEditing,
  inputHandler,
  requiredFields,
}) => {
  const fields: Array<keyof IUser> = [
    'fullname',
    'phone_no',
    'address',
    'age',
    'education',
    'position',
    'experience',
    'kota_kabupaten',
    'provinsi',
    'salary_expectations',
    'date_of_birth',
  ];

  return (
    <div className="w-full items-center bg-white shadow-md p-6">
      {fields.map((field) => (
        <div className="mb-4" key={field}>
          <label htmlFor={field} className="block text-gray-700">
            {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
          <input
            type={
              field === 'salary_expectations' || field === 'age'
                ? 'number'
                : field === 'date_of_birth'
                  ? 'date'
                  : 'text'
            }
            id={field}
            value={
              field === 'date_of_birth' && input?.date_of_birth instanceof Date
                ? input.date_of_birth.toISOString().split('T')[0]
                : (input?.[field] as string) || ''
            }
            onChange={inputHandler}
            className={`w-full border rounded p-2 focus:outline-none ${isEditing ? 'focus:border-blue-500' : 'bg-gray-100'}`}
            readOnly={!isEditing}
            required={requiredFields.includes(
              field as 'age' | 'education' | 'position',
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default InputProfile;
