import { useState } from 'react';
import { Eye, EyeOff, GitBranch, ArrowRight, User, Mail, Lock } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage } from '../hooks/useLanguage';

const authTranslations = {
  fr: {
    badge: 'Accès au dépôt source',
    loginTitle: 'Connexion',
    signupTitle: 'Créer un compte',
    loginDesc: 'Connectez-vous pour accéder au dépôt Patrimoine sur GitHub.',
    signupDesc: 'Créez un compte pour accéder au dépôt Patrimoine sur GitHub.',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Votre nom',
    emailLabel: 'Email',
    emailPlaceholder: 'votre@email.com',
    passLabel: 'Mot de passe',
    passPlaceholder: '••••••••',
    errFill: 'Veuillez remplir tous les champs.',
    errName: 'Veuillez entrer votre nom.',
    submitLogin: 'Se connecter',
    submitSignup: 'Créer mon compte',
    switchSignup: 'Pas encore de compte ? ',
    switchSignupLink: 'Créer un compte',
    switchLogin: 'Déjà un compte ? ',
    switchLoginLink: 'Se connecter',
    bottomText: 'Après connexion, vous serez redirigé vers le dépôt GitHub de Patrimoine.'
  },
  en: {
    badge: 'Source repository access',
    loginTitle: 'Log In',
    signupTitle: 'Create an Account',
    loginDesc: 'Log in to access the Patrimoine repository on GitHub.',
    signupDesc: 'Create an account to access the Patrimoine repository on GitHub.',
    nameLabel: 'Full Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    passLabel: 'Password',
    passPlaceholder: '••••••••',
    errFill: 'Please fill in all fields.',
    errName: 'Please enter your name.',
    submitLogin: 'Log In',
    submitSignup: 'Create my account',
    switchSignup: "Don't have an account? ",
    switchSignupLink: 'Create an account',
    switchLogin: 'Already have an account? ',
    switchLoginLink: 'Log In',
    bottomText: 'After logging in, you will be redirected to the Patrimoine GitHub repository.'
  }
};

export default function AuthPage() {
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const t = authTranslations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(t.errFill);
      return;
    }

    if (!isLogin && !formData.name) {
      setError(t.errName);
      return;
    }

    window.open('https://github.com/hei-school/patrimoine', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-24 pb-16 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 mb-6">
            <GitBranch className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-300">{t.badge}</span>
          </div>
          <div className="flex justify-center mb-4">
            <Logo size={48} />
          </div>
          <h1 className="text-2xl font-extrabold text-primary">
            {isLogin ? t.loginTitle : t.signupTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin ? t.loginDesc : t.signupDesc}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.nameLabel}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-primary placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-primary placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{t.passLabel}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.passPlaceholder}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-primary placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02]"
            >
              {isLogin ? t.submitLogin : t.submitSignup}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-slate-400 transition-colors hover:text-blue-300"
            >
              {isLogin ? (
                <>{t.switchSignup}<span className="font-medium text-blue-300">{t.switchSignupLink}</span></>
              ) : (
                <>{t.switchLogin}<span className="font-medium text-blue-300">{t.switchLoginLink}</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          {t.bottomText}
        </p>
      </div>
    </div>
  );
}


