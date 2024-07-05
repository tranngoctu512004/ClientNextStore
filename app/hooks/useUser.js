import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setUser(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return { user, error };
};

export default useUser;
