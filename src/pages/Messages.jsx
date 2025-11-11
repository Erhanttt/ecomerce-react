import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Mail, User, Calendar, XCircle } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së mesazheve:", err);
    }
  };

  // 🗑️ Fshirja e mesazhit
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // ❌ ndalon click-un që të hapë mesazhin
    const confirmDelete = window.confirm("A je i sigurt që dëshiron ta fshish këtë mesazh?");
    if (!confirmDelete) return; // ❌ nuk bën asgjë nëse zgjedh 'Jo'

    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id)); // rifresko listën
    } catch (err) {
      console.error("Gabim gjatë fshirjes së mesazhit:", err);
      alert("Ndodhi një gabim gjatë fshirjes së mesazhit.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* 🔹 Titulli */}
      <h1 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        📨 Mesazhet e Klientëve
      </h1>

      {messages.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          Nuk ka asnjë mesazh të ri për momentin.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* 🧾 Header për kolonat */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white/10 border border-white/10 px-6 py-3 rounded-t-xl text-sm font-semibold text-gray-300 uppercase tracking-wider">
            <span>Emri</span>
            <span>Email</span>
            <span>Data & Ora</span>
            <span className="text-center">Veprim</span>
          </div>

          {/* 🔹 Lista e mesazheve */}
          <div className="divide-y divide-white/10 bg-white/5 border border-white/10 rounded-b-xl overflow-hidden">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => navigate(`/messages/${msg.id}`)}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-6 py-4 hover:bg-white/10 transition-all group cursor-default" // ✅ kursor normal
              >
                {/* Emri */}
                <div className="flex items-center gap-2">
                  <User size={16} className="text-pink-400" />
                  <span className="text-white group-hover:text-pink-300 font-medium">
                    {msg.name}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} className="text-blue-400" />
                  <span className="truncate">{msg.email}</span>
                </div>

                {/* Data & ora */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} className="text-gray-500" />
                  {new Date(msg.created_at).toLocaleString("sq-AL")}
                </div>

                {/* Fshirje */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={(e) => handleDelete(e, msg.id)} // ✅ ndalon click-un nga div-i
                    className="text-gray-400 hover:text-red-500 transition-all transform hover:scale-110"
                    title="Fshij mesazhin"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
