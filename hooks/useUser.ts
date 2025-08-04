"use client";

import { useLazyGetUserQuery, useLazyLogOutQuery } from "@/process/api/apiAuth";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [triggerLogOut] = useLazyLogOutQuery();
  const [isLogged, setIsLogged] = useState(false);

  const [triggerGetMe] = useLazyGetUserQuery();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (pathname === "/logout") {
        setLoading(false);
        setUser(undefined);
        console.log("calling logout");
      } else {
        console.log("refreshing user");

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
      }
    };

    fetchUser();
  }, [triggerGetMe, pathname]);

  const logout = async () => {
    try {
      await triggerLogOut().unwrap();
      setUser(undefined);
      setIsLogged(false);
      router.replace("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { user, loading, isLogged, setIsLogged, logout };
};
