import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, TrendingUp, RefreshCw, Globe, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { AGREGAT_LABELS, TypeAgregat } from '../types/patrimoine';

const CAPTURES = [
  { src: '/patrimoine-capture1.png', alt: 'Capture 1 - Overview of assets' },
  { src: '/patrimoine-capture2.png', alt: 'Capture 2 - Asset specification' },
  { src: '/patrimoine-capture3.png', alt: 'Capture 3 - Evolution graphs' },
  { src: '/patrimoine-capture4.png', alt: 'Capture 4 - Aggregates analysis' },
  { src: '/patrimoine-capture5.png', alt: 'Capture 5 - Dashboard' },
];
const AUTO_INTERVAL = 4000;

export default function HomePageEN() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const total = CAPTURES.length;

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 'next' : 'prev');
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection('next');
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection('prev');
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next, current]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
        <div className="container-doc relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo with glow ring */}
            <div className="mt-8 flex justify-center animate-scale-in">
              <div className="relative float">
                <div className="absolute inset-0 -m-6 rounded-full bg-blue-500/20 blur-2xl animate-pulse-glow" />
                <div className="relative">
                  <Logo size={72} />
                </div>
              </div>
            </div>

            {/* Title with staggered reveal */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your wealth is not your salary.<br />
              <span className="text-gradient inline-block animate-fade-up delay-200">It's your assets.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 leading-relaxed animate-fade-up delay-300 sm:text-lg">
              Describe, analyze, and visualize all your possessions in a single,
              coherent approach. Accounts, goods, debts, receivables—everything is modeled
              to give you a complete view of your financial situation.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 animate-fade-up delay-500 sm:flex-row">
              <Link
                to="/guide"
                className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
              >
                <BookOpen className="h-4 w-4" />
                Get Started Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/features"
                className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Auto-advanced carousel with captures */}
          <div className="mt-48 reveal revealed">
            <div className="capture-carousel relative mx-auto max-w-4xl">
              <div className="capture-stage relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
                {CAPTURES.map((cap, i) => (
                  <div
                    key={i}
                    className={`capture-slide ${i === current ? 'capture-slide-active' : ''} ${i < current || (i === 0 && current === total - 1 && direction === 'prev') ? 'capture-slide-prev' : ''}`}
                  >
                    <img
                      src={cap.src}
                      alt={cap.alt}
                      className="capture-img"
                      draggable={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/og-image.svg';
                      }}
                    />
                  </div>
                ))}
                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-0 via-transparent to-transparent" style={{ background: `linear-gradient(to top, color-mix(in srgb, var(--surface) 60%, transparent), transparent, transparent)` }} />
                {/* Label */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm">
                    Screenshot {current + 1} / {total}
                  </span>
                  <span className="text-xs text-slate-400">{CAPTURES[current].alt}</span>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prev}
                className="capture-arrow capture-arrow-left"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="capture-arrow capture-arrow-right"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="mt-5 flex items-center justify-center gap-2.5">
                {CAPTURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`capture-dot ${i === current ? 'capture-dot-active' : ''}`}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four features - clickable cards */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Overview</span>
          <h2 className="section-title">Four pillars to master your assets</h2>
          <p className="section-subtitle mx-auto">
            Four essential features to reason about all your possessions and anticipate their evolution.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <Link
                to={f.link}
                className="card-float card-hover group block h-full p-6 no-underline"
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: f.color }}>
                  <Icon name={f.icon} size={32} />
                </div>
                <h3 className="text-base font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: f.color }}>
                  Discover
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Aggregate types */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Model</span>
          <h2 className="section-title">The three aggregates of your assets</h2>
          <p className="section-subtitle mx-auto">
            Your possessions are organized into three main groups for clear analysis.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { agregat: TypeAgregat.TRESORERIE, title: 'Cash & Treasury', desc: 'Immediately available money. Checking accounts, savings, cash. The most liquid aggregate—what you can use right away.' },
            { agregat: TypeAgregat.IMMOBILISATION, title: 'Fixed Assets', desc: 'Your tangible and intangible assets. House, car, software—having economic value but less liquid. They must be sold or rented to generate profit.' },
            { agregat: TypeAgregat.OBLIGATION, title: 'Obligations & Liabilities', desc: 'What you owe (debts) and what others owe you (receivables). Debts reduce your assets, receivables increase them.' },
          ].map((item, i) => {
            const meta = AGREGAT_LABELS[item.agregat];
            return (
              <Reveal key={item.agregat} delay={i * 100}>
                <div className="card-float card-hover h-full p-6" style={{ borderColor: `${meta.color}30` }}>
                  <div className="mb-3" style={{ color: meta.color }}>
                    <Icon name={meta.icon} size={36} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: meta.color }}>{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Pourquoi Patrimoine - Info section */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-4xl">
          <div className="card-float p-8 sm:p-12" style={{ borderColor: 'rgba(223,164,8,0.15)' }}>
            <Reveal className="text-center">
              <span className="section-eyebrow" style={{ backgroundImage: 'linear-gradient(135deg, #dfa408, #f5cc5e)' }}>Why Patrimoine?</span>
              <h2 className="section-title mt-4 text-3xl sm:text-4xl">Your assets deserve better than a spreadsheet</h2>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_PATRIMOINE.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: `${item.color}15`, color: item.color }}>
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 text-center">
              <Link
                to="/guide"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
              >
                Follow the User Guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

const FEATURES = [
  {
    icon: 'clipboard-list',
    title: 'Specify',
    description: 'Describe your assets at a specific moment: bank accounts, physical goods, debts, receivables, and recurring cash flows.',
    color: '#3b82f6',
    link: '/guide#specifier-patrimoine',
  },
  {
    icon: 'trending-up',
    title: 'Project',
    description: 'Visualize the future evolution of your assets over a given period through configurable charts.',
    color: '#2563eb',
    link: '/guide#projeter-patrimoine',
  },
  {
    icon: 'refresh-cw',
    title: 'Reconcile',
    description: 'Compare planned transactions with actual ones and adjust your specification accordingly.',
    color: '#fbbf24',
    link: '/guide#recouper-patrimoine',
  },
  {
    icon: 'alert-triangle',
    title: 'Alert',
    description: 'Automatically detect impossible flows: transactions that would make an account balance go negative.',
    color: '#f87171',
    link: '/guide#alerter-patrimoine',
  },
];

const WHY_PATRIMOINE = [
  { icon: Globe, title: 'Holistic approach', desc: 'Reason about all your possessions in a single view, not fragmented by account.', color: '#60a5fa' },
  { icon: TrendingUp, title: 'Temporal projections', desc: 'Visualize the evolution of your assets over the coming months and years.', color: '#2dd4bf' },
  { icon: Shield, title: 'Alert detection', desc: 'Be warned before an account goes negative thanks to the ZFI policy.', color: '#f43f7a' },
  { icon: RefreshCw, title: 'Real reconciliation', desc: 'Compare your plan with reality and correct discrepancies to stay up to date (ZFJA).', color: '#fbbf24' },
  { icon: FileText, title: 'Dedicated PatriLang DSL', desc: 'Describe your assets in natural language, without writing Java code.', color: '#a78bfa' },
];
