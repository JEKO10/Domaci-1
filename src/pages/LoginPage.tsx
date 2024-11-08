import { useState } from "react";
import { useAuthContext } from "../context/auth";
import { login } from "../services/auth";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { handleLogin } = useAuthContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = user;

    if (!user.email || !user.password) {
      setMessage("Sva polja su obavezna!");
      return;
    }

    try {
      const response = await login({ email, password });

      handleLogin({ email, token: response.data.access_token });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#133E87] flex items-center flex-col max-w-72 my-32 mx-auto py-6 rounded-md [&_label]:flex [&_label]:items-start [&_label]:flex-col"
    >
      <label>
        <span className="text-white mb-0.5">Email</span>
        <input
          type="text"
          name="email"
          placeholder="Unesi email..."
          value={user.email}
          onChange={handleInputChange}
          className="text-base bg-blue-200 mb-2 px-2 outline-none rounded-sm placeholder-black/80"
        />
      </label>
      <label>
        <span className="text-white mb-0.5">Lozinka</span>
        <input
          type="password"
          name="password"
          placeholder="Unesi lozinku..."
          value={user.password}
          onChange={handleInputChange}
          className="text-base bg-blue-200 mb-5 px-2 outline-none rounded-sm placeholder-black/80"
        />
      </label>
      <button className="text-base bg-blue-400 text-white w-[12.5rem] rounded-sm transition-colors hover:bg-blue-300/50">
        Uloguj se
      </button>
      <p className="text-white mt-5">{message}</p>
    </form>
  );
};

export default LoginPage;
