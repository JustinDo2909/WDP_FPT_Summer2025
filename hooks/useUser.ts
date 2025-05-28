// "use client";

import { useLazyGetUserQuery } from "@/process/api/apiAuth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [triggerGetMe] = useLazyGetUserQuery(); // dùng lazy để gọi thủ công

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await triggerGetMe().unwrap();
        setUser(result.user);
      } catch (error) {
        console.error("Lỗi khi gọi getMe:", error);
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, [triggerGetMe]);

  const isLogged = !!user;

  return { user, loading, isLogged };
};
