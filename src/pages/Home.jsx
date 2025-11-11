import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getLatest = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.slice(0, 12));
      } catch (err) {
        console.error("Gabim gjatë marrjes së produkteve:", err);
      }
    };
    getLatest();
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4 sm:px-6">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900"></div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Zbulo <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">stilin</span> tënd
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Mirë se vini në platformën tonë — një vend ku moda, komoditeti dhe
            eleganca bashkohen për t'ju ofruar produktet më të kërkuara.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
          >
            <ShoppingBag size={20} /> Vizito Dyqanin
          </Link>
        </div>
      </section>

      {/* SEKSIONI PËRSHKRUES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <Sparkles className="mx-auto mb-6 text-cyan-400" size={44} />
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ne nuk ndjekim trendet — ne krijojmë ndjenja.
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Çdo produkt është i zgjedhur me kujdes për të përcjellë një histori,
          një emocion dhe një ndjesi unike. Nga veshjet e përditshme te aksesorët
          elegantë — stili juaj fillon këtu.
        </p>
      </section>

      {/* PRODUKTET E FUNDIT */}
      <section className="py-16 sm:py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-0">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Produktet më të reja
              </span>
            </h3>
          </div>

          {/* GRID E PRODUKTEVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={`http://127.0.0.1:8000/${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    {p.category?.name || "Pa kategori"}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-base sm:text-lg font-semibold truncate mb-2 group-hover:text-cyan-400 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2 min-h-[40px] mb-3">
                    {p.description || "Pa përshkrim"}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                    <span className="text-cyan-400 font-bold text-lg">€{p.price}</span>
                    <span className="text-slate-500 text-sm">{p.qty} copë</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* BUTON VIZITO DYQANIN */}
          <div className="text-center mt-12 sm:mt-14">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
            >
              <ShoppingBag size={20} /> Vizito Dyqanin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}