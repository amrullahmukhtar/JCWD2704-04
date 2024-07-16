import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center w-full justify-center overflow-scroll">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-50  mx-4 min-w-10 max-h-[90%] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
