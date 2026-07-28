import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Code2, FileCode2, Boxes, Database, Network, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';
import CodeBlock from '../components/CodeBlock';
import Icon from '../components/Icon';
import { TypeAgregat } from '../types/patrimoine';

const toc: TocItem[] = [
  { id: 'architecture', label: 'Global architecture' },
  { id: 'patrilang', label: 'PatriLang & ANTLR' },
  { id: 'possessions', label: 'Possession types' },
  { id: 'tresorerie', label: 'Cash & Treasury' },
  { id: 'immobilisation', label: 'Fixed assets' },
  { id: 'obligation', label: 'Obligations & Liabilities' },
  { id: 'zfja', label: 'ZFJA' },
  { id: 'zfi', label: 'ZFI' },
];

const POSSESSION_TYPES_EN = [
  { type: 'Materiel', label: 'Property / Good', description: 'Physical asset (house, car, land) that appreciates or depreciates over time', agregat: TypeAgregat.IMMOBILISATION, icon: 'home' },
  { type: 'Compte', label: 'Account', description: 'Bank account or cash, credited or debited by flows', agregat: TypeAgregat.TRESORERIE, icon: 'credit-card' },
  { type: 'Dette', label: 'Debt', description: 'Money you owe to others (negative book value)', agregat: TypeAgregat.OBLIGATION, icon: 'trending-down' },
  { type: 'Creance', label: 'Receivable', description: 'Money others owe to you (positive book value)', agregat: TypeAgregat.OBLIGATION, icon: 'trending-up' },
  { type: 'FluxArgent', label: 'Cash Flow', description: 'Recurring monthly inflow or outflow from an account', agregat: TypeAgregat.FLUX, icon: 'arrow-left-right' },
  { type: 'TransfertArgent', label: 'Cash Transfer', description: 'Transfer from one account to another', agregat: TypeAgregat.FLUX, icon: 'arrow-left-right' },
  { type: 'AchatMaterielAuComptant', label: 'Cash Purchase', description: 'Purchase of a physical asset paid in cash from an account', agregat: TypeAgregat.IMMOBILISATION, icon: 'shopping-cart' },
  { type: 'RemboursementDette', label: 'Debt Repayment', description: 'Debt repayment transaction', agregat: TypeAgregat.FLUX, icon: 'send' },
  { type: 'Correction', label: 'Correction', description: 'Accounting correction to adjust the value of a possession', agregat: TypeAgregat.CORRECTION, icon: 'wrench' },
  { type: 'CompteCorrection', label: 'Correction Account', description: 'Correction account associated with each possession', agregat: TypeAgregat.CORRECTION, icon: 'scale' },
  { type: 'PatrimoinePersonnel', label: 'Personal Asset', description: 'Share of a person in shared assets', agregat: TypeAgregat.PATRIMOINE, icon: 'user' },
  { type: 'PersonneMorale', label: 'Legal Entity', description: 'Legal entity (company) owning assets', agregat: TypeAgregat.PATRIMOINE, icon: 'building-2' },
  { type: 'Vente', label: 'Sale', description: 'Sale of a possession at a given price to an account', agregat: TypeAgregat.IMMOBILISATION, icon: 'tag' },
];

const AGREGAT_LABELS_EN = {
  [TypeAgregat.PATRIMOINE]: { label: 'Assets', color: '#a78bfa' },
  [TypeAgregat.TRESORERIE]: { label: 'Cash & Treasury', color: '#2dd4bf' },
  [TypeAgregat.IMMOBILISATION]: { label: 'Fixed Assets', color: '#22d3ee' },
  [TypeAgregat.OBLIGATION]: { label: 'Obligations', color: '#fbbf24' },
  [TypeAgregat.FLUX]: { label: 'Cash Flows', color: '#f87171' },
  [TypeAgregat.CORRECTION]: { label: 'Corrections', color: '#94a3b8' },
  [TypeAgregat.ENTREPRISE]: { label: 'Enterprise', color: '#60a5fa' },
};

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

export default function FeaturesPageEN() {
  const location = useLocation();

  useEffect(() => {
    scrollToHash();
  }, [location]);

  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Features · Summary" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow"><Code2 className="h-4 w-4" />Technical stack & features</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                Technical Stack
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                A deep dive into the internal architecture of Patrimoine: the PatriLang DSL and ANTLR grammar.
              </p>
            </div>
          </div>

          <Section id="architecture" eyebrow="Overview" title="Global project architecture">
            <p>
              Patrimoine is organized into <strong>distinct layers</strong>,
              each with a clear responsibility. This separation allows the DSL,
              model, or visualization to evolve independently.
            </p>
            <div className="my-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="space-y-3">
                {archLayers.map((layer, i) => (
                  <div key={layer.name}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
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
              The flow of data traverses these layers from top to bottom: a
              <strong> PatriLang</strong> file is parsed by the ANTLR analyzer,
              transpiled into Java objects in the <strong>model</strong>,
              then projected and visualized.
            </p>
          </Section>

          <Section id="patrilang" eyebrow="DSL" title="PatriLang, the DSL and ANTLR Grammar">
            <p>
              <strong>PatriLang</strong> is a dedicated domain-specific language (DSL) that allows
              describing assets <strong>declaratively</strong>, without writing Java code.
              It is designed to be readable by business users while remaining precise.
            </p>
            <h3>PatriLang Script Example</h3>
            <p>
              Here is a concrete example of a <code className="inline-code">.cas.md</code> file that
              describes an individual's assets with their accounts, operations, and tracking:
            </p>
            <CodeBlock
              filename="ZetyPersonnel.cas.md"
              code={`# General
* Specify Dates:today
* End of simulation Dates:endSimulation - 1 year
* Case of ZetyPersonnel
* Currency in Ar

# Owners
* People:Zety 100%

# Cash & Treasury
* checkingAccount, valued at 5000000Ar on the 01 of 01-2025
* savingsAccount, valued at 2000000Ar on the 01 of 01-2025

# Receivables
* loanToFriend, valued at 500000Ar on the 01 of 01-2025

# Debts
* bankLoan, valued at 10000000Ar on the 01 of 01-2025

# Initialization
* \`initAccount\` Dates:today, enter 1000000Ar to Cash & Treasury:checkingAccount

# Operations
## Salary, Dates:today, currency in Ar
* \`monthlySalary\` Dates:today, enter 500000Ar to Cash & Treasury:checkingAccount, until undetermined date every 31st of the month

## Charges, Dates:today, currency in Ar
* \`rent\` Dates:today, withdraw 300000Ar from Cash & Treasury:checkingAccount, until undetermined date every 5th of the month
* \`subscription\` Dates:today, withdraw 40000Ar from Cash & Treasury:checkingAccount, until undetermined date every 15th of the month

## Purchases, Dates:today, currency in Ar
* \`carPurchase\` Dates:today, buy Car, valued at 15000000Ar, from Cash & Treasury:checkingAccount, appreciating annually by -10%

## Transfers, Dates:today, currency in Ar
* \`transfer\` Dates:today, transfer 200000Ar from Cash & Treasury:checkingAccount to Cash & Treasury:savingsAccount

# Tracking
* \`correction1\` on the 15 of 03-2025, correct 540000Ar in Cash & Treasury:checkingAccount`}
            />
            <h3>The ANTLR Grammar</h3>
            <p>
              PatriLang is defined by an <strong>ANTLR4</strong> grammar.
              ANTLR generates a lexer and a parser from a{' '}
              <code className="inline-code">.g4</code> file, which guarantees a
              robust and extensible analysis of the language.
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
            <Callout variant="info" title="DSL Advantage">
              PatriLang allows a non-developer user to describe complete assets in
              a versionable text file, without touching Java code. The transpiler
              guarantees that the result is coherent and directly usable.
            </Callout>
          </Section>

          <Section id="possessions" eyebrow="Model" title="Possession types">
            <p>
              Each type of possession represents a specific aspect of your assets,
              with its own projection behavior.
            </p>
            <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-sm text-slate-400 bg-white/[0.02]">
                    <th className="p-4">Type</th><th className="p-4">Aggregate</th><th className="p-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {POSSESSION_TYPES_EN.map((pt) => (
                    <tr key={pt.type} className="border-b border-white/5 transition-colors hover:bg-white/5">
                      <td className="p-4">
                        <span className="mr-2 inline-flex" style={{ color: AGREGAT_LABELS_EN[pt.agregat].color }}>
                          <Icon name={pt.icon} size={16} />
                        </span>
                        <span className="font-medium text-primary">{pt.label}</span>
                      </td>
                      <td className="p-4">
                        <span className="rounded px-2 py-1 text-xs font-medium" style={{ background: `${AGREGAT_LABELS_EN[pt.agregat].color}20`, color: AGREGAT_LABELS_EN[pt.agregat].color }}>{AGREGAT_LABELS_EN[pt.agregat].label}</span>
                      </td>
                      <td className="p-4 text-sm text-slate-400">{pt.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="tresorerie" eyebrow="Aggregate" title="Cash & Treasury — How It Works">
            <p>
              The <strong>cash and treasury</strong> is the most liquid aggregate of assets.
              It is the money you can use immediately without selling an asset.
            </p>
            <h3>How it works in practice</h3>
            <p>
              Each cash account is modeled by the class{' '}
              <code className="inline-code">Compte</code> which has a <strong>balance</strong> that evolves
              over time via <code className="inline-code">FluxArgent</code>. The projection engine
              applies inflows (salary, revenues) and outflows (rent, charges) day by day,
              month by month, according to the defined schedule.
            </p>
            <ul>
              <li><strong>Inflows</strong>: add money to the account balance (salary, rental income, receivable repayments).</li>
              <li><strong>Outflows</strong>: withdraw money from the balance (rent, subscriptions, purchases). If the balance is insufficient → <strong>impossible flow</strong>.</li>
              <li><strong>Transfers</strong>: move money from one account to another without changing the total net worth.</li>
            </ul>
            <Callout variant="info" title="Impossible flow detected">
              When an outflow exceeds the available balance, the system generates
              an <strong>impossible flow</strong> alert. This is the central mechanism
              of the <TermLink href="/guide#glossaire">ZFI</TermLink> policy.
            </Callout>
          </Section>

          <Section id="immobilisation" eyebrow="Aggregate" title="Fixed Assets — How It Works">
            <p>
              <strong>Fixed assets</strong> are physical possessions (house,
              car, land) or intangible possessions (software, patent) that have economic
              value but are not directly convertible into cash.
            </p>
            <h3>How it works in practice</h3>
            <p>
              Each fixed asset is modeled by the class{' '}
              <code className="inline-code">Materiel</code>. Its value evolves according to an
              <strong> annual appreciation or depreciation rate</strong> applied compoundly:
            </p>
            <ul>
              <li><strong>Appreciating assets</strong>: land in an urban area, real estate in a developing neighborhood. Example: <code className="inline-code">rate +5%</code>.</li>
              <li><strong>Depreciating assets</strong>: a vehicle, electronic equipment. Example: <code className="inline-code">rate -10%</code> per year.</li>
              <li><strong>Stable value</strong>: an asset whose value remains constant. Example: <code className="inline-code">rate 0%</code>.</li>
            </ul>
            <p>
              The projection formula is: <code className="inline-code">Value(t) = Value(0) × (1 + rate)^t</code>,
              where <code className="inline-code">t</code> is the number of years elapsed since acquisition.
            </p>
            <Callout variant="tip" title="Inline buying and selling">
              Via PatriLang, you can buy an asset (<code className="inline-code">acheter</code>)
              from a cash account, or sell it (<code className="inline-code">vendre</code>)
              to recover its current value into an account.
            </Callout>
          </Section>

          <Section id="obligation" eyebrow="Aggregate" title="Obligations & Liabilities — How It Works">
            <p>
              <strong>Obligations</strong> group together two opposing types of possessions:
              debts (what you owe) and receivables (what is owed to you).
              They directly impact the <strong>net worth</strong> of your assets.
            </p>
            <h3>Debt</h3>
            <p>
              A <strong>debt</strong> is a sum of money you owe someone.
              It is a <strong>liability</strong>: it reduces the net worth of your assets.
            </p>
            <ul>
              <li><strong>Bank loans</strong>: mortgages, consumer credit.</li>
              <li><strong>Supplier credit</strong>: amounts due for credit purchases.</li>
              <li><strong>Personal loans</strong>: money borrowed from a third party.</li>
            </ul>
            <p>
              A debt is represented by the class{' '}
              <code className="inline-code">Dette</code>. The remaining capital due decreases
              according to the repayment schedule modeled in the specification.
            </p>

            <h3>Receivable</h3>
            <p>
              A <strong>receivable</strong> is a sum of money someone owes you.
              It is an <strong>asset</strong>: it increases the net worth of your assets.
            </p>
            <ul>
              <li><strong>Lent money</strong>: money lent to a friend or family member.</li>
              <li><strong>Unpaid invoices</strong>: amounts due from clients.</li>
              <li><strong>Owed salaries</strong>: remuneration not yet paid.</li>
            </ul>
            <p>
              A receivable is represented by the class{' '}
              <code className="inline-code">Creance</code>. Its value is updated or
              cashed at the scheduled maturity.
            </p>
            <Callout variant="info" title="Net Worth Impact">
              Your assets net worth = Cash & Treasury + Fixed Assets + Receivables − Debts.
              A high debt reduces your investment capacity, while a receivable represents
              potential future income.
            </Callout>
          </Section>

          <Section id="zfja" eyebrow="Policy" title="ZFJA — Zero Daily Flows until Today">
            <p>
              <strong>ZFJA</strong> is a reconciliation policy that consists of
              regularly updating your specification to eliminate all pending
              daily flows.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Goal</h4>
                <p className="mt-1 text-xs text-slate-400">Have a specification that faithfully represents the reality as of today.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Method</h4>
                <p className="mt-1 text-xs text-slate-400">Follow daily flows and correct the specification for each discrepancy observed.</p>
              </div>
            </div>
            <Callout variant="success" title="ZFJA achieved">
              If ZFJA is achieved, your specification faithfully represents the reality
              as of today. All daily flows have been processed.
            </Callout>
            <p className="mt-4">
              <Link to="/guide#recouper-patrimoine" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors">
                See how to apply ZFJA in practice <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </Section>

          <Section id="zfi" eyebrow="Policy" title="ZFI — Zero Impossible Flows">
            <p>
              <strong>ZFI</strong> is a policy that consists of planning the evolution
              of your assets to avoid impossible flows—transactions that
              would make an account balance go negative.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Goal</h4>
                <p className="mt-1 text-xs text-slate-400">Be able to perform all your operations without blocking.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Method</h4>
                <p className="mt-1 text-xs text-slate-400">Plan the evolution so that cash always covers transactions.</p>
              </div>
            </div>
            <Callout variant="success" title="ZFI achieved">
              If ZFI is achieved, you can perform all your operations with no
              impossible flows detected.
            </Callout>
            <p className="mt-4">
              <Link to="/guide#alerter-patrimoine" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors">
                See how to apply ZFI in practice <ArrowRight className="h-3 w-3" />
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
  { icon: FileCode2, name: 'PatriLang (DSL)', desc: 'declarative description of assets', color: 'text-jtr-violet' },
  { icon: Code2, name: 'ANTLR Parser', desc: 'lexer & parser generated from grammar', color: 'text-jtr-cyan' },
  { icon: Boxes, name: 'Transpiler', desc: 'syntax tree → Java objects', color: 'text-school-400' },
  { icon: Database, name: 'Object model', desc: 'Person, Asset, Possession', color: 'text-accent-300' },
  { icon: Network, name: 'Visualization', desc: 'evolution graphs + alerts', color: 'text-jtr-mint' },
];
