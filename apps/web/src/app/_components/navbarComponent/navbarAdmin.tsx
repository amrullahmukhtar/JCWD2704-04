import Image from "next/image";
import HumburgerAdmin from "./humburgerAdmin";
import Link from "next/link";

export function NavbarAdminToggler() {
  return (
    <nav className="w-full sticky top-0 z-50 ">
      <div className="w-full h-[80px]  rounded-md border border-transparent bg-white shadow-input  py-2  md:px-5">
        <Navbar />
      </div>
    </nav>
  );
}


//navar user
export default function Navbar() {
  return (
    <div className="w-full flex justify-between text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/admin">
            <Image src="/logoCA.png" alt="logo" fill />
          </Link>
        </div>
      </div>

      <HumburgerAdmin />
    </div>
  );
}
