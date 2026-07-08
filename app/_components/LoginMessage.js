import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800 px-4 py-10 sm:px-6 lg:px-8">
      <p className="self-center text-center text-lg sm:text-xl">
        Please{" "}
        <Link href="/login" className="text-accent-500 underline">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
