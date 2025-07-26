"use client";

import { useLazyGetUserQuery } from "@/process/api/apiAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const [triggerGetMe] = useLazyGetUserQuery();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/logout") {
      setLoading(false);
      setUser(undefined);
      return;
    }

    const fetchUser = async () => {
      await triggerGetMe()
        .unwrap()
        .then((data) => {
          setUser(data.user);
          setIsLogged(true);
          setLoading(false);
        })
        .catch(() => {
          setUser(undefined);
          setIsLogged(false);
          setLoading(false);
        });
    };

    fetchUser();
  }, [triggerGetMe, pathname]);

  return { user, loading, isLogged, setIsLogged };
};
