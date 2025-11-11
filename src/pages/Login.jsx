import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Merr cookie-n e CSRF nga Sanctum (pa /api)
      await axios.get("https://ecomerce-laravel.fly.dev/sanctum/csrf-cookie", { withCredentials: true });

      // 2️⃣ Bëj login real me API
      const res = await api.post("/login", { email, password });

      // 3️⃣ Ruaj tokenin
      localStorage.setItem("token", res.data.token);

      window.dispatchEvent(new Event("storage"));

      // 4️⃣ Dergo ne dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Email ose fjalëkalim i pasaktë");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Hyr në llogari</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Fjalëkalimi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Kyçu
        </button>

        <p className="text-center text-sm mt-4">
          Nuk ke llogari?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regjistrohu
          </a>
        </p>
      </form>
    </div>
  );
}
