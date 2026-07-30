import { useState } from 'react';
import { BookOpen, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../hooks/useLanguage';

const formTranslations = {
  fr: {
    name: 'Votre nom',
    email: 'Votre email',
    message: 'Votre message',
    send: 'Envoyer',
    success: 'Message envoyé ! Nous vous répondrons bientôt.',
  },
  en: {
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    send: 'Send',
    success: 'Message sent! We will respond shortly.',
  },
};

const footerTranslations = {
  fr: {
    desc: 'Décrivez, analysez et visualisez votre patrimoine avec une approche holistique.',
    doc: 'Documentation',
    features: 'Outils & Technologies',
    guide: "Guide d'utilisation",
    resources: 'Ressources',
    repo: 'Dépôt source',
    home: 'Accueil',
    contact: 'Contact',
    bottom1: 'Documentation Patrimoine · Contenu issu du projet source',
    bottom2: 'Conçu pour inspirer et faciliter votre navigation',
  },
  en: {
    desc: 'Describe, analyze, and visualize your assets with a holistic approach.',
    doc: 'Documentation',
    features: 'Tools & Technologies',
    guide: 'User Guide',
    resources: 'Resources',
    repo: 'Source Repository',
    home: 'Home',
    contact: 'Contact',
    bottom1: 'Patrimoine Documentation · Content from the source project',
    bottom2: 'Designed to inspire and ease your navigation',
  },
};

function ContactForm() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const t = formTranslations[language];

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-jtr-mint/20 bg-jtr-mint/5 p-4 text-sm text-jtr-mint">
        <CheckCircle2 className="h-4 w-4" />
        {t.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder={t.name}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <input
        type="email"
        placeholder={t.email}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <textarea
        placeholder={t.message}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows={3}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
      >
        <Send className="h-3.5 w-3.5" />
        {t.send}
      </button>
    </form>
  );
}

export default function Footer() {

  const { language } = useLanguage();
  const t = footerTranslations[language];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-default" style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[600px] -translate-x-1/2 rounded-full blur-[100px] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
      />
      <div className="container-doc relative py-12">
        {/* Main content grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="text-sm font-bold text-primary">Patrimoine</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-400 leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.doc}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/features" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  {t.features}
                </Link>
              </li>
              <li>
                <Link to="/guide" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  {t.guide}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.resources}
            </h4>
            <ul className="mt-3 space-y-2">

              <li>
                <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-blue-300">
                  {t.home}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact form */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.contact}
            </h4>
            <div className="mt-3">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-default pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            {t.bottom1}
          </p>
          <p className="font-mono text-xs text-slate-600">
            {t.bottom2}
          </p>
        </div>
      </div>
    </footer>
  );
}


