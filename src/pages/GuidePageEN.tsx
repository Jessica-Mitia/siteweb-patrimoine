import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Copy, Check, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-500 transition-all duration-300 hover:bg-white/5 hover:text-accent-300"
    >
      {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
    </button>
  );
}

const toc: TocItem[] = [
  { id: 'vue-ensemble', label: 'Overview' },
  { id: 'comptabilite', label: 'Accounting' },
  { id: 'graphes-visualisation', label: 'Graphs & Visuals' },
  { id: 'specifier-patrimoine', label: 'Specify assets' },
  { id: 'general', label: 'General' },
  { id: 'possesseurs', label: 'Owners' },
  { id: 'tresoreries', label: 'Cash & Treasury' },
  { id: 'immobilisations', label: 'Fixed Assets' },
  { id: 'creances', label: 'Receivables' },
  { id: 'dettes', label: 'Debts' },
  { id: 'initialisation', label: 'Initialization' },
  { id: 'operations', label: 'Operations' },
  { id: 'achats-transferts', label: 'Purchases & Transfers' },
  { id: 'suivi', label: 'Tracking & Corrections' },
  { id: 'projeter-patrimoine', label: 'Project' },
  { id: 'recouper-patrimoine', label: 'Reconcile' },
  { id: 'alerter-patrimoine', label: 'Alert' },
  { id: 'devises', label: 'Supported Currencies' },
  { id: 'tout-cas', label: 'Multiple Cases (ToutCas)' },
  { id: 'glossaire', label: 'Glossary' },
];

function TermLink({ term, section }: { term: string; section: string }) {
  return (
    <a
      href={`/guide#${section}`}
      className="relative cursor-pointer font-medium text-blue-300 underline decoration-dotted underline-offset-4 decoration-blue-400/50 transition-all duration-200 hover:text-blue-200 hover:decoration-blue-300/80"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {term}
    </a>
  );
}

function CodeExample({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
      {filename && (
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2">
          <span className="text-xs font-medium text-slate-500">{filename}</span>
          <CopyButton code={code} />
        </div>
      )}
      {!filename && (
        <div className="flex justify-end px-4 pt-2">
          <CopyButton code={code} />
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export default function GuidePageEN() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Guide · Contents" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow"><Icon name="book-open" size={16} />User Guide</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                Patrimoine User Guide
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                This guide will walk you through <strong>from A to Z</strong> to use Patrimoine.
                By the end of this guide, you will know how to
                specify, project, reconcile, and set alerts for your assets.
              </p>
            </div>
          </div>

          {/* ======== OVERVIEW ======== */}
          <Section id="vue-ensemble" eyebrow="Introduction" title="Overview of Patrimoine">
            <p>
              Patrimoine is a Java library that allows you to reason
              <strong> holistically</strong> about your assets. You use
              structured text files called <strong>case files</strong> written
              in <TermLink term="PatriLang" section="glossaire" />, the dedicated domain-specific language.
            </p>
            <p>The four fundamental steps are:</p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-sm font-semibold text-blue-300">1. Specify</h4>
                <p className="mt-1 text-xs text-slate-400">Describe your assets at a specific moment: accounts, goods, debts, receivables, and cash flows.</p>
              </div>
              <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-4">
                <h4 className="text-sm font-semibold text-blue-300">2. Project</h4>
                <p className="mt-1 text-xs text-slate-400">Visualize the future evolution of your assets over a given period.</p>
              </div>
              <div className="rounded-xl border border-school-400/20 bg-school-400/5 p-4">
                <h4 className="text-sm font-semibold text-school-400">3. Reconcile</h4>
                <p className="mt-1 text-xs text-slate-400">Compare planned transactions with actual ones and correct discrepancies.</p>
              </div>
              <div className="rounded-xl border border-jtr-rose/20 bg-jtr-rose/5 p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">4. Alert</h4>
                <p className="mt-1 text-xs text-slate-400">Detect impossible flows: transactions that would make an account balance go negative.</p>
              </div>
            </div>
          </Section>

          {/* ======== ACCOUNTING ======== */}
          <Section id="comptabilite" eyebrow="Accounting" title="Required documents">
            <p>
              For complete asset tracking, Patrimoine can work with
              several types of accounting and supporting documents.
            </p>

            <h3>Planned Journals</h3>
            <p>
              Planned journals are the flows scheduled in your case file. They
              represent the financial movements you expect over the projection period.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">PatriLang Format</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Recurring income (salaries, pensions)</li>
                <li>Monthly charges (rent, insurance)</li>
                <li>Loan maturity payments</li>
                <li>Programmed transfers</li>
              </ul>
            </div>

            <h3>Actual Journals</h3>
            <p>
              Actual journals are the real movements observed (bank statements).
              They are compared to planned journals during reconciliation.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">PatriLang or CSV Format</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Monthly bank statements</li>
                <li>Recorded actual transactions</li>
                <li>Comparison with forecasts</li>
                <li>Discrepancy detection</li>
              </ul>
            </div>

            <h3>Supporting Documents</h3>
            <p>
              Supporting documents (PJ) document each important transaction.
              They contain an ID, a date, a reference, and a link to the document.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">Google Drive links or files</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Invoices and receipts</li>
                <li>Loan agreements</li>
                <li>Insurance certificates</li>
                <li>Verified Google Drive links</li>
              </ul>
            </div>
          </Section>

          {/* ======== GRAPHS & VISUALS ======== */}
          <Section id="graphes-visualisation" eyebrow="Visualization" title="Graphs & visualization">
            <p>
              Patrimoine generates evolution graphs using the XChart module.
              These visualizations allow you to intuitively understand the evolution of your assets.
            </p>

            <h3>Cash & Treasury</h3>
            <p>
              Evolution of bank accounts and available liquidities.
            </p>

            <h3>Fixed Assets</h3>
            <p>
              Value of physical and real estate assets over time.
            </p>

            <h3>Obligations</h3>
            <p>
              Evolution of debts and receivables (liabilities and financial assets).
            </p>

            <h3>Combined View</h3>
            <p>
              All curves superimposed for a complete overview.
            </p>

            <h3 className="mt-6 text-lg font-bold text-primary">Graph Types</h3>
            <p>
              You can visualize cash, fixed assets, and obligations separately, or combine
              all curves in a single graph. Graphs are stored as PNGs in test resources.
            </p>

            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Cash & Treasury</h4>
                <p className="mt-1 text-xs text-slate-400">Bank accounts and liquidities.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Fixed Assets</h4>
                <p className="mt-1 text-xs text-slate-400">Physical and real estate assets.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Obligations</h4>
                <p className="mt-1 text-xs text-slate-400">Debts and receivables.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Combined View</h4>
                <p className="mt-1 text-xs text-slate-400">All curves superimposed.</p>
              </div>
            </div>
          </Section>

          {/* ======== SPECIFY ======== */}
          <Section id="specifier-patrimoine" eyebrow="Step 1" title="Specify your assets">
            <p>
              With Patrimoine, you describe your financial situation in a structured text file
              called a <strong>case</strong>. This file uses the <TermLink term="PatriLang" section="glossaire" /> language.
            </p>
            <p>
              A case consists of several mandatory and optional sections.
              Each section describes an aspect of your assets.
            </p>
          </Section>

          <Section id="general" eyebrow="Section" title="General — Basic Information">
            <p>
              The section <code className="inline-code"># General</code> defines the fundamental
              parameters of your simulation: the start date, end date, case name, and currency used.
            </p>
            <CodeExample filename="general.cas.md" code={`# General
* Specify 01 of 01-2025
* End of simulation 31 of 12-2030
* Case of MyAssets
* Currency in Ar`} />
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Specify</span>
                <p className="mt-1 text-sm text-slate-400">The reference date (today) from which the simulation starts.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">End of simulation</span>
                <p className="mt-1 text-sm text-slate-400">The date until which the assets will be projected.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Case of</span>
                <p className="mt-1 text-sm text-slate-400">The name you give to your case file.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Currency in</span>
                <p className="mt-1 text-sm text-slate-400">
                  The currency used: <code className="inline-code">Ar</code> (Ariary), <code className="inline-code">€</code> (Euro), or <code className="inline-code">$</code> (Canadian Dollar).
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500">Dates can also be written relatively:</p>
            <CodeExample code={`* Specify Dates:today + 1 month and 5 days
* End of simulation Dates:endSimulation - 1 year`} />
            <Callout variant="info" title="Special Dates">
              Use <code className="inline-code">Dates:today</code> for "today" and{' '}
              <code className="inline-code">Dates:endSimulation</code> for the end of the simulation.
              You can also use <code className="inline-code">undetermined date</code> for an open period.
              Arithmetic operations on dates are supported:
              <code className="inline-code">+ 1 month</code>, <code className="inline-code">- 1 year</code>, etc.
            </Callout>
          </Section>

          <Section id="possesseurs" eyebrow="Section" title="Owners — Who Owns What">
            <p>
              The section <code className="inline-code"># Owners</code> defines the people
              who own the assets and their share of ownership, expressed as a percentage.
            </p>
            <CodeExample filename="possesseurs.cas.md" code={`# Owners
* People:Zety 60%
* People:Lita 10%
* People:Rasoa 30%`} />
            <p className="text-sm text-slate-500">
              Percentages can be calculated with arithmetic expressions:
            </p>
            <CodeExample code={`* People:Zety ((40 * 2 / 2) - 2 + 3 * 1 - 1)%`} />
          </Section>

          <Section id="tresoreries" eyebrow="Section" title="Cash & Treasury — Your Money Accounts">
            <p>
              The section <code className="inline-code"># Cash & Treasury</code> declares the accounts
              that contain available money: bank accounts, cash, savings.
              This is called <TermLink term="cash & treasury" section="tresorerie" />.
            </p>
            <CodeExample filename="tresoreries.cas.md" code={`# Cash & Treasury
* checkingAccount, valued at 5000000Ar on the 01 of 01-2025
* savingsAccount, valued at 2000000Ar on the 01 of 01-2025`} />
            <p className="text-sm text-slate-500">
              You can also reference an account defined in another case file:
            </p>
            <CodeExample code={`* Cash & Treasury:checkingAccount
* Cash & Treasury:savingsAccount`} />
            <p>
              The format is: <code className="inline-code">* name, valued at amountCurrency date</code>.
              Amounts can contain arithmetic expressions like{' '}
              <code className="inline-code">((4000000 + 888000) * 3) / 2 Ar</code>.
            </p>
          </Section>

          <Section id="immobilisations" eyebrow="Section" title="Fixed Assets — Your Possessions">
            <p>
              Tangible or intangible assets can be declared directly in the
              <code className="inline-code"># Cash & Treasury</code> section with an appreciation rate,
              or purchased via operations. Here is how to declare an already owned asset:
            </p>
            <CodeExample filename="immobilisations.cas.md" code={`# Cash & Treasury
* familyHouse, valued at 50000000Ar on the 01 of 01-2025 appreciating annually by +5%
* car, valued at 15000000Ar on the 01 of 01-2025 appreciating annually by -10%`} />
            <p>
              The appreciation rate can be positive (the asset gains value) or negative
              (the asset depreciates, like a car).
            </p>
          </Section>

          <Section id="creances" eyebrow="Section" title="Receivables — What is Owed to You">
            <p>
              The section <code className="inline-code"># Receivables</code> lists the money that
              others owe you. A <TermLink term="receivable" section="creance" /> is an asset:
              it increases the value of your wealth.
            </p>
            <CodeExample filename="creances.cas.md" code={`# Receivables
* loanToFriend, valued at 500000Ar on the 01 of 01-2025
* clientInvoice, valued at 1200000Ar on the 01 of 01-2025`} />
          </Section>

          <Section id="dettes" eyebrow="Section" title="Debts — What You Owe">
            <p>
              The section <code className="inline-code"># Debts</code> lists the money you
              owe others. A <TermLink term="debt" section="dette" /> is a liability:
              it decreases the value of your wealth.
            </p>
            <CodeExample filename="dettes.cas.md" code={`# Debts
* bankLoan, valued at 10000000Ar on the 01 of 01-2025
* carCredit, valued at 5000000Ar on the 01 of 01-2025`} />
          </Section>

          <Section id="initialisation" eyebrow="Section" title="Initialization — Preparing the Simulation">
            <p>
              The section <code className="inline-code"># Initialization</code> defines the
              initial operations that must be executed at the start of the simulation.
              This is where accounts are funded and initial goals are set.
            </p>
            <CodeExample filename="initialisation.cas.md" code={`# Initialization
* \`initialGoal\` Dates:today, goal of 1000000Ar for Cash & Treasury:checkingAccount
* \`initialDeposit\` Dates:today, enter 1000000Ar to Cash & Treasury:checkingAccount`} />
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">goal of</span>
                <p className="mt-1 text-sm text-slate-400">Defines a target value for a given account. The system will verify if it is met.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">enter ... to</span>
                <p className="mt-1 text-sm text-slate-400">Adds money to an account (initial deposit, incoming transfer).</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">withdraw ... from</span>
                <p className="mt-1 text-sm text-slate-400">Withdraws money from an account (withdrawal, payment).</p>
              </div>
            </div>
          </Section>

          <Section id="operations" eyebrow="Section" title="Operations — Recurring Movements">
            <p>
              The most important section: <code className="inline-code"># Operations</code>
              describes regular money movements. Each operation is grouped under
              a subtitle (prefixed by <code className="inline-code">##</code>) with its own currency.
            </p>

            <h3 className="mt-6 text-lg font-bold text-primary">Recurring Income (salary, rent)</h3>
            <CodeExample filename="operations-revenu.cas.md" code={`# Operations
## Salary, Dates:today, currency in Ar
* \`monthlySalary\` Dates:today, enter 500000Ar to Cash & Treasury:checkingAccount, until undetermined date every 31st of the month`} />
            <p>
              Complete format: <code className="inline-code">* \`id\` date, enter amountCurrency to Cash & Treasury:account, until dateEnd every day of the month</code>
            </p>

            <h3 className="mt-6 text-lg font-bold text-primary">Recurring Expense (subscription, rent)</h3>
            <CodeExample filename="operations-depense.cas.md" code={`## Charges, Dates:today, currency in Ar
* \`internetSubscription\` Dates:today, withdraw 40000Ar from Cash & Treasury:checkingAccount, until undetermined date every 15th of the month
* \`rent\` Dates:today, withdraw 300000Ar from Cash & Treasury:checkingAccount, until 31 of 12-2030 every 5th of the month`} />

            <h3 className="mt-6 text-lg font-bold text-primary">Debt Repayment</h3>
            <CodeExample code={`* \`repayment\` Dates:today, repay Debts:bankLoan from Cash & Treasury:checkingAccount with Receivables:clientInvoice from Cash & Treasury:checkingAccount valued at 500000Ar`} />

            <Callout variant="tip" title="Periodic Operations">
              Use <code className="inline-code">until undetermined date</code> for an operation that repeats infinitely,
              or <code className="inline-code">until 31 of 12-2030</code> for a defined period.
              The words <code className="inline-code">every Xth of the month</code> sets the monthly execution day.
            </Callout>
          </Section>

          <Section id="achats-transferts" eyebrow="Section" title="Purchases & Transfers — One-off Operations">
            <h3>Purchase of a physical asset</h3>
            <p>
              Purchasing an asset creates a new fixed asset and debits the source account:
            </p>
            <CodeExample filename="achat.cas.md" code={`# Operations
## Purchases, Dates:today, currency in Ar
* \`carPurchase\` Dates:today, buy PersonalCar, valued at 15000000Ar, from Cash & Treasury:checkingAccount, appreciating annually by -10%`} />
            <p>
              The appreciation rate can be positive (the asset gains value) or negative
              (the asset depreciates, like a car).
            </p>

            <h3>Sale of an asset</h3>
            <CodeExample code={`* \`carSale\` Dates:today, sell PersonalCar for 5000000Ar to Cash & Treasury:checkingAccount`} />

            <h3>Transfer between accounts</h3>
            <p>
              A transfer moves money from one account to another without changing
              the total assets:
            </p>
            <CodeExample filename="transfert.cas.md" code={`* \`transfer\` Dates:today, transfer 200000Ar from Cash & Treasury:checkingAccount to Cash & Treasury:savingsAccount`} />
          </Section>

          <Section id="suivi" eyebrow="Section" title="Tracking & Corrections — Adjusting to Reality">
            <p>
              The section <code className="inline-code"># Tracking</code> allows modifying goals
              and correcting discrepancies between the simulation and reality.
            </p>
            <h3 className="mt-4 text-lg font-bold text-primary">Define a goal</h3>
            <CodeExample filename="suivi.cas.md" code={`# Tracking
* \`futureGoal\` 01 of 06-2026, goal of 2000000Ar for Cash & Treasury:checkingAccount`} />

            <h3 className="mt-4 text-lg font-bold text-primary">Correct a discrepancy — The standard correction</h3>
            <p>
              When reality differs from the simulation, use a correction to
              adjust the value of an account. This is the most common form:
            </p>
            <CodeExample filename="correction.cas.md" code={`* \`correction1\` 15 of 03-2025, correct 540000Ar in Cash & Treasury:checkingAccount`} />

            <h3 className="mt-4 text-lg font-bold text-primary">Other forms of corrections</h3>
            <p>
              There are several types of corrections for different situations:
            </p>
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Balance correction</span>
                <p className="mt-1 text-sm text-slate-400">
                  Adjusts the gross value of an account. Use when actual balance differs from theoretical balance.
                </p>
                <CodeExample code={`* \`corr\` 15 of 03-2025, correct 540000Ar in Cash & Treasury:checkingAccount`} />
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Missed flow correction</span>
                <p className="mt-1 text-sm text-slate-400">
                  Mark a flow as never occurred (cancellation of planned withdrawal).
                </p>
                <CodeExample code={`* \`annul\` 20 of 04-2025, correct 0Ar in FluxArgent:subscription`} />
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Fixed asset value correction</span>
                <p className="mt-1 text-sm text-slate-400">
                  Adjust the book value of a physical good following an updated estimate.
                </p>
                <CodeExample code={`* \`corrImmo\` 01 of 06-2025, correct 48000000Ar in Materiel:house`} />
              </div>
            </div>

            <Callout variant="info" title="Why Correct?">
              Corrections are essential for the <TermLink term="ZFJA" section="zfja" /> policy:
              by adjusting your specification to reality, you eliminate daily flows
              and obtain a faithful representation of your wealth.
            </Callout>
          </Section>

          {/* ======== PROJECT ======== */}
          <Section id="projeter-patrimoine" eyebrow="Step 2" title="Project the evolution of your assets">
            <p>
              Once your assets are specified, you can visualize their future evolution
              using <strong>charts</strong>. The visualizer generates evolution graphs
              showing how your wealth changes over time.
            </p>
            <h3>The Evolution Graphs</h3>
            <p>
              An <strong>evolution graph</strong> is a chart representing the value of
              your possessions over a given period. Each line in the chart corresponds to an
              aggregate (cash, fixed assets, obligations) or total assets. You can see precisely
              when your wealth increases, decreases, or plateaus.
            </p>
            <p>
              The chart is <strong>configurable</strong>: you choose the display period,
              aggregates to display, and the reference currency. The chart updates
              automatically when you modify your specification.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-3">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Cash & Treasury Only</h4>
                <p className="mt-1 text-xs text-slate-400">Visualize the evolution of your available money over time.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Fixed Assets Only</h4>
                <p className="mt-1 text-xs text-slate-400">Track the value of your physical assets (appreciation/depreciation).</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Any Combination</h4>
                <p className="mt-1 text-xs text-slate-400">Display any combination of aggregates on the chart.</p>
              </div>
            </div>
            <p>
              The graph shows the month-by-month evolution. Lines represent each
              aggregate (cash, fixed assets, obligations) and their sum yields the
              total assets. This is an essential tool to anticipate periods of
              financial tension and plan investments.
            </p>
            <Callout variant="info" title="Chart Configuration">
              You can choose the display period, the aggregates to show, and the reference
              currency. The graph updates automatically when you modify your specification.
            </Callout>
          </Section>

          {/* ======== RECONCILE ======== */}
          <Section id="recouper-patrimoine" eyebrow="Step 3" title="Reconcile planning and reality">
            <p>
              <strong>Daily flows</strong> are the list of transactions that occurred
              from the specification date to the chosen end of projection.
            </p>
            <p>
              You must regularly track this list and update the specification based on
              which past operations actually occurred, and which operations never did.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Daily Flows</h4>
                <p className="mt-1 text-xs text-slate-400">List of planned operations to compare with reality.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Corrections</h4>
                <p className="mt-1 text-xs text-slate-400">Value adjustment via corrections in the Tracking section.</p>
              </div>
            </div>
            <h3>How to Reconcile in Practice</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-400">
              <li>Open your current case file (Planned folder).</li>
              <li>Consult the daily flows generated by the visualizer.</li>
              <li>For each discrepancy found, add a correction in the <code className="inline-code"># Tracking</code> section.</li>
              <li>Save the corrected version in the Actuals folder with today's date.</li>
              <li>Proceed to the next period.</li>
            </ol>
            <Callout variant="tip" title="ZFJA Policy">
              Aim for <strong>Zero Daily Flows until Today</strong>: update the specification
              to a fresh date that allows eliminating all listed daily flows. If ZFJA is achieved,
              your specification faithfully represents reality as of today.
            </Callout>
          </Section>

          {/* ======== ALERT ======== */}
          <Section id="alerter-patrimoine" eyebrow="Step 4" title="Alert on impossible flows">
            <p>
              <strong>Impossible flows</strong> occur when you try to move money from a source
              that does not contain enough of it.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Automatic Detection</h4>
                <p className="mt-1 text-xs text-slate-400">Identification of operations that would make an account balance go negative.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Planning</h4>
                <p className="mt-1 text-xs text-slate-400">Properly plan the evolution so that cash always covers operations.</p>
              </div>
            </div>
            <h3>How to Avoid Impossible Flows</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-400">
              <li>Consult the list of impossible flows in the visualizer.</li>
              <li>Identify the account and date of the issue.</li>
              <li>Add a transfer, an early income, or reduce an expense in your operations.</li>
              <li>Re-verify until no impossible flow remains.</li>
            </ol>
            <Callout variant="warning" title="ZFI Policy">
              Aim for <strong>Zero Impossible Flows</strong>: plan the evolution of your assets
              so that your cash can always cover your various operations. If ZFI is achieved,
              you should be able to perform all your operations.
            </Callout>
          </Section>

          {/* ======== SUPPORTED CURRENCIES ======== */}
          <Section id="devises" eyebrow="Reference" title="Supported Currencies">
            <p>
              Patrimoine supports several currencies with automatic conversion rates.
            </p>
            <div className="my-6 grid gap-6 sm:grid-cols-3">
              {[
                { symbole: 'Ar', nom: 'Ariary', code: 'MGA', valeur: '1 Ar (reference)', color: '#2dd4bf' },
                { symbole: '€', nom: 'Euro', code: 'EUR', valeur: '4,821 Ar', color: '#60a5fa' },
                { symbole: '$', nom: 'Canadian Dollar', code: 'CAD', valeur: '3,286 Ar', color: '#a78bfa' },
              ].map((d, i) => (
                <div key={d.code} className="card-float card-hover p-6" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: d.color }}>{d.symbole}</span>
                    <span className="text-lg font-semibold text-primary">{d.nom}</span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-400">
                    <div>ISO Code: {d.code}</div>
                    <div>Value in Ariary: {d.valeur}</div>
                  </div>
                </div>
              ))}
            </div>
            <Callout variant="info" title="Default Currency">
              The reference currency of Patrimoine is the Ariary (Ar), the currency of Madagascar.
              Conversions are automatic during projections.
            </Callout>
          </Section>

          {/* ======== TOUT CAS ======== */}
          <Section id="tout-cas" eyebrow="Advanced" title="Assembling Multiple Cases (ToutCas)">
            <p>
              You can combine several individual cases in a <code className="inline-code">.tout.md</code>
              file to simulate complex assets involving multiple people and accounts.
            </p>
            <CodeExample filename="Famille.tout.md" code={`# General
* Final objective 4884000Ar

# Cases
* PersonalAssets
* HouseRental

# Dates
* Dates:today: 10 of 01-2025
* Dates:endSimulation: 10 of 04-2025

# People
* Zety
* Lita
* Rasoa

# Cash & Treasury
* mainAccount, valued at 0Ar Dates:today
* secondaryAccount, valued at 0Ar Dates:today

# Receivables
* clientReceivable, valued at 0Ar Dates:today

# Debts
* bankDebt, valued at 0Ar Dates:today`} />
            <p>
              The <code className="inline-code">.tout.md</code> file serves as the entry point:
              it defines the common dates, lists the included cases, the people involved, and the
              accounts shared between cases.
            </p>

            <h3 className="mt-6 text-lg font-bold text-primary">The Three File Types</h3>
            <div className="my-4 grid gap-4 sm:grid-cols-3">
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.cas.md</span>
                <p className="mt-2 text-xs text-slate-400">An individual case describing a financial situation.</p>
              </div>
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.tout.md</span>
                <p className="mt-2 text-xs text-slate-400">Assembling multiple cases into a single asset model.</p>
              </div>
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.pj.md</span>
                <p className="mt-2 text-xs text-slate-400">Supporting documents associated with a case.</p>
              </div>
            </div>
          </Section>

          {/* ======== GLOSSARY ======== */}
          <Section id="glossaire" eyebrow="Reference" title="Glossary of Technical Terms">
            <div className="space-y-6">
              <div id="patrilang" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">PatriLang</h3>
                <p className="mt-2 text-sm text-slate-400">
                  The domain-specific language (DSL) of Patrimoine. It allows describing assets
                  declaratively in a text file without writing Java code. PatriLang files use
                  <code className="inline-code">.cas.md</code>, <code className="inline-code">.tout.md</code>,
                  and <code className="inline-code">.pj.md</code> extensions.
                </p>
              </div>

              <div id="tresorerie" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Cash & Treasury</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Immediately available money: checking accounts, savings, cash. It is the most liquid
                  asset aggregate.
                </p>
              </div>

              <div id="immobilisation" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Fixed Asset</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Tangible (house, car, land) or intangible (software, patent) goods that have economic
                  value but are not easily convertible into cash.
                </p>
              </div>

              <div id="obligation" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Obligation</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Groups together debts (what you owe) and receivables (what is owed to you).
                  Debts decrease your net worth, receivables increase it.
                </p>
              </div>

              <div id="dette" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Debt</h3>
                <p className="mt-2 text-sm text-slate-400">
                  A sum of money you owe someone (bank loan, credit, borrowing). It is a liability
                  that reduces your net worth.
                </p>
              </div>

              <div id="creance" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Receivable</h3>
                <p className="mt-2 text-sm text-slate-400">
                  A sum of money someone owes you (loan to a friend, unpaid invoice, due salary).
                  It is an asset that increases your net worth.
                </p>
              </div>

              <div id="zfja" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">ZFJA</h3>
                <p className="mt-2 text-sm text-slate-400">
                  <strong>Zero Daily Flows until Today.</strong> Policy consisting of regularly
                  updating your specification so that there is no pending daily flow. If ZFJA is achieved,
                  your specification faithfully represents reality as of today.
                </p>
              </div>

              <div id="zfi" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">ZFI</h3>
                <p className="mt-2 text-sm text-slate-400">
                  <strong>Zero Impossible Flows.</strong> Policy consisting of planning the evolution
                  of your assets so that cash can always cover all operations. If ZFI is achieved, you can
                  perform all operations without blocking.
                </p>
              </div>

              <div id="flux-journalier" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Daily Flow</h3>
                <p className="mt-2 text-sm text-slate-400">
                  The list of operations that took place from the specification date to the projection date.
                  By regularly tracking this list and updating your specification, you can achieve the ZFJA policy.
                </p>
              </div>

              <div id="flux-impossible" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-primary">Impossible Flow</h3>
                <p className="mt-2 text-sm text-slate-400">
                  An operation that would make an account balance go negative. For example, a withdrawal
                  of 500,000 Ar from an account that only has 100,000 Ar. The system automatically
                  detects these situations and generates an alert.
                </p>
              </div>
            </div>
          </Section>

          {/* Next steps */}
          <Reveal className="mt-12 mb-16">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/5 to-transparent p-8 text-center backdrop-blur-sm">
              <h3 className="text-xl font-bold text-primary">Ready to start?</h3>
              <p className="text-sm text-slate-400 max-w-lg">
                You now have all the keys to use Patrimoine. Create your first case file and get started!
              </p>
              <div className="flex gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white"
                >
                  Review Tools & Technologies
                </Link>
                <button
                  onClick={() => navigate('/auth')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
                >
                  View Source Code
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
