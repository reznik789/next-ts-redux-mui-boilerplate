import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "app/hooks";
import { selectToken } from "features/user/userSlice";

const AuthOnlyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const { push } = useRouter();

  useEffect(() => {
    if (!token) push("/login");
  }, [token]);

  return token ? <>{children}</> : null;
};

export default AuthOnlyLayout;
