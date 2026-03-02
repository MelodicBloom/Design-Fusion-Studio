import { motion } from "framer-motion";

interface StyleData {
  id: string;
  name: string;
  description: string;
  image: string;
  colors: { primary: string; secondary: string; accent: string };
  traits: string[];
}

export default function StyleCard({ styleData, index }: { styleData: StyleData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col h-[420px] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
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
  );
}
