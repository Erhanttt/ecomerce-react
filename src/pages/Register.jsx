import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Fjalëkalimet nuk përputhen");
      return;
    }

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });

      // ✅ tani ruaj tokenin nga përgjigja reale
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // pas regjistrimit dergo te dashboard
    } catch (err) {
      console.error("Gabim gjatë regjistrimit:", err.response?.data);
      setError("Email ekziston ose të dhënat janë të pasakta");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Krijo llogari</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Emri"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
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
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Përsërit fjalëkalimin"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all"
        >
          Regjistrohu
        </button>

        <p className="text-center text-sm mt-4">
          Ke tashmë llogari?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Hyr këtu
          </a>
        </p>
      </form>
    </div>
  );
}
