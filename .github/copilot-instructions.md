# Vegan Bingo Copilot Instructions

## Project Overview
**Vegan Bingo** is a React-based interactive game that presents common arguments against veganism as "bingo squares." Users click squares to mark them off, accumulating points when completing bingo patterns. The app is deployed on a production Apache server.

## Architecture & Data Flow

### Core Components
- **Game.js**: Main game grid (5x5 squares, 16 sections total). Renders squares via `DataService.getSections()` and manages context consumption.
- **BingoContext.js**: Central state management using React Context. Manages game state (completed squares), cookie persistence, and event dispatch.
- **DataService.js**: Lazy-loads section modules dynamically. Maintains a static `#SECTIONS` array (order = display order) and cycles through 5 colors for visual theming.
- **Square.js**: Individual card component. Links to detail page and toggles image based on completion state (`_done` suffix).

### Sections System
- Each section (16 total) is a standalone ES6 module in `src/sections/` exporting: `heading`, `alternatives`, `summary`, `discussion`
- Sections are imported dynamically at runtime by `DataService.loadSection()` and bundled as separate chunks
- Add new arguments by creating `src/sections/newname.js` following the pattern in `src/sections/bacon.js`
- Order matters: `DataService.#SECTIONS` array controls grid position and color assignment

### State Management Pattern
**BingoContext provides:**
- `bingos` (object): `{sectionName: {id, time}}`
- `addBingo(id)`: Toggles square on, persists to cookies, dispatches custom event
- `hasBingo(id)`: Checks completion state
- `removeBingo(id)`, `resetBingos()`, `toggleBingo(id)`: Mutations
- `checkScore()`: Tracks scoring trigger state

**Persistence:** Uses `universal-cookie` with 2-year TTL, persisted to cookie `veganbingo.net`

## Development Workflows

### Build & Run
```bash
npm install      # Install dependencies
npm run dev      # Dev server (Vite)
npm run build    # Production build → `dist/` folder
npm test         # Run tests (Vitest)
```

### Update Bingo Content
Use the Google Docs sync script (runs manually):
```bash
./scripts/download-docs.sh src/sections
```
Updates section files from Google Docs source of truth. Useful for bulk content updates.

## Project Patterns & Conventions

### React & Routing
- **react-router-dom v7.5+**: Uses `createBrowserRouter` with nested layout in `Dashboard.js`
- **Outlet pattern**: Game page rendered as child of Dashboard; preserves layout during navigation
- **Lazy routes**: Legacy routes map to dynamic page imports (e.g., old `/aspirational` → page view)

### UI Framework
- **MUI Material-UI**: All UI components (AppBar, Card, Grid, Drawer, icons)
- **Emotion CSS-in-JS**: Styled components via `@emotion/react`, `@emotion/styled`
- **Framer Motion**: Animations in Dashboard (`AnimatePresence`, `motion` wrappers)
- **Custom CSS**: Stored in `src/styles/` for component-specific styling (Game.css, Square.css, etc.)

### Color & Theming
- Theme defined in `Dashboard.js` (`themeOptions`): purple primary (#8b3fb5), pink secondary (#f50057)
- 5-color cycle: `yellow`, `pink`, `blue`, `purple`, `green` applied via CSS class names on Square components
- Image assets follow naming: `public/images/{sectionName}.png` and `{sectionName}_done.png`

### Custom Events
- Section completion triggers `bingo:add` custom event dispatched via `document.dispatchEvent()`
- Used for score checking and analytics; available to external listeners

## Key Dependencies & Integration Points

| Package | Role | Notes |
|---------|------|-------|
| `react-router-dom` v7.5 | Client-side routing | Dynamic page imports, nested outlets |
| `@mui/material` | UI component library | Grid, Card, Drawer, AppBar, icons |
| `framer-motion` v12.7+ | Animation library | Entrance animations in Dashboard |
| `universal-cookie` v8 | Cookie persistence | 2-year TTL, encrypted via sameSite:strict |
| `moment` v2.29 | Date formatting | Minimal use; timestamp in `addBingo()` |

## Deployment & Build Output
- **Build output**: `dist/` folder with code splitting (main bundle + chunk files)
- **Apache config**: `scripts/conf/veganbingo.net.conf` - check for routing/rewrite rules affecting SPA
- **Robots/sitemap**: SEO files in `public/` and `dist/` (robots.txt, sitemap.xml)

## Common Workflows

### Add a New Bingo Section
1. Create `src/sections/newsection.js` with `heading, alternatives, summary, discussion` exports
2. Add `'newsection'` to `DataService.#SECTIONS` array at desired grid position
3. Create images: `public/images/newsection.png` and `public/images/newsection_done.png`
4. Run `npm run build` and deploy `dist/` folder

### Modify Game Grid Layout
- Grid size: Edit `Game.js` Grid container `size` prop or CSS in `src/styles/Game.css`
- Update color cycle: Extend `DataService.#COLOURS` array (must remain cyclic per sections count)

### Handle Scoring Logic
- Hook into `BingoContext.checkScore()` to detect completion
- Listen to custom event: `document.addEventListener('bingo:add', handler)`
- Score state in Context triggers re-renders in parent components

## Testing & Error Handling
- Error page component: `Error.js` (renders via errorElement in router config)
- No existing test suite visible; `npm test` uses Vitest defaults
- Development: Browser DevTools + console logging; check custom event dispatch

# Checklist Before Committing
- [ ] Followed project coding conventions (React patterns, MUI usage)
- [ ] Run tests and make sure they pass
- [ ] Updated documentation if necessary (this file or section files)
- [ ] Run eslint --fix
- [ ] Run eslint to ensure code quality, including fixing warnings