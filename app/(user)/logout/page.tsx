"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
export default function LogoutPage() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
    };
    doLogout();
  }, [logout, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loading"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#1976d2"
          strokeWidth="4"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 24 24;360 24 24"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
}
