import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* 🛍️ Logo + Përshkrimi */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
              MyStore
            </span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm">
            Dyqani yt modern për veshje, aksesorë dhe produkte me stil unik.
            Zgjidh cilësinë, komoditetin dhe dizajnin që të përfaqëson.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* 📄 Linke të Shpejta */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Linke të Shpejta</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-pink-400 transition">
                Ballina
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-pink-400 transition">
                Dyqani
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-pink-400 transition">
                Rreth Nesh
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-400 transition">
                Kontakti
              </Link>
            </li>
          </ul>
        </div>

        {/* 📦 Shërbime */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Shërbime</h3>
          <ul className="space-y-3">
            <li>Transport i shpejtë & i sigurt</li>
            <li>Kthim brenda 14 ditëve</li>
            <li>Pagesë e sigurt online</li>
            <li>Mbështetje 24/7</li>
          </ul>
        </div>

        {/* 📬 Kontakti */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Na Kontakto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-pink-400" /> Tetovë, Maqedonia e Veriut
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-pink-400" /> +389 70 123 456
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-pink-400" /> info@mystore.com
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Rreshti i fundit */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyStore. Të gjitha të drejtat e rezervuara.
      </div>
    </footer>
  );
}
