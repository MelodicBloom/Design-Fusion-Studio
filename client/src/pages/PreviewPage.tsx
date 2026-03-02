import { useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, ChevronLeft, Copy } from "lucide-react";
import { HYBRIDS } from "@/data/mockData";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function PreviewPage() {
  const [, params] = useRoute("/preview/:id");
  const id = params?.id;
  const { toast } = useToast();
  
  const hybrid = HYBRIDS.find(h => h.id === id);
  const [unlocked, setUnlocked] = useState(false);

  if (!hybrid) {
    return <div className="p-12 text-center text-white">Preview not found.</div>;
  }

  const mockCode = `
import { motion } from "framer-motion";

export default function ${hybrid.name.replace(/\s+/g, '')}Layout() {
  return (
    <div className="relative min-h-screen bg-[${hybrid.styles[0].colors.primary}]">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img src="${hybrid.previewImg}" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
      </div>
      
      {/* Interactive UI Layer */}
      <main className="relative z-10 p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-3xl col-span-2"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            ${hybrid.name}
          </h1>
          <p className="text-xl text-white/80">
            ${hybrid.description}
          </p>
        </motion.div>
        
        {/* Additional Layout Elements */}
        <aside className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
          <div className="h-32 rounded-xl bg-white/10" />
          <div className="h-32 rounded-xl bg-white/10" />
        </aside>
      </main>
    </div>
  );
}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCode);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste this into your project.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="noise-overlay z-50"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/">
          <a className="flex items-center gap-2 text-white/70 hover:text-white transition-colors glass-panel px-4 py-2 rounded-full text-sm font-medium">
            <ChevronLeft size={16} />
            Back to Gallery
          </a>
        </Link>
      </nav>

      {/* Immersive Preview Area */}
      <section className="relative h-screen flex flex-col justify-end p-8 md:p-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={hybrid.previewImg} 
            alt={hybrid.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
          
          {/* Abstract layout overlay representation */}
          <div className="absolute inset-0 p-24 hidden md:grid grid-cols-3 gap-8 opacity-40 mix-blend-overlay">
            <div className="col-span-2 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm" />
            <div className="col-span-1 flex flex-col gap-8">
              <div className="flex-1 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm" />
              <div className="flex-1 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm" />
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-white border border-white/20">
              Interactive Preview
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl">
            {hybrid.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
            {hybrid.description}
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center max-w-fit animate-bounce text-white/50"
          >
            <span className="text-sm tracking-widest uppercase mb-2">Scroll for Code</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Code & Paywall Section */}
      <section className="relative z-20 bg-background min-h-screen p-8 md:p-24 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-display font-bold mb-4">Implementation</h2>
            <p className="text-muted-foreground text-lg font-light">
              Get the production-ready React component code for this layout.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-zinc-950/80 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500 font-mono tracking-wider">{hybrid.name.replace(/\s+/g, '')}Layout.tsx</span>
              {unlocked ? (
                <button onClick={handleCopy} className="text-zinc-400 hover:text-white transition-colors" title="Copy code">
                  <Copy size={16} />
                </button>
              ) : (
                <div className="w-4 h-4" /> // spacing
              )}
            </div>

            {/* Code Content */}
            <div className="relative">
              <pre className={`p-6 text-sm font-mono text-zinc-300 overflow-x-auto ${!unlocked ? 'filter blur-[4px] opacity-50 select-none' : ''}`}>
                <code>{mockCode}</code>
              </pre>

              {/* Paywall Overlay */}
              {!unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] mb-6">
                    <Lock className="w-8 h-8 text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Unlock Pro Layouts</h3>
                  <p className="text-zinc-400 mb-8 max-w-md font-light leading-relaxed">
                    Get access to this aesthetic component and 50+ other premium layouts, animations, and textures.
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <button 
                      onClick={() => setUnlocked(true)}
                      className="w-full py-4 rounded-xl bg-white text-black font-semibold tracking-wide hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      Unlock for $19
                    </button>
                    <button className="w-full py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-colors text-sm">
                      I already have a Pro account
                    </button>
                  </div>
                  
                  <ul className="mt-8 text-left flex flex-col gap-2 text-sm text-zinc-500">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500/70" /> Production-ready React & Tailwind code</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500/70" /> Framer Motion animations included</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500/70" /> Lifetime updates</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}