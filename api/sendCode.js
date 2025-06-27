// export default async function handler(req, res) {
//   // ✅ Set CORS headers for both OPTIONS and POST
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // ✅ Handle preflight request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { email, code } = req.body;

//     // ✅ Dummy send or real logic
//     console.log(`Sending code ${code} to ${email}`);

//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to send email" });
//   }
// }
