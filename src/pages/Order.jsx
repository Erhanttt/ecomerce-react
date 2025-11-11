import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

export default function Order() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    postal_code: "",
    description: "",
  });

  // 📦 Merr produktet nga localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // 🧮 Totali
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📤 Dergo porosinë
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Shporta është bosh!");
      return;
    }

    try {
      const orderData = {
        ...form,
        total_price: total,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      await api.post("/orders", orderData);

      localStorage.removeItem("cart");
      setCart([]);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("❌ Gabim gjatë dërgimit të porosisë:", err);
      alert("Gabim gjatë dërgimit të porosisë. Ju lutem provoni përsëri.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/cart")}
          className="text-pink-400 hover:text-pink-300 flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} /> Kthehu te Shporta
        </button>

        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Përfundoni Porosinë
        </h1>

        {success ? (
          <div className="text-center py-20">
            <CheckCircle2 size={60} className="mx-auto text-green-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Porosia u dërgua me sukses! 🎉
            </h2>
            <p className="text-gray-400">
              Do të ridrejtoheni automatikisht në faqen kryesore...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl"
          >
            {/* Fushat e klientit */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Emri"
                required
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Mbiemri"
                required
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Numri i telefonit"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email (opsional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Shteti"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Adresa"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Kodi postar"
                required
                value={form.postal_code}
                onChange={(e) =>
                  setForm({ ...form, postal_code: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none"
              />
            </div>

            {/* Përmbledhja + përshkrimi */}
            <div className="space-y-4">
              <textarea
                placeholder="Përshkrim (opsional)"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full h-32 p-3 rounded-lg bg-white/10 border border-white/10 focus:border-pink-400 outline-none resize-none"
              />

              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-pink-400">
                  Përmbledhje
                </h3>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-300 mb-2"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr className="border-white/10 my-2" />
                <p className="text-lg font-semibold text-green-400">
                  Totali: €{total.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                <Send size={18} /> Dërgo Porosinë
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
