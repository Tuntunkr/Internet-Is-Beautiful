import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Zap, Loader2, Sparkles, Check, Globe, FileText, Eye } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { FloatingInput, FloatingTextarea, FloatingSelect } from '../components/ui/FloatingInput'
import { api } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useLocalSubmissions } from '../context/LocalSubmissionsContext'

const STEPS = [
  { id: 1, title: 'Basic Info', icon: Globe, fields: ['url', 'title', 'category', 'description'] },
  { id: 2, title: 'Details', icon: FileText, fields: ['tags', 'twitter', 'github', 'image'] },
  { id: 3, title: 'Review', icon: Eye, fields: [] },
]

const CATEGORIES = ['Tool', 'Wallet', 'Library', 'Infrastructure', 'EVM', 'Privacy', 'DeFi', 'NFT', 'Other']

export function Submit() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addSubmission } = useLocalSubmissions()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [form, setForm] = useState({
    url: '',
    title: '',
    category: '',
    description: '',
    tags: '',
    twitter: '',
    github: '',
    image: '',
    email: '',
  })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }
    try {
      const data = await api.submitWebsite(payload)
      setSuccess(data)
      setForm({ url: '', title: '', category: '', description: '', tags: '', twitter: '', github: '', image: '', email: '' })
      setStep(1)
    } catch (e) {
      const local = addSubmission({
        url: payload.url,
        title: payload.title,
        category: payload.category,
        description: payload.description,
        tags: payload.tags,
        twitter: payload.twitter,
        github: payload.github,
        image: payload.image,
        email: payload.email,
      })
      setSuccess({ trackingToken: local.id, isLocal: true })
      setForm({ url: '', title: '', category: '', description: '', tags: '', twitter: '', github: '', image: '', email: '' })
      setStep(1)
      toast('Saved locally. Will sync when server is back.', 'success')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    if (step === 1) return form.url && form.title && form.category && form.description && form.email
    if (step === 2) return true
    return true
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg"
      >
        <div className="relative overflow-hidden rounded-2xl border-2 border-accent-500/30 bg-[#0a0f1a] p-8 shadow-glow">
          <div className="absolute -top-1/2 -right-1/2 h-64 w-64 rounded-full bg-accent-500/20 blur-[80px]" />
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-500/50 bg-accent-500/10"
            >
              <Check className="h-8 w-8 text-accent-400" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-white">Submitted!</h2>
            <p className="mt-2 text-slate-400">
              {success.isLocal
                ? "Your project is saved locally and will appear as a new project. We'll sync when the server is back."
                : 'Check your email for confirmation. Track your submission status:'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {success.isLocal ? (
                <>
                  <Button variant="primary" className="shadow-glow" onClick={() => navigate('/')}>
                    View on Home
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  className="shadow-glow"
                  onClick={() => navigate(`/track/${success.trackingToken}`)}
                >
                  Track Status
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-4xl"
    >
      {/* Hero-style gradient mesh container */}
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-accent-500/20 bg-[#0a0f1a]">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-accent-500/15 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/5 blur-[80px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/5 px-4 py-1.5 text-sm text-accent-400"
            >
              <Sparkles className="h-4 w-4" />
              <span>Share your Web3 project</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl"
            >
              Submit a Project
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-2 text-slate-400"
            >
              We review all submissions. Fill in the details below.
            </motion.p>
          </div>

          {/* Step progress - vertical on desktop */}
          <div className="mb-8 flex gap-2 sm:gap-3">
            {STEPS.map((s) => {
              const Icon = s.icon
              const isActive = s.id === step
              const isDone = s.id < step
              return (
                <motion.button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex flex-1 items-center gap-2 rounded-xl border-2 px-4 py-3 text-left transition-all sm:gap-3 ${
                    isActive
                      ? 'border-accent-500/50 bg-accent-500/10 text-accent-400 shadow-glow'
                      : isDone
                        ? 'border-accent-500/30 bg-accent-500/5 text-accent-500/80 hover:border-accent-500/40'
                        : 'border-white/10 bg-white/5 text-slate-500 hover:border-white/20'
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-accent-500/20' : isDone ? 'bg-accent-500/10' : 'bg-white/5'}`}>
                    {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="hidden truncate font-medium sm:block">{s.title}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Form card with floating inputs */}
          <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <FloatingInput
                      id="url"
                      label="Project URL *"
                      type="url"
                      value={form.url}
                      onChange={(e) => update('url', e.target.value)}
                    />
                  </div>
                  <div>
                    <FloatingInput
                      id="title"
                      label="Project Name *"
                      type="text"
                      value={form.title}
                      onChange={(e) => update('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <FloatingSelect
                      id="category"
                      label="Category *"
                      value={form.category}
                      onChange={(e) => update('category', e.target.value)}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </FloatingSelect>
                  </div>
                  <div className="sm:col-span-2">
                    <FloatingTextarea
                      id="description"
                      label="Description *"
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      rows={4}
                    />
                    <p className="mt-1.5 text-xs text-slate-500">AI can suggest a description — enable in step 2</p>
                  </div>
                  <div className="sm:col-span-2">
                    <FloatingInput
                      id="email"
                      label="Your Email *"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <FloatingInput
                      id="tags"
                      label="Tags (comma-separated)"
                      type="text"
                      value={form.tags}
                      onChange={(e) => update('tags', e.target.value)}
                    />
                  </div>
                  <div>
                    <FloatingInput
                      id="twitter"
                      label="Twitter URL"
                      type="url"
                      value={form.twitter}
                      onChange={(e) => update('twitter', e.target.value)}
                    />
                  </div>
                  <div>
                    <FloatingInput
                      id="github"
                      label="GitHub URL"
                      type="url"
                      value={form.github}
                      onChange={(e) => update('github', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FloatingInput
                      id="image"
                      label="Cover Image URL"
                      type="url"
                      value={form.image}
                      onChange={(e) => update('image', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="rounded-xl border-2 border-white/10 bg-white/5 p-6 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">URL</p>
                        <p className="mt-0.5 truncate text-white">{form.url}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Name</p>
                        <p className="mt-0.5 text-white">{form.title}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Category</p>
                        <p className="mt-0.5 text-accent-400">{form.category}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
                        <p className="mt-0.5 text-white">{form.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Description</p>
                      <p className="mt-0.5 text-slate-300">{form.description}</p>
                    </div>
                    {(form.tags || form.twitter || form.github) && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {form.tags && form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                          <span key={tag} className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-sm text-accent-400">
                            {tag}
                          </span>
                        ))}
                        {form.twitter && <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">Twitter</span>}
                        {form.github && <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">GitHub</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 rounded-xl border-2 border-accent-500/30 bg-accent-500/5 p-4">
                    <Zap className="h-8 w-8 shrink-0 text-accent-400" />
                    <div>
                      <p className="font-medium text-white">Skip the queue</p>
                      <p className="text-sm text-slate-400">Fast-track review for a small fee</p>
                    </div>
                    <Button variant="secondary" className="ml-auto shrink-0">Add Fast-Track</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex justify-between border-t border-white/10 pt-6">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="gap-2 border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              {step < 3 ? (
                <Button
                  variant="primary"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="gap-2 shadow-glow"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gap-2 shadow-glow"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
