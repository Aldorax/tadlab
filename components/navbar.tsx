import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="relative z-10 flex items-center justify-between w-full px-8 lg:px-16 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="African Futures Logo"
              width={50}
              height={50}
              className="brightness-0 invert"
            />
            <div>
              <h1 className="text-white text-xs md:text-xl font-bold leading-tight">
               The Africa Disruptions Lab 
              </h1>
              <p className="text-white/80 text-sm">(TADLab)</p>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full px-2 py-2">
            <Link
              href="/"
              className="text-white hover:bg-white/10 transition-all px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide"
            >
              HOME
            </Link>
            <Link
              href="/projects"
              className="text-white hover:bg-white/10 transition-all px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide"
            >
              PROJECTS
            </Link>
            <Link
              href="/about-us"
              className="text-white hover:bg-white/10 transition-all px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide"
            >
              ABOUT US
            </Link>
            <Link
              href="/contact"
              className="text-white hover:bg-white/10 transition-all px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide"
            >
              CONTACT US
            </Link>
          </div>

          {/* Subscribe Button */}
          <button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-full px-4 md:px-8 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide transition-all">
            SUBSCRIBE
          </button>
        </nav>
    )
}