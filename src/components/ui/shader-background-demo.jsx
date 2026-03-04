/**
 * Demo: ShaderBackground component
 * Usage examples for the WebGL shader background
 */

import { ShaderBackground } from './shader-background'

/** Full-page background (default) */
export function DemoFullPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white">Content over shader</h1>
      </div>
    </div>
  )
}

/** Hero section background */
export function DemoHeroBackground() {
  return (
    <section className="relative overflow-hidden rounded-2xl border-2 border-accent-500/20 bg-[#0a0f1a] p-12">
      <div className="absolute inset-0">
        <ShaderBackground className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[#0a0f1a]/70" aria-hidden />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white">Hero with Shader</h2>
        <p className="mt-2 text-slate-400">Animated plasma lines background</p>
      </div>
    </section>
  )
}
