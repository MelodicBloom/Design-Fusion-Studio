# 🎨 Design Fusion Studio

> *A fullstack design platform for generating, previewing, and exporting multi-system UI components.*

Design Fusion Studio is a React + TypeScript fullstack application built on a Vite + Express + Drizzle ORM stack. Originally prototyped in Replit, this project serves as a component generation and design system fusion workspace — allowing multiple design languages to coexist, preview, and export together.

## Architecture

```
Design-Fusion-Studio/
├── client/          ← React frontend (Vite, Tailwind, shadcn/ui)
├── server/          ← Express API server
├── shared/          ← Shared types and schemas (Drizzle ORM)
├── script/          ← Utility and generation scripts
└── attached_assets/ ← Design asset references
```

## Stack

`React` · `TypeScript` · `Vite` · `Express` · `Drizzle ORM` · `Tailwind CSS` · `shadcn/ui` · `PostCSS`

## Status

Prototype-stage — migrated from Replit. Intended for further development as a standalone design tool.

## Notes

This repo was originally developed in Replit (see `replit.md` for environment setup). To run locally:

```bash
npm install
npm run dev
```

---

*Part of the qt314wink creative technologist portfolio — Philadelphia, 2026.*
