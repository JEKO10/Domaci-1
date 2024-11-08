import axios from "axios";

type LoginCredentials = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    {
      email,
      password,
    }
  );

  console.log(response);

  return response;
};
