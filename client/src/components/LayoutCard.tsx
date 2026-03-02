import { motion } from "framer-motion";
import { LayoutGrid, SplitSquareHorizontal, Layers, Columns, Image as ImageIcon, BoxSelect, Maximize, CircleDashed } from "lucide-react";

interface LayoutData {
  id: string;
  name: string;
  description: string;
}

const icons = [LayoutGrid, SplitSquareHorizontal, ImageIcon, Layers, Columns, SplitSquareHorizontal, BoxSelect, Maximize, CircleDashed, LayoutGrid];

export default function LayoutCard({ layout, index }: { layout: LayoutData; index: number }) {
  const Icon = icons[index % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-panel p-8 rounded-2xl flex flex-col gap-6 group hover:bg-white/[0.04] transition-colors duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-300">
        <Icon className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>
      
      <div>
        <h3 className="text-lg font-display font-semibold mb-2">{layout.name}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed font-light">
          {layout.description}
        </p>
      </div>

      {/* Abstract structural representation */}
      <div className="mt-auto h-24 border border-dashed border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="w-full px-4 flex gap-2 h-8">
          <div className="flex-1 bg-white/10 rounded-sm animate-pulse" style={{ animationDelay: `${index * 0.1}s` }} />
          <div className="w-1/3 bg-white/10 rounded-sm animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
        </div>
      </div>
    </motion.div>
  );
}
