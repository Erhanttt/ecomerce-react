import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";

// TikTok Icon (custom SVG)
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    try {
      // await api.post("/messages", form);
      // Simulim i suksesit për demo
      setTimeout(() => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      }, 500);
    } catch (err) {
      console.error("Gabim gjatë dërgimit të mesazhit:", err);
      setError("Dështoi dërgimi i mesazhit. Ju lutem provoni përsëri.");
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-blue-400" size={28} />,
      title: "Adresa",
      content: "Rr. Ilinden, Tetovë, Maqedonia e Veriut",
      color: "blue"
    },
    {
      icon: <Phone className="text-emerald-400" size={28} />,
      title: "Telefoni",
      content: "+389 70 123 456",
      color: "emerald"
    },
    {
      icon: <Mail className="text-cyan-400" size={28} />,
      title: "Email",
      content: "info@mystore.com",
      color: "cyan"
    },
    {
      icon: <Clock className="text-amber-400" size={28} />,
      title: "Orari",
      content: "E Hënë – E Shtunë: 09:00 – 22:00",
      color: "amber"
    }
  ];

  const socialLinks = [
    { 
      icon: <Facebook size={24} />, 
      name: "Facebook", 
      color: "bg-blue-600 hover:bg-blue-700",
      link: "#"
    },
    { 
      icon: <Instagram size={24} />, 
      name: "Instagram", 
      color: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 hover:opacity-90",
      link: "#"
    },
    { 
      icon: <TikTokIcon />, 
      name: "TikTok", 
      color: "bg-gray-900 hover:bg-black border-2 border-cyan-400",
      link: "#"
    },
    { 
      icon: <MessageCircle size={24} />, 
      name: "WhatsApp", 
      color: "bg-green-500 hover:bg-green-600",
      link: "#"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 lg:py-24">
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6">
        <div className="inline-block mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1 rounded-full">
            <div className="bg-slate-900 px-6 py-2 rounded-full">
              <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                💬 Na Kontaktoni
              </span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Jemi Këtu Për Ju
          </span>
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
          Kemi dëshirë të dëgjojmë nga ju! Plotësoni formularin më poshtë ose na kontaktoni drejtpërdrejt.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Contact Form - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Dërgo Mesazh
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">Na shkruani dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm sm:text-base">
                  ⚠️ {error}
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm sm:text-base">
                  ✅ Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
                </div>
              )}

              <div className="space-y-5 sm:space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Emri Juaj *</label>
                  <input
                    type="text"
                    placeholder="Shkruani emrin tuaj të plotë"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 sm:p-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-cyan-400 focus:bg-slate-900/70 outline-none transition-all duration-300 text-sm sm:text-base group-hover:border-slate-600"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Adresa *</label>
                  <input
                    type="email"
                    placeholder="emri.juaj@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 sm:p-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-cyan-400 focus:bg-slate-900/70 outline-none transition-all duration-300 text-sm sm:text-base group-hover:border-slate-600"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Mesazhi Juaj *</label>
                  <textarea
                    placeholder="Shkruani mesazhin tuaj këtu..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 sm:p-4 rounded-xl bg-slate-900/50 border border-slate-700 h-32 sm:h-40 resize-none focus:border-cyan-400 focus:bg-slate-900/70 outline-none transition-all duration-300 text-sm sm:text-base group-hover:border-slate-600"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
                >
                  <Send size={20} /> Dërgo Mesazhin
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-400 mb-1">{info.title}</h3>
                      <p className="text-white text-sm sm:text-base font-medium">{info.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Section */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Rrjetet Sociale
                </span>
              </h3>
              <p className="text-slate-300 text-center mb-6 text-sm sm:text-base">Na ndiqni në platformat tona</p>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`${social.color} p-3 sm:p-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base`}
                  >
                    {social.icon}
                    <span className="font-semibold hidden sm:inline">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-800/50 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto text-cyan-400 mb-3" />
                  <p className="text-slate-400 text-sm sm:text-base">Harta do të shfaqet këtu</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
        <p className="text-slate-400 text-sm sm:text-base">
          Pritni përgjigje brenda 24 orëve të punës 🚀
        </p>
      </div>
    </section>
  );
}