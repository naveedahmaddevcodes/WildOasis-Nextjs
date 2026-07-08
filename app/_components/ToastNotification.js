"use client";

import { useEffect, useState } from "react";

export default function ToastNotification({ message, duration = 2000 }) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [message, duration]);

  if (!message || !visible) return null;

  return (
    <div className="fixed top-6 left-1/2 z-50 max-w-md -translate-x-1/2 rounded-lg border border-emerald-400/40 bg-emerald-900/95 px-4 py-3 text-sm text-emerald-100 shadow-xl shadow-black/30 sm:text-base">
      {message}
    </div>
  );
}
