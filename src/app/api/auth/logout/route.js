export async function POST(req) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Logged out successfully!",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
