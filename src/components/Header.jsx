import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import api from "../api/api";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef(null);

  // ✅ funksion i përbashkët
  const updateCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  // 🔒 Logout
  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    }
  };

  // 🛒 SUBSCRIBE në të gjitha sinjalet e dobishme
  useEffect(() => {
    updateCart(); // në mount

    // 1) storage (vetëm kur ndryshohet nga tab tjetër)
    const onStorage = () => updateCart();
    window.addEventListener("storage", onStorage);

    // 2) event custom (nga e njëjta tab) - dëgjo si në window ashtu edhe në document
    const onCartUpdated = () => updateCart();
    window.addEventListener("cartUpdated", onCartUpdated);
    document.addEventListener("cartUpdated", onCartUpdated);

    // 3) kur tab fokusohet ose kthehet nga background
    const onFocus = () => updateCart();
    const onVisibility = () => updateCart();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
      document.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // 4) kur ndryshon rruga (p.sh. nga /checkout -> /shop)
  useEffect(() => {
    updateCart();
  }, [location.pathname]);

  // 🎟️ rifresko token kur ndryshon
  useEffect(() => {
    const t = () => setToken(localStorage.getItem("token"));
    t();
    window.addEventListener("storage", t);
    return () => window.removeEventListener("storage", t);
  }, []);

  // 🚪 mbyll menunë kur klikon jashtë
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  const linkClass = (path) =>
    location.pathname === path
      ? "relative text-white font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-pink-500 transition"
      : "text-gray-300 hover:text-white transition";

  return (
    <header className="w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text tracking-wide"
        >
          MyStore
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/shop" className={linkClass("/shop")}>Shop</Link>

          {/* Cart me tekst */}
          <Link
            to="/cart"
            className={`relative flex items-center gap-2 ${
              location.pathname === "/cart"
                ? "text-white font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-pink-500"
                : "text-gray-300 hover:text-pink-400 transition"
            }`}
          >
            <ShoppingCart size={22} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/about" className={linkClass("/about")}>About</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

          {token && (
            <div className="flex items-center gap-5">
              <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-pink-400 transition flex items-center gap-1"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-white/10 shadow-xl"
        >
          <nav className="flex flex-col p-6 space-y-4 text-gray-300 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className={linkClass("/shop")}>Shop</Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 ${
                location.pathname === "/cart"
                  ? "text-white font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-pink-500"
                  : "text-gray-300 hover:text-pink-400 transition"
              }`}
            >
              <ShoppingCart size={20} /> <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/about" onClick={() => setMenuOpen(false)} className={linkClass("/about")}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className={linkClass("/contact")}>Contact</Link>

            {token && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className={linkClass("/dashboard")}>Dashboard</Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="flex items-center gap-1 text-gray-300 hover:text-pink-400 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
