import jwt from "jsonwebtoken";

export async function authMiddleware(req, res) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized user!",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decoded;
    return null;
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized user!",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
