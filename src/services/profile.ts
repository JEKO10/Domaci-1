import axios from "axios";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "https://api.escuelajs.co/api/v1/auth/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
