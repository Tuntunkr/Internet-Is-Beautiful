import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { mockWebsites } from '../../data/mockWebsites'
import { Button } from '../ui/Button'

export function FeaturedHighlight() {
  const featured = mockWebsites.find((w) => w.featured) || mockWebsites[0]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[1.5rem] border-2 border-accent-500/20 bg-gradient-to-br from-[#0a0f1a] via-[#0a0f1a] to-accent-900/30"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="relative h-56 lg:h-auto lg:min-h-[320px] lg:w-[55%]">
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Star className="h-3.5 w-3.5 fill-current" />
              Weekly Featured
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center p-8 lg:p-12">
          <h2 className="font-display text-3xl font-extrabold text-white lg:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            {featured.description}
          </p>
          <Link to={`/website/${featured.id}`} className="mt-8">
            <Button
              variant="primary"
              className="group gap-2 rounded-2xl bg-accent-500 px-8 py-4 font-semibold shadow-glow hover:bg-accent-400 hover:shadow-glow-lg"
            >
              View Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
