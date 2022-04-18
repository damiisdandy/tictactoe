import { useEffect, useState } from "react";

const useUser = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    setUserName(username);
  }, [userName]);

  const changeUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  return { changeUserName, userName };
};

export default useUser;
