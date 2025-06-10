'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyLogOutQuery } from '@/process/api/apiAuth';

export default function LogoutPage() {
  const [triggerLogOut] = useLazyLogOutQuery();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await triggerLogOut().unwrap();
      } catch (err) {
        console.error('Logout failed:', err);
      } finally {
        router.replace('/');     // Redirect to home
        router.refresh();        // Force re-fetch of server components and layout
      }
    };

    logout();
  }, [triggerLogOut, router]);

return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
