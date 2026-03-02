# Aesthetic Lexicon

A design gallery application showcasing 10 distinct visual styles, 10 aesthetic UI layouts, 3 hybrid combinations, and 10 interactive themed components with audio feedback.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS v4 + Framer Motion + wouter routing
- **Backend**: Express.js with PostgreSQL via Drizzle ORM
- **Fonts**: Cinzel (display), Inter (body) via Google Fonts

## Key Features
- Visual style cards with color palettes extracted from paper-art imagery
- Layout showcase with abstract structural representations
- Hybrid previews combining complementary styles + layouts
- Interactive component showcase with Web Audio API sound effects
- Paywall system for premium layout code (session-based purchases stored in PostgreSQL)
- Copyable code blocks behind unlock mechanism

## Project Structure
- `client/src/pages/Home.tsx` - Main gallery with tabs (Components, Styles, Layouts, Hybrids)
- `client/src/pages/PreviewPage.tsx` - Immersive hybrid preview with paywall
- `client/src/components/InteractiveShowcase.tsx` - 10 themed interactive UI components
- `client/src/components/StyleCard.tsx` - Visual style display cards
- `client/src/components/LayoutCard.tsx` - Layout display cards
- `client/src/components/HybridCard.tsx` - Hybrid combination cards (clickable)
- `client/src/data/mockData.ts` - Style/layout/hybrid definitions with image imports
- `client/src/hooks/useSoundEffect.ts` - Web Audio API oscillator sounds
- `client/src/hooks/useSessionId.ts` - Persistent browser session ID
- `shared/schema.ts` - Drizzle schema (users, purchases tables)
- `server/routes.ts` - Purchase API endpoints
- `server/storage.ts` - Database storage implementation

## API Routes
- `POST /api/purchases` - Create a purchase (sessionId, layoutId)
- `GET /api/purchases/:sessionId` - Get all purchases for a session
- `GET /api/purchases/:sessionId/:layoutId` - Check if specific layout is purchased

## Database
PostgreSQL with tables: users, purchases
