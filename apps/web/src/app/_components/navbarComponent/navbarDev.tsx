// NavbarDeveloper.js
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarDeveloper() {
  return (
    <div className="w-full flex justify-between text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/">
            <Image src="/developer-logo.png" alt="Developer Logo" fill />
          </Link>
        </div>
      </div>
    </div>
  );
}
