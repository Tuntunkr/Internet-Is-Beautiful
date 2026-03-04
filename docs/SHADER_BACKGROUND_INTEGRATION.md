# ShaderBackground Integration

## Project Setup Status

| Requirement | Status | Notes |
|-------------|--------|-------|
| **shadcn** | ❌ Not used | Project uses custom components + Tailwind |
| **Tailwind CSS** | ✅ Installed | `tailwindcss ^3.3.3` |
| **TypeScript** | ❌ Not used | Project uses JavaScript (.jsx) |
| **components/ui** | ✅ Exists | `src/components/ui/` |

---

## Setup Instructions (if needed)

### shadcn

This project does **not** use shadcn/ui. To add it:

```bash
npx shadcn-ui@latest init
```

**Why `components/ui` matters:** shadcn expects components in `components/ui`. This folder holds reusable, low-level UI primitives (Button, Card, etc.). Keeping this structure makes it easy to add shadcn components later without refactoring.

### Tailwind CSS

Already configured. If starting fresh:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### TypeScript

To migrate to TypeScript:

```bash
npm install -D typescript @types/react @types/react-dom
npx tsc --init
```

Rename `.jsx` → `.tsx` and add type annotations.

---

## ShaderBackground Component

**Location:** `src/components/ui/shader-background.jsx`

### Dependencies

- **React** (useRef, useEffect)
- **WebGL** (browser API – no npm package)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `'fixed inset-0 -z-10 w-full h-full'` | Tailwind classes for positioning |

### Usage

**Full-page background:**
```jsx
<ShaderBackground />
```

**Inside a container (e.g. Hero):**
```jsx
<div className="absolute inset-0">
  <ShaderBackground className="absolute inset-0 h-full w-full" />
  <div className="absolute inset-0 bg-[#0a0f1a]/70" aria-hidden />
</div>
```

### Responsive Behavior

- Uses `ResizeObserver` to match parent size
- Falls back to `window.innerWidth` / `window.innerHeight` when no parent

### Where It's Used

- **Hero:** `src/components/home/Hero.jsx` – as the background layer with a dark overlay

### Demos

See `src/components/ui/shader-background-demo.jsx` for `DemoFullPage` and `DemoHeroBackground`.
