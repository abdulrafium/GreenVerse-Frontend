export async function GET() {
  // Mock user endpoint - implement with actual auth
  return new Response(
    JSON.stringify({
      id: "1",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "client",
      company: "Tech Manufacturing Inc.",
    }),
    { headers: { "Content-Type": "application/json" } },
  )
}
