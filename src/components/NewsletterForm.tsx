'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const ORANGE = '#C8834A'

export function NewsletterForm({ locale }: { locale: string }) {
  const isFr = locale === 'fr'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      locale,
    }
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.error === 'already_subscribed') {
        setStatus('exists')
      } else if (!res.ok) {
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 p-5 rounded-2xl" style={{ background: 'rgba(200,131,74,0.08)', border: '1px solid rgba(200,131,74,0.22)' }}>
        <CheckCircle size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="font-bold text-white text-sm mb-1">
            {isFr ? 'Vous êtes inscrit !' : "You're subscribed!"}
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isFr ? 'Vérifiez votre boîte mail — premier numéro lundi.' : 'Check your inbox — first issue lands Monday.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-3">
        <input
          name="firstName"
          type="text"
          placeholder={isFr ? 'Prénom' : 'First name'}
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: ORANGE }}
      >
        {status === 'loading'
          ? (isFr ? 'Inscription...' : 'Subscribing...')
          : (isFr ? 'Je m\'abonne — c\'est gratuit' : 'Subscribe — it\'s free')}
        {status !== 'loading' && <ArrowRight size={15} />}
      </button>
      {status === 'exists' && (
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {isFr ? 'Vous êtes déjà abonné.' : "You're already subscribed."}
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-center" style={{ color: '#e07070' }}>
          {isFr ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Please try again.'}
        </p>
      )}
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
        {isFr ? 'Chaque lundi. Désabonnement en 1 clic.' : 'Every Monday. Unsubscribe in one click.'}
      </p>
    </form>
  )
}
