import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import { getProfile } from "../services/profile";

type ProfileType = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

const Home = () => {
  const [profile, setProfile] = useState<ProfileType>({
    id: 0,
    email: "",
    password: "",
    name: "",
    role: "",
    avatar: "",
  });
  const { handleLogout } = useAuthContext();

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Greska: ", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  });

  return (
    <section className="flex justify-center items-center flex-col my-24">
      {profile.avatar ? (
        <article className="flex items-center flex-col mb-14">
          <img
            src={profile.avatar}
            alt="avatar"
            className="h-32 rounded-full"
          />
          <h2 className="text-2xl my-5">
            <span className="underline">{profile.name}</span>, {profile.email}
          </h2>
          <p className="text-lg">Role: {profile.role}</p>
        </article>
      ) : (
        <p className="mb-10">Loading...</p>
      )}
      <button
        className="text-lg bg-blue-400 text-white px-14 rounded-sm transition-colors hover:bg-blue-300/50"
        onClick={() => handleLogout()}
      >
        Odjavi se
      </button>
    </section>
  );
};

export default Home;
