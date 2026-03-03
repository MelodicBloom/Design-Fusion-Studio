import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Palette, Type, Sparkles } from "lucide-react";

interface StyleData {
  id: string;
  name: string;
  description: string;
  image: string;
  colors: { primary: string; secondary: string; accent: string };
  traits: string[];
}

export default function StyleCard({ styleData, index }: { styleData: StyleData; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onClick={() => setExpanded(true)}
        className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col h-[420px] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
        data-testid={`card-style-${styleData.id}`}
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
          <img 
            src={styleData.image} 
            alt={styleData.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 z-20 flex gap-1">
            {Object.values(styleData.colors).map((color, i) => (
              <div 
                key={i} 
                className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow relative z-20 bg-background/80 backdrop-blur-md">
          <h3 className="text-xl font-display font-semibold mb-2 text-white">{styleData.name}</h3>
          <p className="text-sm text-zinc-400 mb-4 line-clamp-3 font-light leading-relaxed">
            {styleData.description}
          </p>
          
          <div className="mt-auto flex flex-wrap gap-2">
            {styleData.traits.map((trait, i) => (
              <span 
                key={i} 
                className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={styleData.image} alt={styleData.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <button
                  onClick={() => setExpanded(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  data-testid="button-close-detail"
                  aria-label="Close detail view"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-6 left-8">
                  <h2 className="text-4xl font-display font-bold text-white drop-shadow-lg">{styleData.name}</h2>
                </div>
              </div>

              <div className="p-8 flex flex-col gap-8">
                <p className="text-zinc-300 text-base leading-relaxed font-light">{styleData.description}</p>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Palette size={16} className="text-zinc-500" />
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Color Palette</h4>
                  </div>
                  <div className="flex gap-4">
                    {Object.entries(styleData.colors).map(([name, color]) => (
                      <div key={name} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl border border-white/10 shadow-lg" style={{ backgroundColor: color }} />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{name}</span>
                        <span className="text-xs font-mono text-zinc-400">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Type size={16} className="text-zinc-500" />
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Typography Preview</h4>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5" style={{ background: `${styleData.colors.primary}15` }}>
                    <p className="font-display text-3xl font-bold mb-2" style={{ color: styleData.colors.accent }}>Heading One</p>
                    <p className="text-lg mb-1" style={{ color: styleData.colors.secondary }}>Subheading text with secondary color</p>
                    <p className="text-sm text-zinc-400">Body text demonstrating how paragraph copy would appear within this aesthetic framework.</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-zinc-500" />
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Interactive Sample</h4>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                      style={{ backgroundColor: styleData.colors.primary, boxShadow: `0 4px 15px ${styleData.colors.primary}40` }}
                      data-testid={`button-primary-${styleData.id}`}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl text-sm font-medium border-2 transition-all hover:scale-105"
                      style={{ borderColor: styleData.colors.secondary, color: styleData.colors.secondary }}
                      data-testid={`button-secondary-${styleData.id}`}
                    >
                      Secondary
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: `${styleData.colors.accent}20`, color: styleData.colors.accent }}
                      data-testid={`button-accent-${styleData.id}`}
                    >
                      Accent
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {styleData.traits.map((trait, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border"
                      style={{ borderColor: `${styleData.colors.accent}40`, color: styleData.colors.accent }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
