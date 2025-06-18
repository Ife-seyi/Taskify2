export default async function handler(req, res) {
  // CORS headers for every request
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const { email, code } = req.body;

      // Place your SendGrid or logic here (can be mocked for now)
      console.log(`Sending code ${code} to ${email}`);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error in sendCode API:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
