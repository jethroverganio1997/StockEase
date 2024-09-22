import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../actions/auth-action";
import { setUser } from "../stores/user-slice";

export default function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      dispatch(setUser(user));
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
