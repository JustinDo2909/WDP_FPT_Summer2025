"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Area, RText, Core } from "@/lib/by/Div";

interface AdminPageWrapperProps {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "STAFF")[];
}

export default function AdminPageWrapper({
  children,
  allowedRoles = ["ADMIN", "STAFF"],
}: AdminPageWrapperProps) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (!allowedRoles.includes(user.role as "ADMIN" | "STAFF")) {
        router.push("/access-denied");
        return;
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return (
      <Core className="min-h-screen flex items-center justify-center bg-gray-50">
        <Area className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <RText className="text-gray-600">Loading...</RText>
        </Area>
      </Core>
    );
  }

  if (!user || !allowedRoles.includes(user.role as "ADMIN" | "STAFF")) {
    return null;
  }

  return <>{children}</>;
}
