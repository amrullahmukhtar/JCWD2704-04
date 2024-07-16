import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-center py-4">

      <div className="container mx-auto grid md:grid-cols-3 gap-4 md:justify-between md:items-center">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">Tentang CareerAvenue</h3>
          <p className="text-sm">Deskripsi tentang platform CareerAvenue.</p>
        </div>
        <div className="flex flex-col mt-4 md:mt-0">
          <h3 className="text-xl font-bold mb-2">Hubungi Kami</h3>
          <p className="text-sm">Email: contact@careeravenue.com</p>
          <p className="text-sm">Telepon: 123-456-7890</p>
        </div>
        <div className="flex flex-col mt-4 md:mt-0">
          <h3 className="text-xl font-bold mb-2">Tautan Berguna</h3>
          <ul className="text-sm">
            <li><a href="#">Kebijakan Privasi</a></li>
            <li><a href="#">Syarat dan Ketentuan</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm">&copy; {currentYear} CareerAvenue. Dibuat dengan ❤️ oleh Anda.</p>
      </div>

    </footer>
  );
};

export default Footer;
