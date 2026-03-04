import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Globe, BarChart3 } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { NewsletterForm } from '../newsletter/NewsletterForm'
import { useAnalytics } from '../../hooks/useAnalytics'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/donate', label: 'Donate' },
]

const socialLinks = [
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Github, label: 'GitHub' },
  { href: '#', icon: Globe, label: 'Website' },
]

export function Footer() {
  const { visitCount } = useAnalytics()

  return (
    <footer className="relative mt-auto overflow-hidden border-t-2 border-accent-500/10 bg-[#070b14]">
      {/* Gradient orbs */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-accent-500/10 blur-[100px]" />
      <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Logo size="lg" textClassName="text-2xl font-extrabold text-white hover:text-accent-400" />
              <p className="max-w-sm text-base leading-relaxed text-slate-400">
                Curating the best resources, projects and learning in the Web3 ecosystem.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ href, icon: Icon, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 text-slate-400 transition-all hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-400"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-400">
                Navigation
              </h4>
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="inline-block w-fit text-base font-medium text-slate-400 transition-colors hover:text-accent-400"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>

          <div id="newsletter" className="lg:col-span-4 scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 border-accent-500/20 bg-accent-500/5 p-6 backdrop-blur-sm"
            >
              <NewsletterForm />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t-2 border-white/5 pt-10 sm:flex-row"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <p className="font-mono text-sm text-slate-500">
              © {new Date().getFullYear()} Internet Is Beautiful
            </p>
            {visitCount != null && (
              <div className="flex items-center gap-2 rounded-xl border border-accent-500/20 bg-accent-500/5 px-4 py-2">
                <BarChart3 className="h-4 w-4 text-accent-400" />
                <span className="font-mono text-sm font-medium text-accent-400">
                  {visitCount.toLocaleString()} visitors
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-8">
            <Link
              to="/privacy"
              className="font-medium text-slate-500 transition-colors hover:text-accent-400"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="font-medium text-slate-500 transition-colors hover:text-accent-400"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
