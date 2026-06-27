// Single source of truth for content + the metrics that drive the 3D skyline.

export type Project = {
  id: string
  name: string
  district: string
  tagline: string
  blurb: string
  metricLabel: string
  metricValue: string
  intensity: number // 0..1 — relative landmark height
  stack: string[]
  repo: string
  color: string
}

export const PROJECTS: Project[] = [
  {
    id: 'churn',
    name: 'churn-prediction-pipeline',
    district: 'RETENTION DISTRICT',
    tagline: 'Point-in-time churn modeling, done honestly.',
    blurb:
      'Leakage-safe feature engineering with out-of-time validation, a calibrated LightGBM model, and SHAP reason codes. Honest headline: ROC-AUC 0.88 with 3.5× top-decile lift.',
    metricLabel: 'OUT-OF-TIME ROC-AUC',
    metricValue: '0.88',
    intensity: 0.88,
    stack: ['LightGBM', 'scikit-learn', 'SHAP'],
    repo: 'https://github.com/ducal7/churn-prediction-pipeline',
    color: '#22d3ee',
  },
  {
    id: 'abtest',
    name: 'ab-test-toolkit',
    district: 'EXPERIMENT DISTRICT',
    tagline: 'Rigorous A/B testing with variance reduction.',
    blurb:
      'Power & sample-size, frequentist tests with CIs, CUPED variance reduction (~38% tighter), and the peeking / multiple-comparisons pitfalls made explicit.',
    metricLabel: 'CUPED VARIANCE CUT',
    metricValue: '−38%',
    intensity: 0.74,
    stack: ['scipy', 'statsmodels', 'pandas'],
    repo: 'https://github.com/ducal7/ab-test-toolkit',
    color: '#a855f7',
  },
  {
    id: 'ledger',
    name: 'ledger-reconciliation',
    district: 'LEDGER DISTRICT',
    tagline: 'Double-entry reconciliation for fintech.',
    blurb:
      'Validates accounting invariants, reconciles internal ledgers vs external feeds with DuckDB, and emits an audit report classifying every break — $26K at-risk surfaced on synthetic data.',
    metricLabel: 'AT-RISK SURFACED',
    metricValue: '$26K',
    intensity: 0.66,
    stack: ['pandas', 'DuckDB', 'pydantic'],
    repo: 'https://github.com/ducal7/ledger-reconciliation',
    color: '#34d399',
  },
  {
    id: 'economy',
    name: 'game-economy-analytics',
    district: 'WAREHOUSE DISTRICT',
    tagline: 'A warehouse + dashboard from raw events.',
    blurb:
      'dbt-core on DuckDB (staging → marts) for cohorts, funnels, retention and economy KPIs, with a Streamlit dashboard. 66 dbt models & tests pass green.',
    metricLabel: 'DBT MODELS + TESTS',
    metricValue: '66',
    intensity: 0.95,
    stack: ['DuckDB', 'dbt', 'Streamlit'],
    repo: 'https://github.com/ducal7/game-economy-analytics',
    color: '#f59e0b',
  },
  {
    id: 'matchmaking',
    name: 'matchmaking-engine',
    district: 'ARENA DISTRICT',
    tagline: 'Skill-based matchmaking, simulated.',
    blurb:
      'Elo & Glicko-2 rating systems, a quality-vs-wait queue matcher, and a SimPy discrete-event simulation. Glicko-2 converges ~3× closer to true skill.',
    metricLabel: 'CONVERGENCE GAIN',
    metricValue: '3×',
    intensity: 0.8,
    stack: ['NumPy', 'SimPy', 'pandas'],
    repo: 'https://github.com/ducal7/matchmaking-engine',
    color: '#fb7185',
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  context: string
  color: string
  points: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'Jumbo · Zumbo Pvt. Ltd.',
    role: 'Data Analyst',
    period: 'Nov 2025 — Present',
    context: 'Real-money gaming & fintech',
    color: '#22d3ee',
    points: [
      'Set up and own the analytical data stack from scratch — provisioned a BigQuery warehouse and ClickHouse analytics database with Datastream CDC ingestion, partitioned/clustered modeling and Airflow-orchestrated OLAP pipelines — while leading a 3-person data team and enabling company-wide BI.',
      'Engineered a real-time financial reconciliation system over double-entry ledgers, auditing millions of transactions end-to-end — recovering ₹1.5 Cr in excess credits and surfacing ₹590K in stuck settlements.',
      'Designed a leak-free, point-in-time churn-prediction system (LightGBM, 3 calibrated heads) with SHAP reason codes and out-of-time validation, deployed on Cloud Run + Scheduler to score active users daily.',
      'Root-caused a production Datastream (Aurora PostgreSQL → BigQuery) CDC stall to a stuck logical-replication slot, restoring streaming with zero data loss and no backfill, and authored the incident runbook.',
      'Built self-serve dashboards (Metabase/Looker) and the daily economy/finance KPI engine over ClickHouse — cohort, funnel and event-cohort analyses that surfaced economy KPI gaps against target margins.',
      'Shipped a fraud/risk model to block fraudulent transactions and ran a dormant-user reactivation program in 12 days contributing ~2% of monthly revenue.',
    ],
  },
  {
    company: 'Rein Games Pvt. Ltd.',
    role: 'Product Analyst',
    period: 'Aug 2024 — Sep 2025',
    context: 'Mobile gaming',
    color: '#a855f7',
    points: [
      'Segmented 1M+ players into value tiers on a CSTS framework, prioritizing high-value cohorts and lifting targeted-campaign conversion by ~15%.',
      'Tracked retention, churn, ARPU and DAU/MAU via automated dashboards, surfacing funnel drop-off points that improved D7 retention by ~8%.',
      'Ran A/B tests on gameplay mechanics and promotions, increasing payer conversion by ~12% and ARPU by ~9%.',
      'Drove churn-reduction and re-engagement initiatives on at-risk cohorts, cutting 30-day churn by ~10%.',
    ],
  },
  {
    company: 'Bennett Coleman & Co. · The Times of India',
    role: 'Data Analyst Intern',
    period: 'Jul 2023 — Dec 2023',
    context: 'Media & publishing',
    color: '#34d399',
    points: [],
  },
]

export const IMPACT = [
  { value: '₹1.5 Cr', label: 'Excess credits recovered via reconciliation' },
  { value: '₹590K', label: 'Stuck settlements surfaced' },
  { value: '1M+', label: 'Players segmented into value tiers' },
  { value: '~2%', label: 'Monthly revenue from a 12-day reactivation push' },
  { value: '3', label: 'Person data team led' },
  { value: 'Zero', label: 'Data loss on a production CDC incident recovery' },
  { value: '+12%', label: 'Payer conversion lifted via A/B testing' },
  { value: '2+ yrs', label: 'Owning production analytics end-to-end' },
]

export const SKILL_CATEGORIES = [
  { title: 'Languages', items: ['Python', 'SQL'] },
  {
    title: 'Data & Warehousing',
    items: ['BigQuery', 'ClickHouse', 'Aurora / PostgreSQL', 'Firebase RTDB', 'Dimensional modeling', 'Partitioning & clustering', 'Data reconciliation'],
  },
  {
    title: 'Pipelines & Cloud',
    items: ['ETL / ELT', 'Airflow', 'Datastream (CDC)', 'Cloud Run', 'Cloud Scheduler', 'GCP', 'AWS', 'Apps Script', 'Git / GitHub'],
  },
  {
    title: 'Analytics & ML',
    items: ['LightGBM', 'scikit-learn', 'Pandas', 'NumPy', 'SHAP', 'A/B testing', 'Cohort & funnel', 'Churn & LTV', 'Segmentation'],
  },
  {
    title: 'BI & Tools',
    items: ['Metabase', 'Looker', 'Tableau', 'Power BI', 'Excel', 'Google Analytics', 'MoEngage', 'CleverTap', 'JIRA'],
  },
]

// nodes for the 3D constellation
export const SKILLS = [
  'Python', 'SQL', 'BigQuery', 'ClickHouse', 'dbt', 'Airflow', 'LightGBM',
  'scikit-learn', 'SHAP', 'DuckDB', 'Pandas', 'NumPy', 'A/B Testing',
  'GCP', 'Datastream', 'Streamlit', 'Metabase', 'Looker', 'Cloud Run', 'Tableau',
]

export const PRODUCT_GROUPS = [
  { title: 'FANTASY SPORTS', sub: 'Skill contests', items: ['Cricket', 'Kabaddi', 'Football'] },
  {
    title: 'GAMES',
    sub: 'Real-money & casual',
    items: ['Ludo', 'Level-Up', 'Aviator', 'Mines', 'Knife Hit', 'Jackpot', 'Opinion Trading'],
  },
  {
    title: 'COMMERCE & PAYMENTS',
    sub: 'Integration E2E',
    items: ['Shop / Order E2E', 'Razorpay', 'Cashfree', 'Slice', 'JioPay', 'PhonePe', 'Paytm'],
  },
]

// Standard, publicly-derivable Mines expected-value math (no proprietary params).
export const GAME_ECON = {
  title: 'MINES · EXPECTED VALUE',
  intro:
    'A worked example of the game-economics I model day to day: deriving the fair multiplier, applying a target RTP, and reading the player EV for a Mines round. Parameters here are illustrative — house tuning is intentionally omitted.',
  symbols: [
    ['N', 'tiles on the grid (e.g. 25)'],
    ['M', 'mines hidden among them'],
    ['k', 'safe tiles the player reveals'],
    ['RTP', 'return-to-player (1 − house edge)'],
  ],
  lines: [
    { label: 'Survive k picks', expr: 'P(k) = Π_{i=0}^{k−1} (N − M − i) / (N − i)' },
    { label: 'Fair multiplier', expr: 'm_fair(k) = 1 / P(k)' },
    { label: 'Paid multiplier', expr: 'm(k) = RTP · m_fair(k) = RTP / P(k)' },
    { label: 'Player EV (cash out at k)', expr: 'EV = P(k) · m(k) − 1 = RTP − 1  ⟹  house edge = 1 − RTP' },
  ],
  note:
    'Key insight: cash-out timing does not change EV — every additional pick multiplies the prize by exactly its inverse survival probability, so the house edge is fixed at 1 − RTP regardless of strategy. Operators tune RTP and the mine count to hit a target margin.',
}

export const EDUCATION = {
  school: 'Bennett University',
  degree: 'B.Tech in Computer Science · Specialization in AI / ML',
  period: 'Graduated May 2025',
  coursework:
    'Probability & Statistics in CS (Python), Linear Algebra with Computational Applications (Python), Intelligent Model Design & Thinking.',
}

export const POSITIONS = [
  'Head of Clubs & Chapters — Student Cabinet (2022–23)',
  'VP Finance — NSS (2022–23)',
]

// Role-agnostic capabilities — what I actually do, in depth. Written to read for
// analytics, product, and data-engineering hiring alike.
export type Capability = {
  title: string
  summary: string
  detail: string[]
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Product & Growth Analytics',
    summary: 'Turn raw events into the decisions that move retention, conversion, and revenue.',
    detail: [
      'Funnels, cohorts, retention curves, DAU/MAU, ARPU and LTV',
      'User segmentation and value-tiering to target the right cohorts',
      'Decision-ready readouts that product and leadership can act on',
    ],
  },
  {
    title: 'Experimentation',
    summary: 'Design and read A/B tests that hold up to scrutiny — not vanity wins.',
    detail: [
      'Power & sample-size, frequentist tests with confidence intervals',
      'CUPED variance reduction; peeking & multiple-comparison guardrails',
      'Causal framing so a "lift" actually means a lift',
    ],
  },
  {
    title: 'Data Engineering',
    summary: 'Build the production stack that makes analytics fast, trusted, and self-serve.',
    detail: [
      'Warehouses from scratch — BigQuery + ClickHouse, partitioned & clustered',
      'CDC ingestion (Datastream), dbt modeling (staging → marts), Airflow orchestration',
      'Cost- and performance-aware modeling for OLAP at scale',
    ],
  },
  {
    title: 'Machine Learning',
    summary: 'Ship models that are honest about leakage, calibration, and real-world lift.',
    detail: [
      'Churn, LTV and fraud/risk models (LightGBM, scikit-learn)',
      'Point-in-time features, out-of-time validation, probability calibration',
      'SHAP reason codes and deployment on Cloud Run + Scheduler',
    ],
  },
  {
    title: 'BI & Self-serve',
    summary: 'Give every team a dashboard they trust instead of a query queue.',
    detail: [
      'Metabase, Looker, Tableau, Power BI dashboards and KPI engines',
      'Automated daily reporting over ClickHouse and BigQuery',
      'Metric definitions and semantics that stay consistent across teams',
    ],
  },
  {
    title: 'Reliability & Ownership',
    summary: 'Treat data as a product: monitored, reconciled, and recoverable.',
    detail: [
      'Data-quality checks, reconciliation, and audit reporting',
      'Incident response — root-cause, recover with zero data loss, write the runbook',
      'Own the stack end-to-end and lead the people who run it',
    ],
  },
]

export const PROFILE = {
  name: 'Aditya Singh Rathore',
  role: 'Data Analyst · Data Engineer',
  location: 'Delhi, India',
  tagline: 'I turn raw events into decisions, products, and growth.',
  summary:
    'Data & analytics professional with 2+ years building and owning production analytics across real-money gaming and fintech. I set up data stacks from scratch (BigQuery + ClickHouse) and lead a small data team, pairing SQL + Python to ship ML models, experiments, dashboards, and reliable pipelines — translating raw events into the decisions, product changes, and growth that move a business, from product analytics to data engineering end-to-end.',
  email: 'adityasinh0707@gmail.com',
  phone: '+91 82090 11398',
  github: 'https://github.com/ducal7',
  linkedin: 'https://linkedin.com/in/ducal7',
}
