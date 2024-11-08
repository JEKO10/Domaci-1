import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import { ReactNode } from "react";

export const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const { token } = useAuthContext();

  if (!token) return <Navigate to="/login" />;

  return element;
};
