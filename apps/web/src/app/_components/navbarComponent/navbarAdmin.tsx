import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdown from './profile';

//nabar admin
export default function NavbarAdmin() {
  return (
    <div className="w-full flex justify-between text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/">
            <Image src="/logoCA.png" alt="logo" fill />
          </Link>
        </div>
      </div>
      <Link
        href="/user-profile"
        className="block p-2 hover:bg-gray-100 rounded-md"
      >
        Profile
      </Link>
      <Link href="/settings" className="block p-2 hover:bg-gray-100 rounded-md">
        Lowongan
      </Link>
      <Link
        href="/notifications"
        className="block p-2 hover:bg-gray-100 rounded-md"
      >
        CV
      </Link>

      <ProfileDropdown />
    </div>
  );
}
