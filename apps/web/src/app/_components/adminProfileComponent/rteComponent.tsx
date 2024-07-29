import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Styles for Snow theme

interface RTEComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const RTEComponent: React.FC<RTEComponentProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link', 'image', 'align'
  ];

  // Custom blot to allow custom class for images
  const ImageBlot = Quill.import('formats/image');
  ImageBlot.className = 'img-fluid';

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white"
      modules={modules}
      formats={formats}
    />
  );
};

export default RTEComponent;
