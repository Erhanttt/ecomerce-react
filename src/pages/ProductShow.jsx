import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { ArrowLeft, ShoppingBag, Loader2, CheckCircle } from "lucide-react";

export default function ProductShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); // ✅ për animacion “u shtua”

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së produktit:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Merr shportën aktuale nga localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kontrollo nëse ekziston produkti
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1; // rrit sasinë
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // Ruaj sërish në localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Përditëso “cartCount” në header përmes eventit
    window.dispatchEvent(new Event("storage"));

    // Shfaq animacion “u shtua”
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin mr-2" /> Duke ngarkuar produktin...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-xl mb-4">Produkti nuk u gjet!</p>
        <button
          onClick={() => navigate(-1)}
          className="text-pink-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Kthehu pas
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* 🖼️ Foto */}
        <div className="flex justify-center">
          <img
            src={`http://127.0.0.1:8000/${product.image}`}
            alt={product.name}
            className="rounded-2xl shadow-2xl max-h-[500px] object-cover"
          />
        </div>

        {/* 📦 Detajet */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-pink-400 mb-6 hover:underline"
          >
            <ArrowLeft size={18} /> Kthehu pas
          </button>

          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-400 mb-4">
            {product.description || "Pa përshkrim."}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-pink-500/20 text-pink-300 px-4 py-1.5 rounded-full text-sm font-medium">
              {product.category?.name || "Pa kategori"}
            </span>
            <span className="text-2xl font-semibold text-green-400">
              €{product.price}
            </span>
          </div>

          <p className="text-gray-400 mb-6">
            Disponueshmëri:{" "}
            {product.qty > 0 ? (
              <span className="text-green-400 font-semibold">
                Në stok ({product.qty})
              </span>
            ) : (
              <span className="text-red-400 font-semibold">Nuk ka stok</span>
            )}
          </p>

          {/* 🛒 Butoni për shportë */}
          <button
            onClick={handleAddToCart}
            disabled={product.qty === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            <ShoppingBag size={20} />
            {product.qty === 0 ? "S’ka stok" : "Shto në Shportë"}
          </button>

          {/* ✅ Notifikim */}
          {added && (
            <div className="mt-4 flex items-center gap-2 text-green-400 font-medium">
              <CheckCircle size={20} />
              Produkti u shtua në shportë!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
