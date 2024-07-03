export async function POST(request) {
  try {
    const requestData = await request.json();
    const sessionToken = requestData.payload.token;

    if (!sessionToken) {
      return new Response(
        JSON.stringify({ message: "Session token not found" }),
        { status: 400 },
      );
    }
    const cookieHeader = `sessionToken=${sessionToken}; Path=/; HttpOnly`;

    return new Response(JSON.stringify(requestData), {
      status: 200,
      headers: {
        "Set-Cookie": cookieHeader,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}
