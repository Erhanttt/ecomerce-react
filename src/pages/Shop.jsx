import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Search, ChevronDown, ArrowUpDown, Grid3x3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // asc ose desc
  const [viewMode, setViewMode] = useState("grid"); // grid ose list
  const [showFilters, setShowFilters] = useState(false);

  // 🔢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const getData = async () => {
      try {
        const prodRes = await api.get("/products");
        const catRes = await api.get("/categories");
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së të dhënave:", err);
      }
    };
    getData();
  }, []);

  // 🔍 Filtrimi & Kërkimi
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? p.category?.id === parseInt(selectedCategory)
        : true;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  // 📄 Llogaritja për Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* 🎨 Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Zbulo Koleksionin Tonë
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Produktet më të mira, vetëm për ty
          </p>
          
          {/* Search Bar në Hero */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Kërko produktin tënd të preferuar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg shadow-2xl focus:ring-4 focus:ring-white/50 outline-none transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🎛️ Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Results count */}
            <div className="text-gray-700 font-medium">
              <span className="text-purple-600 font-bold">{filteredProducts.length}</span> produkte
            </div>

            {/* Center: Filters (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Të gjitha kategoritë</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
              </div>

              {/* Sort by Price */}
              <button
                onClick={() =>
                  setSortOrder((prev) =>
                    prev === "asc" ? "desc" : prev === "desc" ? "" : "asc"
                  )
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  sortOrder
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <ArrowUpDown size={18} />
                {sortOrder === "asc"
                  ? "Çmimi ↑"
                  : sortOrder === "desc"
                  ? "Çmimi ↓"
                  : "Rendit"}
              </button>
            </div>

            {/* Right: View Mode + Mobile Filter */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg"
              >
                <SlidersHorizontal size={18} />
                Filtro
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition ${
                    viewMode === "grid"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition ${
                    viewMode === "list"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="List View"
                >
                  <Grid3x3 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filtrat</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Të gjitha kategoritë</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Renditja</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSortOrder("")}
                    className={`py-3 rounded-lg font-medium transition ${
                      sortOrder === ""
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`py-3 rounded-lg font-medium transition ${
                      sortOrder === "asc"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Çmimi ↑
                  </button>
                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`py-3 rounded-lg font-medium transition ${
                      sortOrder === "desc"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Çmimi ↓
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition"
              >
                Apliko Filtrat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛍️ Products Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {currentProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-gray-100 ${
                    viewMode === "list"
                      ? "w-48 h-48 flex-shrink-0"
                      : "h-64 w-full"
                  }`}
                >
                  <img
                    src={`http://127.0.0.1:8000/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {product.category.name}
                    </span>
                  )}
                  {product.qty === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Mbaroi</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description || "Pa përshkrim të disponueshëm"}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                      €{product.price}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        product.qty > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.qty > 0 ? `${product.qty} në stok` : "Mbaroi"}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    Shiko detajet
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Nuk u gjet asnjë produkt</h3>
            <p className="text-gray-500">Provo të ndryshosh filtrat ose kërkimin</p>
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Mbrapa
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-500">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Para →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}