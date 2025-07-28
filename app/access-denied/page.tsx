"use client";

import { useRouter } from "next/navigation";
import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export default function AccessDeniedPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Core className="min-h-screen flex items-center justify-center bg-gray-50">
        <RText>Loading...</RText>
      </Core>
    );
  }

  return (
    <Core className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Container className="max-w-md w-full text-center">
        <Area className="bg-white rounded-lg shadow-lg p-8">
          <Yard className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldX className="w-8 h-8 text-red-600" />
          </Yard>

          <RText className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </RText>

          <RText className="text-gray-600 mb-6 leading-relaxed">
            You don&apos;t have permission to access this area. This section is
            restricted to administrators and staff members only.
          </RText>

          {user && (
            <Area className="bg-gray-50 rounded-lg p-4 mb-6">
              <RText className="text-sm text-gray-500 mb-1">
                Logged in as:
              </RText>
              <RText className="font-medium text-gray-900">{user.name}</RText>
              <RText className="text-sm text-gray-500">{user.email}</RText>
            </Area>
          )}

          <Area className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </button>
          </Area>

          <RText className="text-xs text-gray-500 mt-6">
            If you believe this is an error, please contact your administrator.
          </RText>
        </Area>
      </Container>
    </Core>
  );
}
