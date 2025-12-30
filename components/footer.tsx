import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#000000] py-16 text-white">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 pb-16 border-b border-[#333333]">
          {/* Column 1 */}
          <div className="border p-4 border-[#333333]">
            <div className="flex gap-4 items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="mb-4"
                priority
              />
              <div className="text-2xl font-bold">
                The Africa Disruptions Lab{" "}
                <br />
                <span className="text-lg">(TADLab)</span>
              </div>
            </div>
            <p className="text-[#d1d1d1] leading-relaxed">
              A collaborative research platform dedicated to understanding
              societal disruption across Africa and translating evidence into
              practical, policy-relevant solutions.
            </p>
          </div>

          {/* Column 2 */}
          <div className="border p-4 border-[#333333]">
            <h3 className="text-[#767676] text-2xl font-semibold mb-6">
              Let&apos;s Talk
            </h3>
            <div className="space-y-3 mb-8">
              <p className="text-white text-lg">+971-5070-8100</p>
              <p className="text-white text-lg">info@africandisruptionslab.org</p>
            </div>
            <div>
              <h4 className="text-[#767676] text-xl font-semibold mb-4">
                Follow our socials
              </h4>
              <div className="space-y-2">
                <p className="text-white hover:text-[#4ade80] transition-colors cursor-pointer">
                  Instagram
                </p>
                <p className="text-white hover:text-[#4ade80] transition-colors cursor-pointer">
                  Twitter (X)
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="border p-4 border-[#333333]">
            <h3 className="text-[#767676] text-2xl font-semibold mb-6">
              Links
            </h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-white hover:text-[#4ade80] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="block text-white hover:text-[#4ade80] transition-colors"
              >
                About us
              </Link>
              <Link
                href="/projects"
                className="block text-white hover:text-[#4ade80] transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/research"
                className="block text-white hover:text-[#4ade80] transition-colors"
              >
                Research
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-[#4ade80] transition-colors"
              >
                Contact us
              </Link>
            </nav>
          </div>
        </div>

        {/* Decorative pattern */}
        <div
          className="h-32 mt-8 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #d1d1d1 10px,
              #d1d1d1 11px
            )`,
          }}
        />
      </div>
    </footer>
  );
}
