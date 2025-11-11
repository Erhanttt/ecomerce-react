import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  Calendar, Phone, MapPin, Trash2, Eye, Loader2, 
  Clock, CheckCircle2, Truck, ChevronDown 
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("pending"); // pending, approved, delivered, all
  const [timeFilter, setTimeFilter] = useState("today"); // today, week, 1month, 2months, ..., 1year, 2years, ...
  const [customDate, setCustomDate] = useState(""); // për kalendar
  const navigate = useNavigate();

  // 📦 Merr porositë
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së porosive:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🗑️ Fshirja e porosisë
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("A je i sigurt që dëshiron ta fshish këtë porosi?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Gabim gjatë fshirjes së porosisë:", err);
      alert("Ndodhi një gabim gjatë fshirjes së porosisë.");
    }
  };

  // 📊 Filter porositë sipas kohës
  const filterByTime = (orderList) => {
    const now = new Date();
    return orderList.filter((order) => {
      const orderDate = new Date(order.created_at);
      
      // Nëse ka datë specifike të zgjedhur nga kalendari
      if (customDate) {
        const selectedDate = new Date(customDate);
        return orderDate.toDateString() === selectedDate.toDateString();
      }
      
      // Periudha të paracaktuara
      if (timeFilter === "today") {
        return orderDate.toDateString() === now.toDateString();
      } else if (timeFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      } else if (timeFilter.includes("month")) {
        const months = parseInt(timeFilter.replace("month", ""));
        const monthsAgo = new Date(now);
        monthsAgo.setMonth(now.getMonth() - months);
        return orderDate >= monthsAgo;
      } else if (timeFilter.includes("year")) {
        const years = parseInt(timeFilter.replace("year", ""));
        const yearsAgo = new Date(now);
        yearsAgo.setFullYear(now.getFullYear() - years);
        return orderDate >= yearsAgo;
      }
      return true; // all
    });
  };

  // 📊 Llogarit statistikat
  const getStats = () => {
    const filtered = filterByTime(orders);
    const pending = filtered.filter((o) => o.status === "pending");
    const approved = filtered.filter((o) => o.status === "approved");
    const delivered = filtered.filter((o) => o.status === "delivered");

    return { 
      pending, 
      approved, 
      delivered,
      all: filtered
    };
  };

  const stats = getStats();

  // 📋 Merr porositë për tu shfaqur në listë
  const getDisplayedOrders = () => {
    const filtered = filterByTime(orders);
    if (activeStatus === "all") return filtered;
    return filtered.filter((o) => o.status === activeStatus);
  };

  const displayedOrders = getDisplayedOrders();
  const displayedTotal = displayedOrders.reduce((sum, o) => sum + Number(o.total_price), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin mr-2" /> Duke ngarkuar porositë...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        📦 Porositë e Klientëve
      </h1>

      {/* 📊 Dropdown për filtrim kohor */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end gap-4">
        {/* Dropdown 1: Periudha */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => {
              setTimeFilter(e.target.value);
              setCustomDate(""); // Reset custom date kur zgjedh periudhë
            }}
            className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-10 text-white focus:border-pink-400 outline-none cursor-pointer"
          >
            <option value="today">Sot</option>
            <option value="week">Java e fundit</option>
            <option value="1month">1 muaj i fundit</option>
            <option value="2month">2 muaj të fundit</option>
            <option value="3month">3 muaj të fundit</option>
            <option value="4month">4 muaj të fundit</option>
            <option value="5month">5 muaj të fundit</option>
            <option value="6month">6 muaj të fundit</option>
            <option value="7month">7 muaj të fundit</option>
            <option value="8month">8 muaj të fundit</option>
            <option value="9month">9 muaj të fundit</option>
            <option value="10month">10 muaj të fundit</option>
            <option value="11month">11 muaj të fundit</option>
            <option value="1year">1 vit i fundit</option>
            <option value="2year">2 vite të fundit</option>
            <option value="3year">3 vite të fundit</option>
            <option value="4year">4 vite të fundit</option>
            <option value="5year">5 vite të fundit</option>
            <option value="6year">6 vite të fundit</option>
            <option value="7year">7 vite të fundit</option>
            <option value="8year">8 vite të fundit</option>
            <option value="9year">9 vite të fundit</option>
            <option value="10year">10 vite të fundit</option>
            <option value="all">Të gjitha</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={18} />
        </div>

        {/* Dropdown 2: Kalendar për datë specifike */}
        <div className="relative flex items-center gap-2">
          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setTimeFilter("all"); // Reset periudhën kur zgjedh datë specifike
            }}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-pink-400 outline-none cursor-pointer"
            placeholder="Zgjidh datë"
          />
          {customDate && (
            <button
              onClick={() => setCustomDate("")}
              className="text-gray-400 hover:text-white transition"
              title="Pastro datën"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 📊 Statistikat - Tabs për filtrim */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {/* Pending */}
        <button
          onClick={() => setActiveStatus("pending")}
          className={`bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border rounded-2xl p-6 hover:scale-105 transition-transform text-left ${
            activeStatus === "pending" 
              ? "border-yellow-400 shadow-lg shadow-yellow-500/20" 
              : "border-yellow-500/30"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} className="text-yellow-400" />
            <span className="text-4xl font-bold text-yellow-300">{stats.pending.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-yellow-200">Në pritje</h3>
        </button>

        {/* Approved */}
        <button
          onClick={() => setActiveStatus("approved")}
          className={`bg-gradient-to-br from-blue-600/20 to-blue-800/20 border rounded-2xl p-6 hover:scale-105 transition-transform text-left ${
            activeStatus === "approved" 
              ? "border-blue-400 shadow-lg shadow-blue-500/20" 
              : "border-blue-500/30"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 size={32} className="text-blue-400" />
            <span className="text-4xl font-bold text-blue-300">{stats.approved.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-200">Të aprovuara</h3>
        </button>

        {/* Delivered */}
        <button
          onClick={() => setActiveStatus("delivered")}
          className={`bg-gradient-to-br from-green-600/20 to-green-800/20 border rounded-2xl p-6 hover:scale-105 transition-transform text-left ${
            activeStatus === "delivered" 
              ? "border-green-400 shadow-lg shadow-green-500/20" 
              : "border-green-500/30"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <Truck size={32} className="text-green-400" />
            <span className="text-4xl font-bold text-green-300">{stats.delivered.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-green-200">Të dorëzuara</h3>
        </button>

        {/* All */}
        <button
          onClick={() => setActiveStatus("all")}
          className={`bg-gradient-to-br from-purple-600/20 to-purple-800/20 border rounded-2xl p-6 hover:scale-105 transition-transform text-left ${
            activeStatus === "all" 
              ? "border-purple-400 shadow-lg shadow-purple-500/20" 
              : "border-purple-500/30"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar size={32} className="text-purple-400" />
            <span className="text-4xl font-bold text-purple-300">{stats.all.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-purple-200">Të gjitha</h3>
        </button>
      </div>

      {/* 💰 Totali i porosive të shfaqura */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold text-gray-300">
          {displayedOrders.length} porosi
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Totali</p>
          <p className="text-2xl font-bold text-green-400">€{displayedTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* 📋 Lista e porosive */}
      {displayedOrders.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          Nuk ka porosi për këtë filtër.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 bg-white/10 border border-white/10 px-6 py-3 rounded-t-xl text-sm font-semibold text-gray-300 uppercase tracking-wider">
            <span>Emri</span>
            <span>Tel</span>
            <span>Adresa</span>
            <span>Totali</span>
            <span>Data</span>
            <span className="text-center">Veprim</span>
          </div>

          <div className="divide-y divide-white/10 bg-white/5 border border-white/10 rounded-b-xl overflow-hidden">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/admin/orders/${order.id}`)}
                className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-6 py-4 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-white">
                    {order.first_name} {order.last_name}
                  </span>
                  {order.email && (
                    <span className="text-xs text-gray-400">{order.email}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Phone size={14} className="text-blue-400" />
                  {order.phone}
                </div>

                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin size={14} className="text-green-400" />
                  <span className="truncate">{order.address}</span>
                </div>

                <div className="text-green-400 font-semibold">
                  €{Number(order.total_price).toFixed(2)}
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} />
                  {new Date(order.created_at).toLocaleDateString("sq-AL")}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/orders/${order.id}`);
                    }}
                    className="text-blue-400 hover:text-blue-300 transition"
                    title="Shiko detajet"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(order.id);
                    }}
                    className="text-red-500 hover:text-red-400 transition"
                    title="Fshij porosinë"
                  >
                    <Trash2 size={20} />
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