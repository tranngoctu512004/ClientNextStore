import { cookies } from "next/headers";
import envConfig from "@/config";

export default async function PageProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  let user = null;
  let errorMessage = null;
  try {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken?.value}`,
        },
      },
    ).then(async (res) => {
      const payload = await res.json();
      const data = {
        status: res.status,
        payload,
      };

      if (!res.ok) {
        throw data;
      }
      return data;
    });
    user = result.payload;
  } catch (error) {
    errorMessage = error.payload?.error || "Failed to fetch user information.";
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 mt-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Profile Page</h1>
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
              <p className="text-2xl font-semibold">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
