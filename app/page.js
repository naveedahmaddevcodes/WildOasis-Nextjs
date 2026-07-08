import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main
      className="relative -mt-28 min-h-screen w-screen overflow-hidden rounded-none border-none"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-center"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 pt-28 text-center sm:px-6 sm:pt-32 lg:px-8">
        <h1 className="mb-6 max-w-4xl text-3xl leading-tight text-primary-50 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="inline-flex items-center justify-center bg-accent-500 px-5 py-3 text-sm font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:px-6 sm:py-4 sm:text-sm lg:px-6 lg:py-4 lg:text-base"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
