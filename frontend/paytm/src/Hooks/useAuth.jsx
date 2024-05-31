import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigate = useNavigate();

  const login = async (data) => {
   localStorage.setItem("user", data);
   navigate("/dashboard");
  };

  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.setItem("user", null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
