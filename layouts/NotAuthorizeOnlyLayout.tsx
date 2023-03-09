import { useAppSelector } from "app/hooks";
import { selectToken } from "features/user/userSlice";
import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";

const NotAuthorizeOnlyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const { push } = useRouter();

  useEffect(() => {
    if (token) push("/");
  }, [token]);

  return !token ? <>{children}</> : null;
};

export default NotAuthorizeOnlyLayout;
