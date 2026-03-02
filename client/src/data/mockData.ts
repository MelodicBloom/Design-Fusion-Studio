import imgVillage from "@assets/IMG_5776_1772466499443.jpeg";
import imgSunset from "@assets/IMG_5775_1772466499443.jpeg";
import imgLighthouse from "@assets/IMG_5772_1772466499443.jpeg";
import imgMoonMountains from "@assets/IMG_5736_1772466499443.jpeg";
import imgSpaceSun from "@assets/IMG_5755_1772466499443.jpeg";
import imgRiverForest from "@assets/IMG_5741_1772466499443.jpeg";
import imgBlueMountains from "@assets/IMG_5745_1772466499443.jpeg";
import imgNightSky from "@assets/IMG_5739_1772466499443.jpeg";
import imgAbalone from "@assets/IMG_4647_1772466499443.jpeg";
import imgButterfly from "@assets/IMG_4625_1772466499443.jpeg";

export const STYLES = [
  {
    id: "s1",
    name: "Mosaic Horizon",
    description: "Deep oceanic blues and olive greens, layered like paper quilling to create dimensional depth.",
    image: imgVillage,
    colors: { primary: "#2c4656", secondary: "#5b7661", accent: "#cbb17b" },
    traits: ["Dimensional Shadowing", "Intricate Borders", "Earthy Tones"]
  },
  {
    id: "s2",
    name: "Amber Tides",
    description: "Warm sunsets merging with cool waves. High contrast curves and sweeping motion in UI elements.",
    image: imgSunset,
    colors: { primary: "#d26939", secondary: "#f5c378", accent: "#1e5b72" },
    traits: ["Fluid Backgrounds", "Warm Gradients", "Wavy Dividers"]
  },
  {
    id: "s3",
    name: "Crimson Beacon",
    description: "Striking magenta and red hues contrasted by teal waters. Dramatic, focal-point driven design.",
    image: imgLighthouse,
    colors: { primary: "#9f2b45", secondary: "#d07386", accent: "#4c95a0" },
    traits: ["High Contrast", "Bold Typography", "Vibrant Accents"]
  },
  {
    id: "s4",
    name: "Amethyst Peaks",
    description: "Mystical purples and neon pinks. A dreamlike state using glowing auras and dark mode dominance.",
    image: imgMoonMountains,
    colors: { primary: "#511776", secondary: "#9e259c", accent: "#fbb65c" },
    traits: ["Neon Glows", "Dark Canvas", "Ethereal Shadows"]
  },
  {
    id: "s5",
    name: "Cosmic Swirl",
    description: "Deep space indigos and starlight golds. UI that feels vast, expansive, and infinitely scrolling.",
    image: imgSpaceSun,
    colors: { primary: "#1c2e68", secondary: "#49569e", accent: "#d57a31" },
    traits: ["Starlight Sparkles", "Deep Gradients", "Floating Elements"]
  },
  {
    id: "s6",
    name: "Textured Canopy",
    description: "Richly detailed, tactile surfaces. UI elements have visible grain, noise, and embossed textures.",
    image: imgRiverForest,
    colors: { primary: "#2e2d4d", secondary: "#596f6e", accent: "#d67a4d" },
    traits: ["Grain Overlays", "Embossed Buttons", "Organic Shapes"]
  },
  {
    id: "s7",
    name: "Azure Voyage",
    description: "Serene, monumental blues with sharp, crimson interruptions. Minimalist with stark focal points.",
    image: imgBlueMountains,
    colors: { primary: "#336181", secondary: "#6a9db3", accent: "#d62020" },
    traits: ["Monochromatic Base", "Stark Accents", "Vast Whitespace"]
  },
  {
    id: "s8",
    name: "Midnight Grove",
    description: "Enchanting night scenes with luminous details. High use of backlight effects on components.",
    image: imgNightSky,
    colors: { primary: "#0b1c2b", secondary: "#2c4f52", accent: "#f3c66f" },
    traits: ["Backlit Cards", "Silhouetted Icons", "Mystical Vibe"]
  },
  {
    id: "s9",
    name: "Iridescent Pearl",
    description: "Shifting, pearlescent colors. UI uses glassmorphism and subtle holographic gradients.",
    image: imgAbalone,
    colors: { primary: "#5fbfb5", secondary: "#c18ab9", accent: "#303957" },
    traits: ["Glassmorphism", "Holographic Gradients", "Fluid Animations"]
  },
  {
    id: "s10",
    name: "Monarch Macro",
    description: "Micro-detailed patterns. Intense orange, black, and white. Geometric and highly structured.",
    image: imgButterfly,
    colors: { primary: "#f28e1c", secondary: "#181a1c", accent: "#f0ece1" },
    traits: ["Geometric Patterns", "High Contrast Borders", "Macro Details"]
  }
];

export const LAYOUTS = [
  { id: "l1", name: "Bento Box", description: "A grid-based layout where content is neatly organized into varied-size compartments, like a digital bento." },
  { id: "l2", name: "Asymmetrical Split", description: "A 60/40 or 70/30 split screen where one side is heavily visual and the other strictly typographic." },
  { id: "l3", name: "Immersive Canvas", description: "Full-bleed imagery underneath floating, translucent UI components." },
  { id: "l4", name: "Diagonal Flow", description: "Content blocks are offset diagonally, guiding the eye in a zigzag pattern down the page." },
  { id: "l5", name: "Layered Deck", description: "Cards heavily overlap each other, creating a sense of physical depth and z-axis space." },
  { id: "l6", name: "Horizontal Reel", description: "A layout designed primarily for horizontal scrolling, treating the screen like a film strip." },
  { id: "l7", name: "Masonry Mosaic", description: "Fluidly interlocking columns of different heights, perfect for highly visual galleries." },
  { id: "l8", name: "Floating Sidebar", description: "Navigation and context exist in detached, pill-shaped sidebars hovering over the content." },
  { id: "l9", name: "Editorial Print", description: "Mimics high-end magazines with huge drop caps, wide margins, and multi-column text." },
  { id: "l10", name: "Radial Focus", description: "UI elements are arranged in a circular or radial pattern around a central focal point." }
];

export const HYBRIDS = [
  {
    id: "h1",
    name: "Iridescent Bento",
    styles: [STYLES[8], STYLES[4]], // Abalone + Space
    layouts: [LAYOUTS[0], LAYOUTS[2]], // Bento + Immersive
    description: "A glassmorphic bento grid floating over a deep, iridescent cosmic background.",
    previewImg: STYLES[8].image,
    secondaryImg: STYLES[4].image
  },
  {
    id: "h2",
    name: "Crimson Editorial",
    styles: [STYLES[2], STYLES[6]], // Lighthouse + Blue Mountains
    layouts: [LAYOUTS[8], LAYOUTS[1]], // Editorial + Asymmetrical
    description: "High-contrast editorial typography paired with stark asymmetrical splits of vivid red and serene blue.",
    previewImg: STYLES[2].image,
    secondaryImg: STYLES[6].image
  },
  {
    id: "h3",
    name: "Midnight Flow",
    styles: [STYLES[7], STYLES[5]], // Night Sky + Textured Canopy
    layouts: [LAYOUTS[3], LAYOUTS[4]], // Diagonal Flow + Layered Deck
    description: "Overlapping, textured cards cascading diagonally down the page in a glowing, dark-mode forest theme.",
    previewImg: STYLES[7].image,
    secondaryImg: STYLES[5].image
  }
];
