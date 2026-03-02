import { motion } from "framer-motion";
import { useLocation } from "wouter";

interface HybridData {
  id: string;
  name: string;
  description: string;
  previewImg: string;
  secondaryImg: string;
  styles: Array<{ name: string }>;
  layouts: Array<{ name: string }>;
}

export default function HybridCard({ hybrid, index }: { hybrid: HybridData; index: number }) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setLocation(`/preview/${hybrid.id}`)}
      className="relative rounded-3xl overflow-hidden group h-[500px] cursor-pointer"
      data-testid={`card-hybrid-${hybrid.id}`}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={hybrid.previewImg} 
          alt="" 
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity filter blur-[2px] transition-all duration-700 group-hover:blur-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-3">
            <img src={hybrid.previewImg} className="w-10 h-10 rounded-full border-2 border-black object-cover" alt="" />
            <img src={hybrid.secondaryImg} className="w-10 h-10 rounded-full border-2 border-black object-cover" alt="" />
          </div>
          <div className="text-xs uppercase tracking-widest text-white/70 font-medium">
            Synthesis
          </div>
        </div>

        <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-wide drop-shadow-md group-hover:text-amber-100 transition-colors duration-300">
          {hybrid.name}
        </h3>
        
        <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light max-w-sm">
          {hybrid.description}
        </p>

        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Styles</span>
            <span className="text-xs text-zinc-300">{hybrid.styles.map(s => s.name).join(" + ")}</span>
          </div>
          <div>
            <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Layouts</span>
            <span className="text-xs text-zinc-300">{hybrid.layouts.map(l => l.name).join(" + ")}</span>
          </div>
        </div>
        
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="glass-panel px-4 py-2 rounded-full text-xs font-medium tracking-wide">
            Preview Layout
          </div>
        </div>
      </div>
    </motion.div>
  );
}
