import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Code2, FileCode2, Boxes, Database, Network, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';
import CodeBlock from '../components/CodeBlock';
import Icon from '../components/Icon';
import { POSSESSION_TYPES, AGREGAT_LABELS } from '../types/patrimoine';
import { useLanguage } from '../hooks/useLanguage';
import FeaturesPageEN from './FeaturesPageEN';

const toc: TocItem[] = [
  { id: 'architecture', label: 'Architecture globale' },
  { id: 'patrilang', label: 'PatriLang & ANTLR' },
  { id: 'possessions', label: 'Types de possessions' },
  { id: 'tresorerie', label: 'Trésorerie' },
  { id: 'immobilisation', label: 'Immobilisation' },
  { id: 'obligation', label: 'Obligation' },
  { id: 'zfja', label: 'ZFJA' },
  { id: 'zfi', label: 'ZFI' },
];

function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace('#', '');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

export default function FeaturesPage() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    scrollToHash();
  }, [location]);

  if (language === 'en') {
    return <FeaturesPageEN />;
  }

  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Outils & Technologies · Sommaire" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow"><Code2 className="h-4 w-4" />Stack technique & outils</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                Stack technique
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                Plongée dans l'architecture interne de Patrimoine : le DSL
                PatriLang et la grammaire ANTLR.
              </p>
            </div>
          </div>

          <Section id="architecture" eyebrow="Vue d'ensemble" title="Architecture globale du projet">
            <p>
              Patrimoine est organisé en <strong>couches distinctes</strong>,
              chacune avec une responsabilité claire. Cette séparation permet
              de faire évoluer le DSL, le modèle ou la visualisation de façon
              indépendante.
            </p>
            <div className="my-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="space-y-3">
                {archLayers.map((layer, i) => (
                  <div key={layer.name}>
                    <div className="flex items-center gap-3 rounded-xl border border-default px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-glass-hover" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-elevated) 60%, transparent)' }}>
                      <span className="font-mono text-xs text-slate-600">{i + 1}</span>
                      <layer.icon className={`h-5 w-5 ${layer.color}`} />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-primary">{layer.name}</span>
                        <span className="ml-2 text-xs text-slate-500">— {layer.desc}</span>
                      </div>
                    </div>
                    {i < archLayers.length - 1 && (
                      <div className="ml-7 h-3 w-px bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p>
              Le flux de données traverse ces couches de haut en bas : un
              fichier <strong>PatriLang</strong> est parsé par l'analyseur
              ANTLR, transpilé en objets Java du <strong>modèle</strong>,
              puis projeté et visualisé.
            </p>
          </Section>

          <Section id="patrilang" eyebrow="DSL" title="PatriLang, le DSL et la grammaire ANTLR">
            <p>
              <strong>PatriLang</strong> est un langage dédié (DSL) qui permet
              de décrire un patrimoine de façon <strong>déclarative</strong>,
              sans écrire de code Java. Il est pensé pour être lisible par un
              utilisateur métier tout en restant précis.
            </p>
            <h3>Exemple de script PatriLang</h3>
            <p>
              Voici un exemple concret de fichier <code className="inline-code">.cas.md</code> qui
              décrit le patrimoine d'un individu avec ses comptes, opérations et suivi :
            </p>
            <CodeBlock
              filename="ZetyPersonnel.cas.md"
              code={`# Général
* Spécifier Dates:ajd
* Fin de simulation Dates:finSimulation - 1 année
* Cas de ZetyPersonnel
* Devise en Ar

# Possesseurs
* Personnes:Zety 100%

# Trésoreries
* compteCourant, valant 5000000Ar le 01 du 01-2025
* compteEpargne, valant 2000000Ar le 01 du 01-2025

# Créances
* pretAmi, valant 500000Ar le 01 du 01-2025

# Dettes
* pretBancaire, valant 10000000Ar le 01 du 01-2025

# Initialisation
* \`initCompte\` Dates:ajd, entrer 1000000Ar vers Trésoreries:compteCourant

# Opérations
## Salaire, Dates:ajd, devise en Ar
* \`salaireMensuel\` Dates:ajd, entrer 500000Ar vers Trésoreries:compteCourant, jusqu'à date indéterminée tous les 31 du mois

## Charges, Dates:ajd, devise en Ar
* \`loyer\` Dates:ajd, sortir 300000Ar depuis Trésoreries:compteCourant, jusqu'à date indéterminée tous les 5 du mois
* \`abonnement\` Dates:ajd, sortir 40000Ar depuis Trésoreries:compteCourant, jusqu'à date indéterminée tous les 15 du mois

## Achats, Dates:ajd, devise en Ar
* \`achatVoiture\` Dates:ajd, acheter Voiture, valant 15000000Ar, depuis Trésoreries:compteCourant, s'appréciant annuellement de -10%

## Transferts, Dates:ajd, devise en Ar
* \`virement\` Dates:ajd, transférer 200000Ar depuis Trésoreries:compteCourant vers Trésoreries:compteEpargne

# Suivi
* \`correction1\` le 15 du 03-2025, corriger 540000Ar dans Trésoreries:compteCourant`}
            />
            <h3>La grammaire ANTLR</h3>
            <p>
              PatriLang est défini par une grammaire <strong>ANTLR4</strong>.
              ANTLR génère un lexer et un parser à partir d'un fichier{' '}
              <code className="inline-code">.g4</code>, ce qui garantit une
              analyse robuste et extensible du langage.
            </p>
            <CodeBlock
              filename="PatriLang.g4"
              code={`grammar PatriLang;

document   : personne+ EOF ;
personne   : 'personne' '{' patrimoine? '}' ;
patrimoine : 'patrimoine' '{' possession* '}' ;
possession : compte | materiel | dette | creance | flux | achat | transfert ;

compte     : 'compte' STRING '=' montant ;
materiel   : 'materiel' STRING '=' montant ('taux' SIGN? PCT)? ;
dette      : 'dette' STRING '=' montant ;
creance    : 'creance' STRING '=' montant ;
flux       : 'flux' STRING '->' STRING '{' fluxBody* '}' ;
achat      : 'acheter' STRING 'valant' montant 'depuis' STRING ;
transfert  : 'transferer' montant 'depuis' STRING 'vers' STRING ;
fluxBody   : 'montant' '=' montant
           | 'jour' '=' INT
           | 'de' DATE 'a' DATE ;

montant    : INT ('_' INT)* ;
SIGN       : '+' | '-' ;
PCT        : [0-9]+ '%' ;
STRING     : '"' ~'"'* '"' ;
DATE       : [0-9]+ '-' [0-9]+ '-' [0-9]+ ;
INT        : [0-9]+ ;
WS         : [ \\t\\r\\n]+ -> skip ;`}
            />
            <Callout variant="info" title="Avantage du DSL">
              PatriLang permet à un utilisateur non développeur de décrire un
              patrimoine complet dans un fichier texte versionnable, sans
              toucher au code Java. Le transpileur garantit que le résultat est
              cohérent et directement exploitable.
            </Callout>
          </Section>

          <Section id="possessions" eyebrow="Modèle" title="Types de possessions">
            <p>
              Chaque type de possession représente un aspect spécifique de votre patrimoine,
              avec son propre comportement de projection.
            </p>
            <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-sm text-slate-400 bg-white/[0.02]">
                    <th className="p-4">Type</th><th className="p-4">Agrégat</th><th className="p-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {POSSESSION_TYPES.map((pt) => (
                    <tr key={pt.type} className="border-b border-white/5 transition-colors hover:bg-white/5">
                      <td className="p-4">
                        <span className="mr-2 inline-flex" style={{ color: AGREGAT_LABELS[pt.agregat].color }}>
                          <Icon name={pt.icon} size={16} />
                        </span>
                        <span className="font-medium text-primary">{pt.label}</span>
                      </td>
                      <td className="p-4">
                        <span className="rounded px-2 py-1 text-xs font-medium" style={{ background: `${AGREGAT_LABELS[pt.agregat].color}20`, color: AGREGAT_LABELS[pt.agregat].color }}>{AGREGAT_LABELS[pt.agregat].label}</span>
                      </td>
                      <td className="p-4 text-sm text-slate-400">{pt.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="tresorerie" eyebrow="Agrégat" title="Trésorerie — Comprendre le fonctionnement">
            <p>
              La <strong>trésorerie</strong> est l'agrégat le plus liquide du patrimoine.
              C'est l'argent que vous pouvez utiliser immédiatement sans vendre un bien.
            </p>
            <h3>Comment ça marche concrètement</h3>
            <p>
              Chaque compte de trésorerie est modélisé par la classe{' '}
              <code className="inline-code">Compte</code> qui possède un <strong>solde</strong> évoluant
              dans le temps via des <code className="inline-code">FluxArgent</code>. Le moteur de
              projection applique les flux entrants (salaire, revenus) et sortants (loyer, charges)
              jour par jour, mois par mois, selon le calendrier défini.
            </p>
            <ul>
              <li><strong>Flux entrants</strong> : ajoutent de l'argent au solde du compte (salaire, revenus locatifs, remboursements de créances).</li>
              <li><strong>Flux sortants</strong> : retirent de l'argent du solde (loyer, abonnements, achats). Si le solde est insuffisant → <strong>flux impossible</strong>.</li>
              <li><strong>Transferts</strong> : déplacent de l'argent d'un compte à un autre sans modifier le patrimoine total.</li>
            </ul>
            <Callout variant="info" title="Flux impossible détecté">
              Lorsqu'un flux sortant dépasse le solde disponible, le système génère
              une alerte de <strong>flux impossible</strong>. C'est le mécanisme central
              de la politique <TermLink href="/guide#glossaire">ZFI</TermLink>.
            </Callout>
          </Section>

          <Section id="immobilisation" eyebrow="Agrégat" title="Immobilisation — Comprendre le fonctionnement">
            <p>
              Les <strong>immobilisations</strong> sont les possessions matérielles (maison,
              voiture, terrain) ou immatérielles (logiciel, brevet) qui ont une valeur
              économique mais ne sont pas directement convertibles en argent.
            </p>
            <h3>Comment ça marche concrètement</h3>
            <p>
              Chaque immobilisation est modélisée par la classe{' '}
              <code className="inline-code">Materiel</code>. Sa valeur évolue selon un
              <strong> taux d'appréciation ou de dépréciation annuel</strong> appliqué
              de façon composée :
            </p>
            <ul>
              <li><strong>Immobilisation qui prend de la valeur</strong> : un terrain en zone urbaine, un bien immobilier dans un quartier en développement. Exemple : <code className="inline-code">taux +5%</code>.</li>
              <li><strong>Immobilisation qui se déprécie</strong> : un véhicule, un équipement électronique. Exemple : <code className="inline-code">taux -10%</code> par an.</li>
              <li><strong>Valeur stable</strong> : un bien dont la valeur reste constante. Exemple : <code className="inline-code">taux 0%</code>.</li>
            </ul>
            <p>
              La formule de projection est : <code className="inline-code">Valeur(t) = Valeur(0) × (1 + taux)^t</code>,
              où <code className="inline-code">t</code> est le nombre d'années écoulées depuis l'acquisition.
            </p>
            <Callout variant="tip" title="Achat et vente en ligne">
              Via PatriLang, vous pouvez acheter un bien (<code className="inline-code">acheter</code>)
              depuis un compte de trésorerie, ou le vendre (<code className="inline-code">vendre</code>)
              pour récupérer sa valeur actuelle sur un compte.
            </Callout>
          </Section>

          <Section id="obligation" eyebrow="Agrégat" title="Obligation — Comprendre le fonctionnement">
            <p>
              Les <strong>obligations</strong> regroupent deux types de possessions opposées :
              les dettes (ce que vous devez) et les créances (ce qu'on vous doit).
              Elles impactent directement la <strong>valeur nette</strong> de votre patrimoine.
            </p>
            <h3>Dette</h3>
            <p>
              Une <strong>dette</strong> est une somme d'argent que vous devez à quelqu'un.
              C'est un <strong>passif</strong> : elle réduit la valeur nette de votre patrimoine.
            </p>
            <ul>
              <li><strong>Prêts bancaires</strong> : emprunts immobilier, crédit à la consommation.</li>
              <li><strong>Crédits fournisseurs</strong> : montants dus pour des achats à crédit.</li>
              <li><strong>Emprunts personnels</strong> : argent emprunté à un tiers.</li>
            </ul>
            <p>
              Une dette est représentée par la classe{' '}
              <code className="inline-code">Dette</code>. Le capital restant dû diminue
              selon le rythme de remboursement modélisé dans la spécification.
            </p>

            <h3>Créance</h3>
            <p>
              Une <strong>créance</strong> est une somme d'argent que quelqu'un vous doit.
              C'est un <strong>actif</strong> : elle augmente la valeur nette de votre patrimoine.
            </p>
            <ul>
              <li><strong>Prêts accordés</strong> : argent prêté à un ami, un membre de la famille.</li>
              <li><strong>Factures impayées</strong> : montants dus par des clients.</li>
              <li><strong>Salaires dus</strong> : rémunération non encore versée.</li>
            </ul>
            <p>
              Une créance est représentée par la classe{' '}
              <code className="inline-code">Creance</code>. Sa valeur est actualisée ou
              encaissée à l'échéance prévue.
            </p>
            <Callout variant="info" title="Impact sur la valeur nette">
              La valeur nette de votre patrimoine = Trésorerie + Immobilisations + Créances − Dettes.
              Une dette élevée réduit votre capacité d'investissement, tandis qu'une créance
              représente un revenu futur potentiel.
            </Callout>
          </Section>

          <Section id="zfja" eyebrow="Politique" title="ZFJA — Zéro Flux Journaliers jusqu'à Aujourd'hui">
            <p>
              <strong>ZFJA</strong> est une politique de recoupement qui consiste à
              mettre à jour régulièrement votre spécification pour éliminer tous les
              flux journaliers en attente.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Objectif</h4>
                <p className="mt-1 text-xs text-slate-400">Avoir une spécification qui représente fidèlement la réalité à date d'aujourd'hui.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Moyen</h4>
                <p className="mt-1 text-xs text-slate-400">Suivre les flux journaliers et corriger la spécification pour chaque écart constaté.</p>
              </div>
            </div>
            <Callout variant="success" title="ZFJA atteint">
              Si ZFJA est atteint, votre spécification représente fidèlement la réalité
              à date d'aujourd'hui. Tous les flux journaliers ont été traités.
            </Callout>
            <p className="mt-4">
              <Link to="/guide#recouper-patrimoine" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors">
                Voir comment appliquer ZFJA en pratique <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </Section>

          <Section id="zfi" eyebrow="Politique" title="ZFI — Zéro Flux Impossibles">
            <p>
              <strong>ZFI</strong> est une politique qui consiste à planifier l'évolution
              de votre patrimoine pour éviter les flux impossibles — des opérations qui
              feraient passer un compte en solde négatif.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Objectif</h4>
                <p className="mt-1 text-xs text-slate-400">Pouvoir réaliser toutes vos opérations sans blocage.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Moyen</h4>
                <p className="mt-1 text-xs text-slate-400">Planifier l'évolution pour que la trésorerie couvre toujours les opérations.</p>
              </div>
            </div>
            <Callout variant="success" title="ZFI atteint">
              Si ZFI est atteint, vous pouvez réaliser toutes vos opérations sans
              aucun flux impossible détecté.
            </Callout>
            <p className="mt-4">
              <Link to="/guide#alerter-patrimoine" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors">
                Voir comment appliquer ZFI en pratique <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function TermLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="font-medium text-blue-300 underline decoration-dotted underline-offset-4 decoration-blue-400/50 transition-all duration-200 hover:text-blue-200 hover:decoration-blue-300/80"
    >
      {children}
    </a>
  );
}

const archLayers = [
  { icon: FileCode2, name: 'PatriLang (DSL)', desc: 'description déclarative du patrimoine', color: 'text-jtr-violet' },
  { icon: Code2, name: 'ANTLR Parser', desc: 'lexer + parser générés depuis la grammaire', color: 'text-jtr-cyan' },
  { icon: Boxes, name: 'Transpileur', desc: 'arbre syntaxique → objets Java', color: 'text-school-400' },
  { icon: Database, name: 'Modèle objet', desc: 'Personne, Patrimoine, Possession', color: 'text-accent-300' },
  { icon: Network, name: 'Visualisation', desc: 'graphes d\'évolution + alertes', color: 'text-jtr-mint' },
];


