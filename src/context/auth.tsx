import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthProvider {
  user: string;
  handleLogin: ({ email, token }: { email: string; token: string }) => void;
  handleLogout: () => void;
  token: string;
}

const authContext = createContext<IAuthProvider>({} as IAuthProvider);

const { Provider } = authContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = ({ email, token }: { email: string; token: string }) => {
    setUser(email);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Provider value={{ user, handleLogin, handleLogout, token }}>
      {children}
    </Provider>
  );
};

export const useAuthContext = () => useContext(authContext);
