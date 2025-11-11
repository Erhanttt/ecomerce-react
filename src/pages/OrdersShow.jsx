import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  Package,
  Truck,
  Trash2,
  Clock,
} from "lucide-react";

export default function OrdersShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔒 Redirect në Home nëse s'ka token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së porosisë:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      await api.put(`/orders/${id}`, { status: newStatus });
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Gabim gjatë ndryshimit të statusit:", err);
      alert("Ndodhi një gabim gjatë ndryshimit të statusit.");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("A je i sigurt që dëshiron ta fshish këtë porosi?");
    if (!ok) return;
    try {
      await api.delete(`/orders/${id}`);
      navigate("/admin/orders");
    } catch (err) {
      console.error("Gabim gjatë fshirjes së porosisë:", err);
      alert("Ndodhi një gabim gjatë fshirjes së porosisë.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin mr-2" /> Duke ngarkuar porosinë...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-xl mb-4">Porosia nuk u gjet!</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="text-pink-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Kthehu te porositë
        </button>
      </div>
    );
  }

  const statusBadge = (status) => {
    if (status === "pending") return "bg-yellow-500/20 text-yellow-400";
    if (status === "approved") return "bg-blue-500/20 text-blue-400";
    if (status === "delivered") return "bg-green-500/20 text-green-400";
    return "bg-gray-500/20 text-gray-300";
  };

  const total =
    order.items?.reduce(
      (sum, it) => sum + Number(it.price) * Number(it.quantity),
      0
    ) ?? Number(order.total_price ?? 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 🔙 Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-pink-400 hover:text-pink-300 flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Kthehu te Porositë
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateStatus("pending")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                order.status === "pending"
                  ? "bg-yellow-600/40 border-2 border-yellow-500 text-yellow-200"
                  : "bg-yellow-600/20 border border-yellow-600/30 text-yellow-300 hover:bg-yellow-600/30"
              }`}
            >
              <Clock size={18} /> Në pritje
            </button>

            <button
              onClick={() => updateStatus("approved")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                order.status === "approved"
                  ? "bg-blue-600/40 border-2 border-blue-500 text-blue-200"
                  : "bg-blue-600/20 border border-blue-600/30 text-blue-300 hover:bg-blue-600/30"
              }`}
            >
              <CheckCircle2 size={18} /> Aprovo
            </button>

            <button
              onClick={() => updateStatus("delivered")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                order.status === "delivered"
                  ? "bg-green-600/40 border-2 border-green-500 text-green-200"
                  : "bg-green-600/20 border border-green-600/30 text-green-300 hover:bg-green-600/30"
              }`}
            >
              <Truck size={18} /> Dorëzuar
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600/20 border border-red-600/30 px-3 py-2 rounded-lg text-red-300 hover:bg-red-600/30 transition"
            >
              <Trash2 size={18} /> Fshi
            </button>
          </div>
        </div>

        {/* ℹ️ Info bazike */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Porosia #{order.id}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                order.status
              )}`}
            >
              {order.status === "pending" && "Në pritje"}
              {order.status === "approved" && "E aprovuar"}
              {order.status === "delivered" && "E dorëzuar"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-300">
                <Package size={18} className="text-purple-400" />
                <span className="font-semibold text-white">Klienti:</span>{" "}
                {order.first_name} {order.last_name}
              </p>
              {order.email && (
                <p className="flex items-center gap-2 text-gray-300">
                  <Mail size={18} className="text-blue-400" />
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {order.email}
                </p>
              )}
              <p className="flex items-center gap-2 text-gray-300">
                <Phone size={18} className="text-green-400" />
                <span className="font-semibold text-white">Tel:</span>{" "}
                {order.phone}
              </p>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-300">
                <MapPin size={18} className="text-green-400" />
                <span className="font-semibold text-white">Adresa:</span>{" "}
                {order.address}, {order.postal_code}, {order.country}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Calendar size={18} className="text-gray-400" />
                <span className="font-semibold text-white">Data:</span>{" "}
                {new Date(order.created_at).toLocaleString("sq-AL")}
              </p>
            </div>
          </div>

          {order.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Shënim i klientit
              </h3>
              <p className="text-gray-300 whitespace-pre-line">
                {order.description}
              </p>
            </div>
          )}
        </div>

        {/* 🧾 Artikujt e porosisë */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Artikujt</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">ID Produkti</th>
                  <th className="p-3">Produkti</th>
                  <th className="p-3">Sasia</th>
                  <th className="p-3">Çmimi</th>
                  <th className="p-3">Nëntotali</th>
                </tr>
              </thead>
              <tbody>
                {(order.items ?? []).map((it, idx) => {
                  const product = it.product ?? {};
                  const name = product.name ?? `#${it.product_id}`;
                  const img = product.image;
                  const subtotal = Number(it.price) * Number(it.quantity);

                  return (
                    <tr
                      key={it.id ?? idx}
                      onClick={() => navigate(`/product/${it.product_id}`)}
                      className="border-b border-white/10 hover:bg-white/10 transition cursor-pointer"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 text-gray-300">{it.product_id}</td>
                      <td className="p-3 flex items-center gap-3">
                        {img ? (
                          <img
                            src={`http://127.0.0.1:8000/${img}`}
                            className="w-12 h-12 rounded object-cover"
                            alt={name}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-white/10" />
                        )}
                        <span className="font-medium text-white">{name}</span>
                      </td>
                      <td className="p-3">{it.quantity}</td>
                      <td className="p-3">€{Number(it.price).toFixed(2)}</td>
                      <td className="p-3 text-green-400 font-semibold">
                        €{subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <div className="text-right">
              <p className="text-lg text-gray-300">Totali:</p>
              <p className="text-2xl font-bold text-green-400">
                €{Number(total).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
