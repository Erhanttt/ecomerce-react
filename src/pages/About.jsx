import { Sparkles, Truck, Award, Package } from "lucide-react";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Rreth Nesh
          </span>
        </h1>
        <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto">
          Passion për modën, cilësi e garantuar dhe shërbim që ju meriton
        </p>
      </div>

      {/* Fashion Images */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Inspiruar nga Moda Botërore
          </span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="relative overflow-hidden rounded-xl group">
            <img 
              src="https://www.instyle.com/thmb/qfko9PTGB8-PDT6Up_EBPOEnbrs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/030623-Best-paris-fashion-week-looks-59fc172906e64bd3b4ade2e59d5ac2fb.jpg" 
              alt="Paris Fashion"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">Paris Fashion Week</p>
          </div>

          <div className="relative overflow-hidden rounded-xl group">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" 
              alt="Milano Fashion"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">Milano Fashion Show</p>
          </div>

          <div className="relative overflow-hidden rounded-xl group sm:col-span-2 lg:col-span-1">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" 
              alt="New York Fashion"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">New York Fashion Week</p>
          </div>
        </div>

        <p className="text-slate-300 text-center text-base sm:text-lg max-w-3xl mx-auto">
          Ne ndjekim trendet më të fundit nga sfilatat e modës në Milano, Paris dhe New York 
          për t'ju sjellë stilet më elegante direkt në garderobën tuaj.
        </p>
      </div>

      {/* Quality Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-slate-800/50 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-slate-700/50">
          <div className="text-center mb-8">
            <Award className="mx-auto text-cyan-400 mb-4" size={48} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cilësi e Garantuar
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Në MyStore, cilësia është prioriteti ynë kryesor. Çdo produkt që ofrojmë 
                kalon nëpër kontrolle të rrepta para se të arrijë tek ju.
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Punojmë vetëm me furnitorët më të besueshëm dhe prodhuesit që respektojnë 
                standardet më të larta. Stafi ynë kontrollon çdo detaj për t'u siguruar që 
                merrni saktësisht atë që porosisni!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg flex-shrink-0">
                  <Sparkles className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">100% Origjinale</h4>
                  <p className="text-slate-400 text-sm">Vetëm produkte autentike dhe të verifikuara</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-lg flex-shrink-0">
                  <Award className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Kontroll i Detajuar</h4>
                  <p className="text-slate-400 text-sm">Çdo artikull inspektohet para dërgimit</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg flex-shrink-0">
                  <Package className="text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Paketim Premium</h4>
                  <p className="text-slate-400 text-sm">Çdo produkt paketohet me kujdes maksimal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <Truck className="mx-auto text-cyan-400 mb-4" size={48} />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dërgesa të Shpejta
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Bashkëpunojmë me kompanitë më të mira të postës për dërgim të shpejtë dhe të sigurt
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 text-center">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dërgim Express</h3>
            <p className="text-slate-400 text-sm">24-48 orë në qytetet kryesore</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 text-center">
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Paketim i Sigurt</h3>
            <p className="text-slate-400 text-sm">Arrin në gjendje perfekte</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 text-center">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Gjurmim Online</h3>
            <p className="text-slate-400 text-sm">Ndiqeni porosinë në kohë reale</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50">
          <p className="text-slate-300 text-center text-base sm:text-lg leading-relaxed">
            Punojmë me <span className="text-cyan-400 font-semibold">Posta Shqiptare</span>, 
            <span className="text-cyan-400 font-semibold"> DHL</span>, 
            <span className="text-cyan-400 font-semibold"> FedEx</span> dhe kurierë vendorë. 
            Shumica e porosive arrijnë brenda <span className="text-white font-semibold">2-5 ditëve pune</span>!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 border-t border-slate-700/50">
        <Sparkles className="mx-auto text-cyan-400 mb-4" size={36} />
        <p className="text-slate-400">
          MyStore © {new Date().getFullYear()} – Faleminderit që na zgjidhni 💙
        </p>
      </div>
    </section>
  );
}