import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LayoutGrid, SplitSquareHorizontal, Layers, Columns, Image as ImageIcon, BoxSelect, Maximize, CircleDashed, GalleryHorizontal, PanelLeft, X } from "lucide-react";

interface LayoutData {
  id: string;
  name: string;
  description: string;
}

const icons = [LayoutGrid, SplitSquareHorizontal, ImageIcon, Layers, Columns, GalleryHorizontal, BoxSelect, PanelLeft, Maximize, CircleDashed];

function LayoutPreview({ layoutId }: { layoutId: string }) {
  const previewStyles: Record<string, React.ReactNode> = {
    l1: (
      <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-full p-3">
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="col-span-2 row-span-2 bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} className="bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.7, repeat: Infinity }} className="col-span-2 bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} className="col-span-2 bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} className="bg-white/10 rounded-lg" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} className="bg-white/10 rounded-lg" />
      </div>
    ),
    l2: (
      <div className="flex w-full h-full gap-2 p-3">
        <motion.div animate={{ flex: [0.65, 0.55, 0.65] }} transition={{ duration: 3, repeat: Infinity }} className="bg-white/10 rounded-lg" />
        <div className="flex-[0.35] flex flex-col gap-2">
          <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="flex-1 bg-white/8 rounded-lg" />
          <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="flex-1 bg-white/8 rounded-lg" />
        </div>
      </div>
    ),
    l3: (
      <div className="relative w-full h-full p-3">
        <div className="absolute inset-3 bg-gradient-to-br from-white/10 to-white/5 rounded-lg" />
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-6 left-6 right-6 h-16 bg-white/15 backdrop-blur rounded-lg border border-white/10" />
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} className="absolute top-6 right-6 w-8 h-8 bg-white/15 backdrop-blur rounded-full" />
      </div>
    ),
    l4: (
      <div className="flex flex-col gap-3 w-full h-full p-3 overflow-hidden">
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="h-8 w-3/4 bg-white/10 rounded-lg self-start" />
        <motion.div animate={{ x: [0, -10, 0] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity }} className="h-8 w-3/4 bg-white/10 rounded-lg self-end" />
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} className="h-8 w-3/4 bg-white/10 rounded-lg self-start" />
      </div>
    ),
    l5: (
      <div className="relative w-full h-full p-3">
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-4 top-6 w-2/3 h-20 bg-white/15 rounded-lg shadow-lg" />
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} className="absolute left-8 top-10 w-2/3 h-20 bg-white/10 rounded-lg shadow-lg" />
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} className="absolute left-12 top-14 w-2/3 h-20 bg-white/8 rounded-lg shadow-lg" />
      </div>
    ),
    l6: (
      <div className="flex gap-2 w-full h-full p-3 overflow-hidden">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div key={i} animate={{ x: [-20, 0, -20] }} transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }} className="min-w-[60px] bg-white/10 rounded-lg" />
        ))}
      </div>
    ),
    l7: (
      <div className="grid grid-cols-3 gap-2 w-full h-full p-3 auto-rows-min">
        {[16, 24, 12, 20, 14, 22].map((h, i) => (
          <motion.div key={i} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="bg-white/10 rounded-lg" style={{ height: `${h * 2}px` }} />
        ))}
      </div>
    ),
    l8: (
      <div className="relative w-full h-full p-3">
        <div className="absolute inset-3 bg-white/5 rounded-lg" />
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 bg-white/15 rounded-full h-24 backdrop-blur border border-white/10" />
      </div>
    ),
    l9: (
      <div className="flex flex-col gap-2 w-full h-full p-4">
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl font-display font-bold text-white/20">A</motion.div>
        <div className="flex gap-2 flex-1">
          <div className="flex-1 bg-white/5 rounded" />
          <div className="flex-1 bg-white/5 rounded" />
        </div>
      </div>
    ),
    l10: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border border-white/10 absolute" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-14 h-14 rounded-full border border-white/15 absolute" />
        <div className="w-4 h-4 rounded-full bg-white/20" />
      </div>
    ),
  };
  return <>{previewStyles[layoutId] || null}</>;
}

export default function LayoutCard({ layout, index }: { layout: LayoutData; index: number }) {
  const Icon = icons[index % icons.length];
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onClick={() => setExpanded(true)}
        className="glass-panel p-6 rounded-2xl flex flex-col gap-4 group hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer"
        data-testid={`card-layout-${layout.id}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-300">
            <Icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-display font-semibold">{layout.name}</h3>
        </div>
        
        <p className="text-sm text-zinc-400 leading-relaxed font-light">{layout.description}</p>

        <div className="h-28 border border-dashed border-white/10 rounded-lg relative overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          <LayoutPreview layoutId={layout.id} />
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
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-white/10">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-xl font-display font-bold">{layout.name}</h2>
                </div>
                <button onClick={() => setExpanded(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" data-testid="button-close-layout" aria-label="Close layout detail">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <p className="text-zinc-300 leading-relaxed">{layout.description}</p>
                <div className="h-48 border border-white/10 rounded-2xl relative overflow-hidden bg-zinc-900">
                  <LayoutPreview layoutId={layout.id} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-lg font-bold text-white">Fluid</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Responsive</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-lg font-bold text-white">CSS Grid</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Technology</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-lg font-bold text-white">All</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Breakpoints</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
