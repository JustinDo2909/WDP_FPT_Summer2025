// "use client";

import { useLazyGetUserQuery } from "@/process/api/apiAuth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const [triggerGetMe] = useLazyGetUserQuery(); // dùng lazy để gọi thủ công

  useEffect(() => {
    const fetchUser = async () => {
      await triggerGetMe()
        .unwrap()
        .then((data) => {
          setUser(data.user);
          setLoading(false);
        })
        .catch(() => setUser(undefined));
    };

    fetchUser();
  }, [triggerGetMe]);

  const isLogged = !!user;

  return { user, loading, isLogged };
};
