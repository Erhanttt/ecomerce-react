import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductShow from "./pages/ProductShow";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import MessageShow from "./pages/MessageShow";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import OrdersShow from "./pages/OrdersShow";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ScrollToTop />

        <main className="flex-grow">
          <Routes>
            {/* 🌐 Publike */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductShow />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Order />} />

            {/* 🔐 Admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<MessageShow />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:id" element={<OrdersShow />} />

            {/* 👤 Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
