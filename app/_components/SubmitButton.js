"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full rounded-sm bg-accent-500 px-6 py-3 text-primary-800 font-semibold transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:w-auto sm:px-8 sm:py-4"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
