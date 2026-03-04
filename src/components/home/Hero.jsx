import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { useCommandPalette } from '../../context/CommandPaletteContext'

export function Hero() {
  const { setOpen: openCommandPalette } = useCommandPalette()

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[2rem] border-2 border-accent-500/20 bg-[#0a0f1a] p-8 sm:p-12 lg:p-20"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-accent-500/20 blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-cyan-500/10 blur-[100px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/5 blur-[80px]"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/5 px-4 py-1.5 text-sm text-accent-400"
        >
          <Sparkles className="h-4 w-4" />
          <span>Curated for Web3 builders</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="block text-white">Curated for the</span>
          <span className="mt-2 block bg-gradient-to-r from-accent-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Builders.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          Internet Is Beautiful curates the best resources, projects and learning in the Web3 ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link to="/projects">
            <Button
              variant="primary"
              className="group gap-2 rounded-2xl bg-accent-500 px-8 py-4 text-base font-semibold shadow-glow hover:bg-accent-400 hover:shadow-glow-lg"
            >
              Explore All Projects
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => openCommandPalette(true)}
            className="rounded-2xl border-2 border-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-accent-500/50 hover:bg-accent-500/10"
          >
            <Search className="h-5 w-5" />
            Search Projects
          </Button>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-20 top-1/4 hidden h-3 w-3 rounded-full bg-accent-500/60 lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-1/4 hidden h-2 w-2 rounded-full bg-cyan-400/50 lg:block"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute left-1/4 top-1/3 hidden h-2 w-2 rounded-full bg-emerald-400/60 lg:block"
      />
    </motion.section>
  )
}
