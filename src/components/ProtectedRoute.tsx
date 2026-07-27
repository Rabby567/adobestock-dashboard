import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../services/authService";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await getSession();

      setAuthenticated(!!data.session);
      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}