import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import { ReactNode } from "react";

export const PublicRoute = ({ element }: { element: ReactNode }) => {
  const { token } = useAuthContext();

  if (token) return <Navigate to="/" />;

  return element;
};
