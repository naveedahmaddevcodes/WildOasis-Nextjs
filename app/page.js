import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="relative mt-8 min-h-[70vh] overflow-hidden rounded-xl border border-primary-800/70 sm:mt-12 lg:mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 max-w-4xl text-4xl leading-tight text-primary-50 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="inline-flex items-center justify-center bg-accent-500 px-6 py-4 text-sm font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:px-8 sm:py-5 sm:text-base lg:px-8 lg:py-6 lg:text-lg"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
