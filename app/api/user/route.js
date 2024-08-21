// app/api/user.js
import envConfig from "@/config";
import { cookies } from "next/headers";
export async function GET(request) {
  console.log(request);
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return new Response(JSON.stringify({ error: "No session token found." }), {
      status: 401,
    });
  }

  try {
    const response = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionToken=${sessionToken.value}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user information.");
    }

    // console.log(`User Data: ${JSON.stringify(data)}`);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
