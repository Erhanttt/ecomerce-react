import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 💰 Llogarit totalin
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ➕ Rrit sasinë
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // ➖ Ul sasinë
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // 🗑️ Fshij produkt
  const removeItem = (id) => {
    if (!confirm("A je i sigurt që dëshiron ta heqësh këtë produkt?")) return;
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // 🚀 Vazhdo me porosinë
  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Shporta është bosh!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">🛒 Shporta juaj</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nuk keni asnjë produkt në shportë.
          </p>
        ) : (
          <>
            {/* 📋 Lista e produkteve */}
            <table className="w-full border-t">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3">Foto</th>
                  <th className="p-3">Emri</th>
                  <th className="p-3">Çmimi</th>
                  <th className="p-3">Sasia</th>
                  <th className="p-3 text-right">Totali</th>
                  <th className="p-3 text-center">Fshij</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={`http://127.0.0.1:8000/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.price} €</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right font-semibold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 💶 Totali */}
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-semibold">
                Totali: <span className="text-green-600">{total.toFixed(2)} €</span>
              </h2>
              <button
                onClick={handleOrder}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Vazhdo me Porosinë
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
