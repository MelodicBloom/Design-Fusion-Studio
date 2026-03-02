import { useState } from "react";
import { motion } from "framer-motion";
import { STYLES, LAYOUTS, HYBRIDS } from "@/data/mockData";
import StyleCard from "@/components/StyleCard";
import LayoutCard from "@/components/LayoutCard";
import HybridCard from "@/components/HybridCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"styles" | "layouts" | "hybrids">("styles");

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Global Noise Texture */}
      <div className="noise-overlay z-50"></div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient bg-gradient-to-br from-white via-zinc-300 to-zinc-600"
        >
          Aesthetic Lexicon
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed"
        >
          An exploration of visual language. Ten distinct styles, ten structural layouts, and three intricate hybrids inspired by the fusion of art and interface.
        </motion.p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex justify-center mb-16 px-6">
        <div className="glass-panel p-1.5 rounded-full flex gap-2">
          {(["styles", "layouts", "hybrids"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                activeTab === tab 
                  ? "bg-white text-black shadow-lg" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "styles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {STYLES.map((style, i) => (
                <StyleCard key={style.id} styleData={style} index={i} />
              ))}
            </div>
          )}

          {activeTab === "layouts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LAYOUTS.map((layout, i) => (
                <LayoutCard key={layout.id} layout={layout} index={i} />
              ))}
            </div>
          )}

          {activeTab === "hybrids" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HYBRIDS.map((hybrid, i) => (
                <HybridCard key={hybrid.id} hybrid={hybrid} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
