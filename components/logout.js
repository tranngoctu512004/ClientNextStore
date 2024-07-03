"use client";
import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/config";

const LogoutButton = () => {
  const { sessionToken } = useAppContext();
  console.log(sessionToken);

  const handleLogout = async () => {
    try {
      if (!sessionToken || !sessionToken.value) {
        throw new Error("Session token not found");
      }

      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken.value}`, // Gửi giá trị sessionToken qua header Authorization
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text(); // Lấy dữ liệu phản hồi dưới dạng văn bản
        throw new Error(errorText || "Logout failed");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
