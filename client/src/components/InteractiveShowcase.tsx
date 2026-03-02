import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { STYLES } from "@/data/mockData";
import { Sparkles, ArrowRight, Focus, Hexagon, Fingerprint, Layers, Wind, Droplets } from "lucide-react";

export default function InteractiveShowcase() {
  return (
    <div className="flex flex-col gap-24 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <MosaicComponent />
        <AmberFluidComponent />
        <CrimsonBrutalistComponent />
        <AmethystNeonComponent />
        <CosmicSwirlComponent />
        <TexturedCanopyComponent />
        <AzureVoyageComponent />
        <MidnightGroveComponent />
        <IridescentPearlComponent />
        <MonarchMacroComponent />
      </div>
    </div>
  );
}

// 1. Mosaic Horizon: Layered Paper Quilling
function MosaicComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[0];
  
  return (
    <ShowcaseWrapper title={theme.name} description="Layered dimensional depths mimicking stacked paper quilling.">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        className="relative px-8 py-4 rounded-xl font-bold tracking-widest text-white uppercase overflow-hidden group transition-all"
        style={{
          background: theme.colors.primary,
          boxShadow: `
            inset 0px 4px 0px rgba(255,255,255,0.2), 
            inset 0px -4px 0px rgba(0,0,0,0.3),
            0px 8px 0px ${theme.colors.secondary},
            0px 12px 15px rgba(0,0,0,0.4)
          `
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Layers size={18} /> Interact
        </span>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </ShowcaseWrapper>
  );
}

// 2. Amber Tides: Fluid warm waves
function AmberFluidComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[1];

  return (
    <ShowcaseWrapper title={theme.name} description="Organic shapes, fluid hover states simulating rolling waves.">
      <motion.div
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        className="relative w-48 h-16 rounded-full overflow-hidden cursor-pointer flex items-center justify-center font-bold text-white group shadow-[0_0_40px_rgba(210,105,57,0.4)]"
        style={{ background: theme.colors.secondary }}
      >
        <span className="relative z-10 mix-blend-difference flex items-center gap-2">
           <Droplets size={18} /> Morph
        </span>
        <motion.div 
          className="absolute inset-0 w-[200%] h-full opacity-80"
          style={{ background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent}, ${theme.colors.primary})` }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
        />
      </motion.div>
    </ShowcaseWrapper>
  );
}

// 3. Crimson Beacon: High-contrast Brutalism
function CrimsonBrutalistComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[2];

  return (
    <ShowcaseWrapper title={theme.name} description="Stark brutalist diagonals, sharp contrast, rigid interactions.">
      <motion.button
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        whileHover={{ x: 6, y: -6, boxShadow: `-6px 6px 0px ${theme.colors.accent}` }}
        className="relative px-8 py-4 font-display font-black text-xl uppercase border-2 transition-all duration-200"
        style={{ 
          borderColor: theme.colors.primary, 
          color: theme.colors.primary,
          boxShadow: `-2px 2px 0px ${theme.colors.accent}`
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          Ignite <ArrowRight strokeWidth={3} size={20} />
        </span>
        <div 
          className="absolute inset-0 bg-red-500/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ background: theme.colors.primary }}
        />
      </motion.button>
    </ShowcaseWrapper>
  );
}

// 4. Amethyst Peaks: Neon Glow / Glass
function AmethystNeonComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[3];

  return (
    <ShowcaseWrapper title={theme.name} description="Ethereal dark mode with intensive neon glow auras.">
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        className="relative p-0.5 rounded-2xl cursor-pointer group"
        style={{ background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
             style={{ background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.accent})` }} />
        
        <div className="relative px-8 py-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/5 flex items-center gap-3">
          <Sparkles className="text-purple-400" size={20} />
          <span className="font-medium text-purple-100 tracking-wide">Pulse Action</span>
        </div>
      </motion.div>
    </ShowcaseWrapper>
  );
}

// 5. Cosmic Swirl: Parallax Stardust
function CosmicSwirlComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[4];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ShowcaseWrapper title={theme.name} description="Expansive, floating UI with subtle particle parallax effects.">
      <motion.div
        onHoverStart={() => { setIsHovered(true); playSound("active"); }}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-48 h-16 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border border-white/10"
        style={{ background: theme.colors.primary }}
      >
        <span className="relative z-20 font-bold text-white tracking-widest uppercase text-sm">
          Warp Drive
        </span>
        
        {/* Animated stars */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 200 - 100, 
                y: Math.random() * 60 - 30,
                scale: 0 
              }}
              animate={isHovered ? {
                x: (Math.random() * 200 - 100) * 1.5,
                y: (Math.random() * 60 - 30) * 1.5,
                scale: [0, 1, 0]
              } : {}}
              transition={{ duration: 1 + Math.random(), repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </ShowcaseWrapper>
  );
}

// 6. Textured Canopy: Tactile Grain
function TexturedCanopyComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[5];

  return (
    <ShowcaseWrapper title={theme.name} description="Heavily embossed surfaces with extreme noise texture and organic feel.">
      <motion.button
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        whileTap={{ scale: 0.98, boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5)" }}
        className="relative px-8 py-4 rounded-3xl font-serif text-lg text-amber-50/90 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
        style={{ background: theme.colors.secondary }}
      >
        <div className="absolute inset-0 noise-overlay opacity-20" />
        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
          <Fingerprint size={20} /> Tangible
        </span>
      </motion.button>
    </ShowcaseWrapper>
  );
}

// 7. Azure Voyage: Minimalist Focal Point
function AzureVoyageComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[6];

  return (
    <ShowcaseWrapper title={theme.name} description="Monochromatic minimalism intercepted by stark, sudden animations.">
      <div 
        className="relative group cursor-pointer flex items-center gap-4"
        onMouseEnter={() => playSound("hover")}
        onClick={() => playSound("click")}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500"
             style={{ backgroundColor: theme.colors.primary }}>
          <Focus size={20} className="text-white" />
        </div>
        <div className="relative">
          <span className="text-2xl font-light text-zinc-300 tracking-wide">Explore</span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ backgroundColor: theme.colors.accent }}
          />
        </div>
      </div>
    </ShowcaseWrapper>
  );
}

// 8. Midnight Grove: Backlit Silhouettes
function MidnightGroveComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[7];
  
  return (
    <ShowcaseWrapper title={theme.name} description="Soft spotlight hover effects creating backlit component edges.">
      <div className="relative p-8 rounded-2xl bg-zinc-900 border border-white/5 group overflow-hidden cursor-pointer"
           onMouseEnter={() => playSound("hover")}
           onClick={() => playSound("click")}>
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle at 50% 120%, ${theme.colors.accent}40, transparent 70%)` }}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <Wind size={28} className="text-emerald-700 group-hover:text-amber-200 transition-colors duration-500 drop-shadow-[0_0_10px_rgba(243,198,111,0.5)]" />
          <span className="font-display text-sm tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-500">
            Enchant
          </span>
        </div>
      </div>
    </ShowcaseWrapper>
  );
}

// 9. Iridescent Pearl: Holographic Glass
function IridescentPearlComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[8];

  return (
    <ShowcaseWrapper title={theme.name} description="Shifting holographic gradients with extreme glassmorphism.">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => playSound("active")}
        className="relative px-8 py-4 rounded-2xl cursor-pointer overflow-hidden border border-white/20 shadow-[0_10px_30px_rgba(95,191,181,0.2)]"
      >
        {/* Holographic background */}
        <div className="absolute inset-0 opacity-80" 
             style={{ 
               background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent}, ${theme.colors.primary})`,
               backgroundSize: "300% 300%",
               animation: "gradient-shift 4s ease infinite" 
             }} 
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
        <span className="relative z-10 font-bold text-white tracking-wide mix-blend-overlay text-lg">
          Iridescence
        </span>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}} />
      </motion.div>
    </ShowcaseWrapper>
  );
}

// 10. Monarch Macro: Geometric Precision
function MonarchMacroComponent() {
  const playSound = useSoundEffect();
  const theme = STYLES[9];

  return (
    <ShowcaseWrapper title={theme.name} description="High-contrast geometric structures with micro-interaction snapping.">
      <motion.button
        onHoverStart={() => playSound("hover")}
        onClick={() => playSound("click")}
        whileHover={{ borderRadius: "0px" }}
        className="relative px-8 py-4 rounded-[20px] font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 overflow-hidden flex items-center gap-3"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <Hexagon size={18} fill="black" className="text-black" />
        <span className="relative z-10">Construct</span>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
      </motion.button>
    </ShowcaseWrapper>
  );
}


// Layout wrapper for components
function ShowcaseWrapper({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 p-8 glass-panel rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-display font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400 font-light">{description}</p>
      </div>
      <div className="flex-1 min-h-[160px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden">
         {children}
      </div>
    </div>
  );
}
