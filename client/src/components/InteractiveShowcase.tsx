import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { STYLES } from "@/data/mockData";
import {
  Sparkles, ArrowRight, Focus, Hexagon, Fingerprint, Layers, Wind, Droplets,
  Plus, Minus, Check, Heart, Star, Send, Bell, Settings, Bookmark, Share2,
  ChevronRight, Volume2, VolumeX, Moon, Sun, Zap, Eye, EyeOff,
  ToggleLeft, ToggleRight, Trash2, RefreshCw, Download, Search, X
} from "lucide-react";

export default function InteractiveShowcase() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MosaicDemo />
        <AmberTidesDemo />
        <CrimsonBeaconDemo />
        <AmethystPeaksDemo />
        <CosmicSwirlDemo />
        <TexturedCanopyDemo />
        <AzureVoyageDemo />
        <MidnightGroveDemo />
        <IridescentPearlDemo />
        <MonarchMacroDemo />
      </div>
    </div>
  );
}

function MosaicDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[0];
  const [layers, setLayers] = useState([
    { id: 1, label: "Background", visible: true, locked: false },
    { id: 2, label: "Typography", visible: true, locked: false },
    { id: 3, label: "Illustration", visible: true, locked: true },
    { id: 4, label: "Overlay", visible: false, locked: false },
  ]);
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [opacity, setOpacity] = useState(80);

  const toggleVisibility = (id: number) => {
    playSound("click");
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Layer Manager" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-3 w-full px-4">
        {layers.map((layer) => (
          <motion.div
            key={layer.id}
            layout
            onClick={() => { setSelectedLayer(layer.id); playSound("hover"); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
            style={{
              backgroundColor: selectedLayer === layer.id ? `${theme.colors.primary}30` : 'transparent',
              border: `1px solid ${selectedLayer === layer.id ? theme.colors.accent : 'rgba(255,255,255,0.05)'}`,
              boxShadow: selectedLayer === layer.id
                ? `0 4px 0 ${theme.colors.secondary}, inset 0 2px 0 rgba(255,255,255,0.1)`
                : 'none'
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ backgroundColor: layer.visible ? theme.colors.primary : 'rgba(255,255,255,0.05)' }}
              data-testid={`button-toggle-layer-${layer.id}`}
              aria-label={`Toggle ${layer.label} visibility`}
            >
              {layer.visible ? <Eye size={14} className="text-white" /> : <EyeOff size={14} className="text-zinc-500" />}
            </button>
            <span className={`text-sm font-medium flex-1 ${layer.visible ? 'text-white' : 'text-zinc-500 line-through'}`}>
              {layer.label}
            </span>
            {layer.locked && <Layers size={12} className="text-zinc-500" />}
          </motion.div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Opacity</span>
          <input
            type="range" min="0" max="100" value={opacity}
            onChange={(e) => { setOpacity(Number(e.target.value)); playSound("hover"); }}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: theme.colors.accent }}
            data-testid="slider-opacity"
          />
          <span className="text-xs text-zinc-400 w-8 text-right">{opacity}%</span>
        </div>
      </div>
    </ShowcaseWrapper>
  );
}

function AmberTidesDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[1];
  const [items, setItems] = useState([
    { id: 1, text: "Sunrise meditation", done: false },
    { id: 2, text: "Beach photography", done: true },
    { id: 3, text: "Surf lesson", done: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    playSound("click");
    setItems(prev => [...prev, { id: Date.now(), text: newItem, done: false }]);
    setNewItem("");
  };

  const toggleItem = (id: number) => {
    playSound("hover");
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const removeItem = (id: number) => {
    playSound("click");
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Flowing Tasks" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-3 w-full px-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            className="flex-1 px-4 py-2 rounded-full text-sm bg-black/30 border text-white placeholder-zinc-500 focus:outline-none"
            style={{ borderColor: `${theme.colors.primary}50` }}
            data-testid="input-new-task"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addItem}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
            data-testid="button-add-task"
          >
            <Plus size={18} />
          </motion.button>
        </div>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl group"
              style={{
                background: item.done
                  ? `linear-gradient(135deg, ${theme.colors.accent}15, transparent)`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${item.done ? `${theme.colors.accent}40` : 'rgba(255,255,255,0.05)'}`
              }}
            >
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleItem(item.id)}
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  borderColor: item.done ? theme.colors.primary : theme.colors.secondary,
                  backgroundColor: item.done ? theme.colors.primary : 'transparent'
                }}
                data-testid={`button-toggle-task-${item.id}`}
              >
                {item.done && <Check size={12} className="text-white" />}
              </motion.button>
              <span className={`text-sm flex-1 transition-all ${item.done ? 'line-through text-zinc-500' : 'text-white'}`}>
                {item.text}
              </span>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                data-testid={`button-remove-task-${item.id}`}
              >
                <X size={14} className="text-zinc-500 hover:text-red-400" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ShowcaseWrapper>
  );
}

function CrimsonBeaconDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[2];
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Alert", message: "Critical update available", type: "danger" as const },
    { id: 2, title: "New Message", message: "You have 3 unread messages", type: "info" as const },
  ]);
  const [showToast, setShowToast] = useState(false);

  const addNotification = () => {
    playSound("click");
    const types = ["danger", "info", "success"] as const;
    const messages = ["Port scan detected", "Backup completed", "New follower joined"];
    const idx = Math.floor(Math.random() * 3);
    setNotifications(prev => [
      { id: Date.now(), title: `Alert #${prev.length + 1}`, message: messages[idx], type: types[idx] },
      ...prev,
    ]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const dismissNotification = (id: number) => {
    playSound("hover");
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const typeColor = (type: string) => {
    if (type === "danger") return theme.colors.primary;
    if (type === "success") return theme.colors.accent;
    return theme.colors.secondary;
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Alert System" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-3 w-full px-4 relative">
        <motion.button
          whileHover={{ x: 4, boxShadow: `-4px 4px 0px ${theme.colors.accent}` }}
          whileTap={{ scale: 0.97 }}
          onClick={addNotification}
          className="px-6 py-3 font-display font-black text-sm uppercase tracking-widest border-2 flex items-center gap-2 self-start"
          style={{ borderColor: theme.colors.primary, color: theme.colors.primary, boxShadow: `-2px 2px 0px ${theme.colors.accent}` }}
          data-testid="button-trigger-alert"
        >
          <Bell size={16} /> Trigger Alert
        </motion.button>

        <AnimatePresence>
          {notifications.slice(0, 3).map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex items-start gap-3 px-4 py-3 border-l-4"
              style={{ borderLeftColor: typeColor(n.type), background: `${typeColor(n.type)}10` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase tracking-wider" style={{ color: typeColor(n.type) }}>{n.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">{n.message}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} data-testid={`button-dismiss-${n.id}`}>
                <X size={14} className="text-zinc-500 hover:text-white" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Alert Fired
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ShowcaseWrapper>
  );
}

function AmethystPeaksDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[3];
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [volume, setVolume] = useState(65);

  const toggleLike = () => {
    playSound("click");
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Social Actions" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-5 w-full px-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={toggleLike}
              className="flex items-center gap-2 group"
              data-testid="button-like"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <motion.div
                animate={liked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
                style={{
                  borderColor: liked ? theme.colors.secondary : 'rgba(255,255,255,0.1)',
                  backgroundColor: liked ? `${theme.colors.secondary}20` : 'transparent',
                  boxShadow: liked ? `0 0 20px ${theme.colors.secondary}40` : 'none'
                }}
              >
                <Heart size={18} fill={liked ? theme.colors.secondary : "none"} style={{ color: liked ? theme.colors.secondary : '#71717a' }} />
              </motion.div>
              <span className="text-sm text-zinc-400">{likes}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => { setSaved(!saved); playSound("hover"); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
              style={{
                borderColor: saved ? theme.colors.accent : 'rgba(255,255,255,0.1)',
                backgroundColor: saved ? `${theme.colors.accent}20` : 'transparent',
                boxShadow: saved ? `0 0 20px ${theme.colors.accent}40` : 'none'
              }}
              data-testid="button-save"
              aria-label={saved ? "Unsave" : "Save"}
            >
              <Bookmark size={18} fill={saved ? theme.colors.accent : "none"} style={{ color: saved ? theme.colors.accent : '#71717a' }} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => { setShared(!shared); playSound("active"); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
              style={{
                borderColor: shared ? theme.colors.primary : 'rgba(255,255,255,0.1)',
                backgroundColor: shared ? `${theme.colors.primary}20` : 'transparent',
                boxShadow: shared ? `0 0 20px ${theme.colors.primary}40` : 'none'
              }}
              data-testid="button-share"
              aria-label={shared ? "Unshare" : "Share"}
            >
              <Share2 size={18} style={{ color: shared ? theme.colors.primary : '#71717a' }} />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 size={14} className="text-zinc-500" />
          <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden relative cursor-pointer"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const val = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                 setVolume(val);
                 playSound("hover");
               }}
               data-testid="slider-volume"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`, width: `${volume}%` }}
              layout
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ left: `calc(${volume}% - 8px)`, background: theme.colors.secondary, boxShadow: `0 0 10px ${theme.colors.secondary}` }}
            />
          </div>
          <span className="text-xs text-zinc-400 w-8 text-right">{volume}</span>
        </div>
      </div>
    </ShowcaseWrapper>
  );
}

function CosmicSwirlDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[4];
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    playSound("active");
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setRating(0); setMessage(""); }, 3000);
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Rating & Feedback" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-4 w-full px-4">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`, boxShadow: `0 0 30px ${theme.colors.accent}60` }}
              >
                <Check size={28} className="text-white" />
              </motion.div>
              <p className="text-sm text-white font-medium">Feedback sent to the cosmos</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onMouseEnter={() => { setHoverRating(star); playSound("hover"); }}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => { setRating(star); playSound("click"); }}
                    whileHover={{ scale: 1.3, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    data-testid={`button-star-${star}`}
                  >
                    <Star
                      size={28}
                      fill={(hoverRating || rating) >= star ? theme.colors.accent : "none"}
                      style={{
                        color: (hoverRating || rating) >= star ? theme.colors.accent : '#3f3f46',
                        filter: (hoverRating || rating) >= star ? `drop-shadow(0 0 6px ${theme.colors.accent})` : 'none'
                      }}
                    />
                  </motion.button>
                ))}
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-black/30 border text-white placeholder-zinc-600 resize-none focus:outline-none h-16"
                style={{ borderColor: `${theme.colors.primary}40` }}
                data-testid="input-feedback"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  background: rating > 0 ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` : 'rgba(255,255,255,0.05)',
                  opacity: rating > 0 ? 1 : 0.5,
                  boxShadow: rating > 0 ? `0 0 20px ${theme.colors.primary}40` : 'none'
                }}
                data-testid="button-submit-feedback"
              >
                <Send size={16} /> Submit
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ShowcaseWrapper>
  );
}

function TexturedCanopyDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[5];
  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState(false);

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Product Card" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="relative rounded-2xl overflow-hidden h-24" style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}>
          <div className="absolute inset-0 noise-overlay opacity-30" />
          <div className="relative z-10 p-4 flex justify-between items-end h-full">
            <div>
              <p className="text-amber-100/70 text-[10px] uppercase tracking-widest">Handcrafted</p>
              <p className="text-amber-50 font-display text-lg font-bold">Artisan Texture Pack</p>
            </div>
            <p className="text-2xl font-bold text-amber-100" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>$24</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl overflow-hidden border border-white/10">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => { setCount(Math.max(1, count - 1)); playSound("hover"); }}
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              data-testid="button-decrease"
            >
              <Minus size={16} />
            </motion.button>
            <span className="w-10 text-center text-white font-mono text-sm">{count}</span>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => { setCount(count + 1); playSound("hover"); }}
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              data-testid="button-increase"
            >
              <Plus size={16} />
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95, boxShadow: "inset 3px 3px 8px rgba(0,0,0,0.5)" }}
            onClick={() => { setInCart(!inCart); playSound("click"); }}
            className="flex-1 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all overflow-hidden relative"
            style={{
              background: inCart ? theme.colors.accent : theme.colors.secondary,
              color: inCart ? 'white' : '#fef3c7',
              boxShadow: `3px 3px 8px rgba(0,0,0,0.4), -1px -1px 4px rgba(255,255,255,0.08)`
            }}
            data-testid="button-add-to-cart"
          >
            <div className="absolute inset-0 noise-overlay opacity-15" />
            <span className="relative z-10 flex items-center gap-2">
              {inCart ? <><Check size={16} /> In Cart ({count})</> : <><Plus size={16} /> Add to Cart</>}
            </span>
          </motion.button>
        </div>
      </div>
    </ShowcaseWrapper>
  );
}

function AzureVoyageDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[6];
  const [active, setActive] = useState("overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const tabs = ["overview", "specs", "reviews"];

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Minimal Navigation" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => { setActive(tab); playSound("hover"); }}
                className="px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all relative"
                style={{ color: active === tab ? theme.colors.primary : '#71717a' }}
                data-testid={`tab-${tab}`}
              >
                {tab}
                {active === tab && (
                  <motion.div
                    layoutId="azure-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSearchOpen(!searchOpen); playSound("click"); }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: searchOpen ? theme.colors.primary : 'rgba(255,255,255,0.05)' }}
            data-testid="button-search-toggle"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={14} className="text-white" /> : <Search size={14} className="text-zinc-400" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.input
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 40 }}
              exit={{ opacity: 0, height: 0 }}
              type="text"
              placeholder="Search..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 rounded-lg text-sm bg-transparent border-b text-white placeholder-zinc-600 focus:outline-none"
              style={{ borderColor: theme.colors.primary }}
              data-testid="input-search"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
          >
            {active === "overview" && <p className="text-sm text-zinc-400">Clean, functional interfaces with purposeful negative space.</p>}
            {active === "specs" && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs"><span className="text-zinc-500">Grid</span><span className="text-white">12-column</span></div>
                <div className="flex justify-between text-xs"><span className="text-zinc-500">Spacing</span><span className="text-white">8px base</span></div>
                <div className="flex justify-between text-xs"><span className="text-zinc-500">Breakpoints</span><span className="text-white">4 tiers</span></div>
              </div>
            )}
            {active === "reviews" && (
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= 4 ? theme.colors.accent : "none"} style={{ color: s <= 4 ? theme.colors.accent : '#3f3f46' }} />)}
                <span className="text-xs text-zinc-400 ml-2">4.0 (128 reviews)</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </ShowcaseWrapper>
  );
}

function MidnightGroveDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[7];
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const SettingRow = ({ label, value, onChange, icon: Icon }: { label: string; value: boolean; onChange: () => void; icon: any }) => (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer group"
      style={{ background: value ? `${theme.colors.accent}08` : 'transparent' }}
      onClick={() => { onChange(); playSound("click"); }}
      role="switch"
      aria-checked={value}
      aria-label={label}
      data-testid={`toggle-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
             style={{ backgroundColor: value ? `${theme.colors.accent}20` : 'rgba(255,255,255,0.03)' }}>
          <Icon size={16} className="transition-colors duration-500"
                style={{ color: value ? theme.colors.accent : '#52525b' }} />
        </div>
        <span className="text-sm text-zinc-300">{label}</span>
      </div>
      <motion.div
        className="w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors"
        style={{ backgroundColor: value ? theme.colors.accent : '#27272a' }}
        animate={{ backgroundColor: value ? theme.colors.accent : '#27272a' }}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ x: value ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Settings Panel" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-2 w-full px-4">
        <SettingRow label="Dark Mode" value={darkMode} onChange={() => setDarkMode(!darkMode)} icon={darkMode ? Moon : Sun} />
        <SettingRow label="Notifications" value={notifications} onChange={() => setNotifications(!notifications)} icon={Bell} />
        <SettingRow label="Auto-Save" value={autoSave} onChange={() => setAutoSave(!autoSave)} icon={RefreshCw} />
      </div>
    </ShowcaseWrapper>
  );
}

function IridescentPearlDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[8];
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { id: "free", label: "Free", price: "$0", features: ["3 templates", "Basic export"] },
    { id: "pro", label: "Pro", price: "$19", features: ["All templates", "HD export", "Priority support"] },
    { id: "team", label: "Team", price: "$49", features: ["Everything in Pro", "Collaboration", "Custom branding"] },
  ];

  return (
    <ShowcaseWrapper title={theme.name} subtitle="Pricing Selector" colors={theme.colors} image={theme.image}>
      <div className="flex gap-3 w-full px-4">
        {options.map((opt) => (
          <motion.div
            key={opt.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setSelected(opt.id); playSound("click"); }}
            className="flex-1 p-4 rounded-2xl cursor-pointer transition-all relative overflow-hidden"
            style={{
              border: `2px solid ${selected === opt.id ? theme.colors.primary : 'rgba(255,255,255,0.05)'}`,
              background: selected === opt.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              boxShadow: selected === opt.id ? `0 0 30px ${theme.colors.primary}20` : 'none'
            }}
            data-testid={`card-plan-${opt.id}`}
          >
            {selected === opt.id && (
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.primary})`,
                  backgroundSize: "300% 300%",
                  animation: "gradient-shift 4s ease infinite"
                }}
              />
            )}
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">{opt.label}</p>
              <p className="text-xl font-bold text-white mt-1">{opt.price}</p>
              <div className="mt-3 flex flex-col gap-1">
                {opt.features.map((f, i) => (
                  <p key={i} className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Check size={10} style={{ color: theme.colors.primary }} /> {f}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </ShowcaseWrapper>
  );
}

function MonarchMacroDemo() {
  const playSound = useSoundEffect();
  const theme = STYLES[9];
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const simulateUpload = () => {
    if (uploading) return;
    playSound("click");
    setUploading(true);
    setProgress(0);
    const name = `asset_${Date.now().toString(36)}.png`;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setFiles(f => [name, ...f]);
          playSound("active");
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  return (
    <ShowcaseWrapper title={theme.name} subtitle="File Uploader" colors={theme.colors} image={theme.image}>
      <div className="flex flex-col gap-4 w-full px-4">
        <motion.button
          whileHover={{ borderRadius: "4px" }}
          whileTap={{ scale: 0.97 }}
          onClick={simulateUpload}
          disabled={uploading}
          className="px-6 py-3 rounded-xl font-mono font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-2 disabled:opacity-50"
          style={{
            backgroundColor: uploading ? 'transparent' : theme.colors.primary,
            color: uploading ? theme.colors.primary : theme.colors.secondary,
            borderColor: theme.colors.primary,
          }}
          data-testid="button-upload"
        >
          {uploading ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
          {uploading ? `${progress}%` : 'Upload File'}
        </motion.button>

        {uploading && (
          <div className="h-2 rounded-full overflow-hidden bg-zinc-800">
            <motion.div
              className="h-full"
              style={{ backgroundColor: theme.colors.primary, width: `${progress}%` }}
              layout
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.slice(0, 3).map((file, i) => (
              <motion.div
                key={file}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(${theme.colors.secondary}10 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.secondary}10 1px, transparent 1px)`,
                  backgroundSize: '8px 8px',
                  border: `1px solid ${theme.colors.primary}30`
                }}
              >
                <Hexagon size={14} fill={theme.colors.primary} style={{ color: theme.colors.primary }} />
                <span className="text-xs font-mono text-zinc-300 flex-1">{file}</span>
                <Check size={14} className="text-green-400" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ShowcaseWrapper>
  );
}

function ShowcaseWrapper({ title, subtitle, colors, image, children }: {
  title: string;
  subtitle: string;
  colors: { primary: string; secondary: string; accent: string };
  image: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors bg-zinc-950/80"
    >
      <div className="relative h-28 overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/95" />
        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-display font-semibold text-white">{title}</h3>
            <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: colors.accent }}>{subtitle}</p>
          </div>
          <div className="flex gap-1.5">
            {Object.values(colors).map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 py-5 flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
}
