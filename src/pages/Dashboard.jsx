import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/api";
import {
  FolderOpen,
  Package,
  PlusCircle,
  Edit,
  Trash2,
  X,
  Search,
  Check,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editName, setEditName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    category_id: "",
    image: null,
  });

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    category_id: "",
    image: null,
  });

  const getData = async () => {
    try {
      const [catRes, prodRes, msgRes, orderRes] = await Promise.all([
        api.get("/categories"),
        api.get("/products"),
        api.get("/messages"),
        api.get("/orders"),
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
      setMessages(msgRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së të dhënave:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await api.post("/categories", { name: newCategory });
      setNewCategory("");
      getData();
    } catch (err) {
      console.error("Gabim gjatë shtimit të kategorisë:", err);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(`/categories/${id}`, { name: editName });
      setEditingCategoryId(null);
      getData();
    } catch (err) {
      console.error("Gabim gjatë editimit:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("A je i sigurt që dëshiron ta fshish këtë kategori?")) return;
    try {
      await api.delete(`/categories/${id}`);
      getData();
    } catch (err) {
      console.error("Gabim gjatë fshirjes:", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          form.append(key, value);
        }
      });

      await api.post("/products", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Produkti u shtua me sukses!");
      setShowAddProduct(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        qty: "",
        category_id: "",
        image: null,
      });
      getData();
    } catch (err) {
      console.error("❌ Gabim gjatë shtimit të produktit:", err);
      if (err.response?.data?.errors) {
        console.table(err.response.data.errors);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      qty: product.qty,
      category_id: product.category_id,
      image: null,
    });
    setShowEditProduct(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      if (editForm.name) form.append("name", editForm.name);
      if (editForm.description) form.append("description", editForm.description);
      if (editForm.price) form.append("price", editForm.price);
      if (editForm.qty) form.append("qty", editForm.qty);
      if (editForm.category_id) form.append("category_id", editForm.category_id);
      if (editForm.image instanceof File) {
        form.append("image", editForm.image);
      }

      await api.post(`/products/${selectedProduct.id}?_method=PUT`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Produkti u përditësua me sukses!");
      setShowEditProduct(false);
      setSelectedProduct(null);
      getData();
    } catch (err) {
      console.error("❌ Gabim gjatë përditësimit të produktit:", err);
      if (err.response?.data?.errors) {
        console.table(err.response.data.errors);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("A je i sigurt që dëshiron ta fshish këtë produkt?")) return;
    try {
      await api.delete(`/products/${id}`);
      getData();
    } catch (err) {
      console.error("Gabim gjatë fshirjes së produktit:", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory
      ? p.category_id === parseInt(filterCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: <FolderOpen size={28} />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Products",
      value: products.length,
      icon: <Package size={28} />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending Orders",
      value: orders.filter((o) => o.status === "pending").length,
      icon: <ShoppingCart size={28} />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/orders",
    },
    {
      title: "New Messages",
      value: messages.length,
      icon: <MessageSquare size={28} />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      link: "/messages",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">Mirë se vini përsëri! Ja një përmbledhje e shpejtë.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Card = stat.link ? Link : "div";
          return (
            <Card
              key={index}
              to={stat.link || undefined}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <Activity className="text-slate-500" size={20} />
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setShowCategories(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
        >
          <FolderOpen size={20} /> Menaxho Kategoritë
        </button>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
        >
          <PlusCircle size={20} /> Shto Produkt
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl px-4 py-3 flex-1">
          <Search className="text-slate-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Kërko produkt sipas emrit, përshkrimit ose kategorisë..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder-slate-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none"
        >
          <option value="">Të gjitha kategoritë</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700/50">
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">ID</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Imazhi</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Emri</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Çmimi</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Sasia</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Përshkrimi</th>
                <th className="text-left p-4 text-slate-300 font-semibold text-sm">Kategoria</th>
                <th className="text-right p-4 text-slate-300 font-semibold text-sm">Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="p-4 text-slate-300 font-medium">{p.id}</td>
                  <td className="p-4">
                    <img
                      src={`http://127.0.0.1:8000/${p.image}`}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                    />
                  </td>
                  <td className="p-4 text-white font-medium">{p.name}</td>
                  <td className="p-4">
                    <span className="text-cyan-400 font-semibold">{p.price} €</span>
                  </td>
                  <td className="p-4 text-slate-300">{p.qty}</td>
                  <td className="p-4 text-slate-400 text-sm max-w-xs truncate">
                    {p.description || "-"}
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {p.category ? p.category.name : "-"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Package size={48} className="mx-auto mb-3 opacity-50" />
            <p>Nuk u gjetën produkte.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCategories && (
        <CategoriesModal
          onClose={() => setShowCategories(false)}
          categories={categories}
          products={products}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          editingCategoryId={editingCategoryId}
          setEditingCategoryId={setEditingCategoryId}
          editName={editName}
          setEditName={setEditName}
          handleSaveEdit={handleSaveEdit}
        />
      )}

      {showAddProduct && (
        <ProductModal
          title="Shto Produkt të Ri"
          onClose={() => setShowAddProduct(false)}
          onSubmit={handleAddProduct}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
        />
      )}

      {showEditProduct && selectedProduct && (
        <ProductModal
          title={`Edito Produktin #${selectedProduct.id}`}
          onClose={() => setShowEditProduct(false)}
          onSubmit={handleUpdateProduct}
          formData={editForm}
          setFormData={setEditForm}
          categories={categories}
          isEdit
        />
      )}
    </div>
  );
}

/* Categories Modal */
function CategoriesModal({
  onClose,
  categories,
  products,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleDeleteCategory,
  editingCategoryId,
  setEditingCategoryId,
  editName,
  setEditName,
  handleSaveEdit,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FolderOpen className="text-blue-400" size={28} />
          <span className="text-white">Menaxho Kategoritë</span>
        </h2>

        <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Emri i kategorisë së re..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Shto
          </button>
        </form>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {categories.map((c) => {
            const productCount = products.filter((p) => p.category_id === c.id).length;
            return (
              <div
                key={c.id}
                className="flex justify-between items-center bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors"
              >
                {editingCategoryId === c.id ? (
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit(c.id)}
                      className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
                    >
                      <Check size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-slate-500 text-sm ml-2">({productCount} produkte)</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCategoryId(c.id);
                          setEditName(c.name);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(c.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
          {categories.length === 0 && (
            <p className="text-slate-500 text-center py-8">Nuk ka kategori të regjistruara.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Product Modal */
function ProductModal({
  title,
  onClose,
  onSubmit,
  formData,
  setFormData,
  categories,
  isEdit,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Package className="text-emerald-400" size={28} />
          <span className="text-white">{title}</span>
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Emri i produktit"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors"
            required
          />
          <textarea
            placeholder="Përshkrimi i produktit"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors h-24 resize-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Çmimi (€)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors"
              required
            />
            <input
              type="number"
              placeholder="Sasia"
              value={formData.qty}
              onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
              className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors"
            required
          >
            <option value="">Zgjidh kategorinë</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 file:font-semibold hover:file:bg-cyan-500/30 transition-colors"
          />
          <button
            type="submit"
            className={`w-full ${
              isEdit
                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                : "bg-gradient-to-r from-emerald-600 to-teal-600"
            } text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all`}
          >
            {isEdit ? "Përditëso Produktin" : "Ruaj Produktin"}
          </button>
        </form>
      </div>
    </div>
  );
}