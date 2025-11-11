import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { ArrowLeft, Mail, User, Calendar, XCircle } from "lucide-react";

export default function MessageShow() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/messages/${id}`);
        setMessage(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së mesazhit:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  // 🗑️ Fshirja e mesazhit
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "A je i sigurt që dëshiron ta fshish këtë mesazh?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/messages/${id}`);
      navigate("/messages"); // pas suksesit → kthehet në listë
    } catch (err) {
      console.error("Gabim gjatë fshirjes së mesazhit:", err);
      alert("Ndodhi një gabim gjatë fshirjes së mesazhit!");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Duke ngarkuar...
      </div>
    );

  if (!message)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-xl mb-4">Ky mesazh nuk ekziston më!</p>
        <button
          onClick={() => navigate("/messages")}
          className="text-pink-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Kthehu te mesazhet
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-lg relative">
        {/* 🔙 Kthehu mbrapa */}
        <button
          onClick={() => navigate("/messages")}
          className="flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-6"
        >
          <ArrowLeft size={18} /> Kthehu te Mesazhet
        </button>

        {/* ❌ Butoni për fshirje në këndin e djathtë */}
        <button
          onClick={handleDelete}
          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition transform hover:scale-110"
          title="Fshij këtë mesazh"
        >
          <XCircle size={28} />
        </button>

        {/* Titulli */}
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Detajet e Mesazhit
        </h1>

        {/* Përmbajtja */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-pink-400" />
            <span className="text-lg font-semibold">{message.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-400" />
            <span className="text-gray-300">{message.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-gray-400" />
            <span className="text-gray-400">
              {new Date(message.created_at).toLocaleString("sq-AL")}
            </span>
          </div>

          <hr className="border-white/10 my-4" />

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              Mesazhi:
            </h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
