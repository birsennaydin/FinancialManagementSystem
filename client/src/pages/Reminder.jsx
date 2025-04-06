import { useState } from "react";
import axios from "axios";

export default function Reminder() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5050/api/notifications", {
        email,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setStatus("✅ Reminder sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        setStatus("⚠️ Failed to send reminder.");
      }
    } catch (err) {
      console.error("Reminder send error:", err);
      setStatus("❌ Error sending reminder.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Send Reminder Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Recipient Email"
          className="border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Reminder Message"
          className="border px-3 py-2 rounded"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
        {status && (
          <p className="text-center mt-2 text-sm text-gray-700">{status}</p>
        )}
      </form>
    </div>
  );
}
