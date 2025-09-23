import { Category } from '../types'

// arXiv categories grouped by major domains based on official arXiv taxonomy
export const arxivCategories: Category[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    emoji: 'fas fa-laptop-code',
    subcategoryGroups: [
      {
        id: 'ai-machine-learning',
        name: 'AI & Machine Learning',
        emoji: 'fas fa-brain',
        subcategories: [
          { id: 'cs.AI', name: 'Artificial Intelligence', emoji: 'fas fa-robot' },
          { id: 'cs.LG', name: 'Machine Learning', emoji: 'fas fa-brain' },
          { id: 'cs.CV', name: 'Computer Vision and Pattern Recognition', emoji: 'fas fa-eye' },
          { id: 'cs.CL', name: 'Computation and Language', emoji: 'fas fa-comments' },
          { id: 'cs.NE', name: 'Neural and Evolutionary Computing', emoji: 'fas fa-project-diagram' },
          { id: 'cs.MA', name: 'Multiagent Systems', emoji: 'fas fa-users' },
        ]
      },
      {
        id: 'core-computer-science',
        name: 'Core Computer Science',
        emoji: 'fas fa-cogs',
        subcategories: [
          { id: 'cs.CC', name: 'Computational Complexity', emoji: 'fas fa-calculator' },
          { id: 'cs.DS', name: 'Data Structures and Algorithms', emoji: 'fas fa-sitemap' },
          { id: 'cs.DB', name: 'Databases', emoji: 'fas fa-database' },
          { id: 'cs.DC', name: 'Distributed, Parallel, and Cluster Computing', emoji: 'fas fa-network-wired' },
          { id: 'cs.OS', name: 'Operating Systems', emoji: 'fas fa-cogs' },
          { id: 'cs.PL', name: 'Programming Languages', emoji: 'fas fa-code' },
          { id: 'cs.SE', name: 'Software Engineering', emoji: 'fas fa-tools' },
          { id: 'cs.LO', name: 'Logic in Computer Science', emoji: 'fas fa-brain' },
        ]
      },
      {
        id: 'applications-systems',
        name: 'Applications and Systems',
        emoji: 'fas fa-desktop',
        subcategories: [
          { id: 'cs.HC', name: 'Human-Computer Interaction', emoji: 'fas fa-mouse-pointer' },
          { id: 'cs.IR', name: 'Information Retrieval', emoji: 'fas fa-search' },
          { id: 'cs.MM', name: 'Multimedia', emoji: 'fas fa-video' },
          { id: 'cs.GR', name: 'Graphics', emoji: 'fas fa-paint-brush' },
          { id: 'cs.CR', name: 'Cryptography and Security', emoji: 'fas fa-shield-alt' },
          { id: 'cs.NI', name: 'Networking and Internet Architecture', emoji: 'fas fa-wifi' },
          { id: 'cs.AR', name: 'Hardware Architecture', emoji: 'fas fa-microchip' },
          { id: 'cs.ET', name: 'Emerging Technologies', emoji: 'fas fa-rocket' },
        ]
      },
      {
        id: 'specialized-areas',
        name: 'Specialized Areas',
        emoji: 'fas fa-puzzle-piece',
        subcategories: [
          { id: 'cs.CG', name: 'Computational Geometry', emoji: 'fas fa-shapes' },
          { id: 'cs.CE', name: 'Computational Engineering, Finance, and Science', emoji: 'fas fa-chart-line' },
          { id: 'cs.CY', name: 'Computers and Society', emoji: 'fas fa-globe' },
          { id: 'cs.DL', name: 'Digital Libraries', emoji: 'fas fa-book' },
          { id: 'cs.DM', name: 'Discrete Mathematics', emoji: 'fas fa-puzzle-piece' },
          { id: 'cs.FL', name: 'Formal Languages and Automata Theory', emoji: 'fas fa-language' },
          { id: 'cs.GT', name: 'Computer Science and Game Theory', emoji: 'fas fa-chess' },
          { id: 'cs.IT', name: 'Information Theory', emoji: 'fas fa-info-circle' },
          { id: 'cs.MS', name: 'Mathematical Software', emoji: 'fas fa-calculator' },
          { id: 'cs.NA', name: 'Numerical Analysis', emoji: 'fas fa-chart-bar' },
          { id: 'cs.GL', name: 'General Literature', emoji: 'fas fa-book' },
        ]
      }
    ]
  },
  {
    id: 'econ',
    name: 'Economics',
    emoji: 'fas fa-coins',
    subcategoryGroups: [
      {
        id: 'economics',
        name: 'Economics',
        emoji: 'fas fa-coins',
        subcategories: [
          { id: 'econ.EM', name: 'Econometrics', emoji: 'fas fa-chart-bar' },
          { id: 'econ.GN', name: 'General Economics', emoji: 'fas fa-coins' },
          { id: 'econ.TH', name: 'Theoretical Economics', emoji: 'fas fa-calculator' },
        ]
      }
    ]
  },
  {
    id: 'eess',
    name: 'Electrical Engineering and Systems Science',
    emoji: 'fas fa-microchip',
    subcategoryGroups: [
      {
        id: 'electrical-engineering',
        name: 'Electrical Engineering and Systems Science',
        emoji: 'fas fa-microchip',
        subcategories: [
          { id: 'eess.AS', name: 'Audio and Speech Processing', emoji: 'fas fa-volume-up' },
          { id: 'eess.IV', name: 'Image and Video Processing', emoji: 'fas fa-video' },
          { id: 'eess.SP', name: 'Signal Processing', emoji: 'fas fa-wave-square' },
          { id: 'eess.SY', name: 'Systems and Control', emoji: 'fas fa-sliders-h' },
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    emoji: 'fas fa-square-root-alt',
    subcategoryGroups: [
      {
        id: 'pure-mathematics',
        name: 'Pure Mathematics',
        emoji: 'fas fa-calculator',
        subcategories: [
          { id: 'math.AG', name: 'Algebraic Geometry', emoji: 'fas fa-shapes' },
          { id: 'math.AT', name: 'Algebraic Topology', emoji: 'fas fa-project-diagram' },
          { id: 'math.CO', name: 'Combinatorics', emoji: 'fas fa-puzzle-piece' },
          { id: 'math.NT', name: 'Number Theory', emoji: 'fas fa-sort-numeric-up' },
          { id: 'math.LO', name: 'Logic', emoji: 'fas fa-brain' },
          { id: 'math.GR', name: 'Group Theory', emoji: 'fas fa-layer-group' },
          { id: 'math.RT', name: 'Representation Theory', emoji: 'fas fa-cube' },
          { id: 'math.AC', name: 'Commutative Algebra', emoji: 'fas fa-calculator' },
          { id: 'math.RA', name: 'Rings and Algebras', emoji: 'fas fa-circle' },
          { id: 'math.KT', name: 'K-Theory and Homology', emoji: 'fas fa-project-diagram' },
        ]
      },
      {
        id: 'analysis-applied-math',
        name: 'Analysis and Applied Math',
        emoji: 'fas fa-chart-line',
        subcategories: [
          { id: 'math.AP', name: 'Analysis of PDEs', emoji: 'fas fa-chart-line' },
          { id: 'math.CA', name: 'Classical Analysis and ODEs', emoji: 'fas fa-calculator' },
          { id: 'math.NA', name: 'Numerical Analysis', emoji: 'fas fa-calculator' },
          { id: 'math.OC', name: 'Optimization and Control', emoji: 'fas fa-bullseye' },
          { id: 'math.PR', name: 'Probability', emoji: 'fas fa-dice' },
          { id: 'math.ST', name: 'Statistics Theory', emoji: 'fas fa-chart-bar' },
          { id: 'math.DS', name: 'Dynamical Systems', emoji: 'fas fa-random' },
          { id: 'math.FA', name: 'Functional Analysis', emoji: 'fas fa-chart-line' },
          { id: 'math.GM', name: 'General Mathematics', emoji: 'fas fa-calculator' },
          { id: 'math.HO', name: 'History and Overview', emoji: 'fas fa-book' },
          { id: 'math.MG', name: 'Metric Geometry', emoji: 'fas fa-ruler' },
          { id: 'math.MP', name: 'Mathematical Physics', emoji: 'fas fa-atom' },
          { id: 'math.QA', name: 'Quantum Algebra', emoji: 'fas fa-atom' },
          { id: 'math.SG', name: 'Symplectic Geometry', emoji: 'fas fa-shapes' },
        ]
      }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    emoji: 'fas fa-atom',
    subcategoryGroups: [
      {
        id: 'high-energy-physics',
        name: 'High Energy Physics',
        emoji: 'fas fa-bolt',
        subcategories: [
          { id: 'hep-th', name: 'High Energy Physics - Theory', emoji: 'fas fa-bolt' },
          { id: 'hep-ph', name: 'High Energy Physics - Phenomenology', emoji: 'fas fa-microscope' },
          { id: 'hep-ex', name: 'High Energy Physics - Experiment', emoji: 'fas fa-flask' },
          { id: 'hep-lat', name: 'High Energy Physics - Lattice', emoji: 'fas fa-th' },
        ]
      },
      {
        id: 'condensed-matter-physics',
        name: 'Condensed Matter Physics',
        emoji: 'fas fa-cube',
        subcategories: [
          { id: 'cond-mat.str-el', name: 'Condensed Matter - Strongly Correlated Electrons', emoji: 'fas fa-bolt' },
          { id: 'cond-mat.supr-con', name: 'Condensed Matter - Superconductivity', emoji: 'fas fa-snowflake' },
          { id: 'cond-mat.mtrl-sci', name: 'Condensed Matter - Materials Science', emoji: 'fas fa-gem' },
          { id: 'cond-mat.mes-hall', name: 'Condensed Matter - Mesoscopic Systems and Quantum Hall Effect', emoji: 'fas fa-wave-square' },
          { id: 'cond-mat.soft', name: 'Condensed Matter - Soft Condensed Matter', emoji: 'fas fa-tint' },
          { id: 'cond-mat.dis-nn', name: 'Condensed Matter - Disordered Systems and Neural Networks', emoji: 'fas fa-brain' },
          { id: 'cond-mat.stat-mech', name: 'Condensed Matter - Statistical Mechanics', emoji: 'fas fa-chart-bar' },
          { id: 'cond-mat.other', name: 'Condensed Matter - Other', emoji: 'fas fa-ellipsis-h' },
          { id: 'cond-mat.quant-gas', name: 'Condensed Matter - Quantum Gases', emoji: 'fas fa-atom' },
        ]
      },
      {
        id: 'general-physics',
        name: 'Physics',
        emoji: 'fas fa-atom',
        subcategories: [
          { id: 'physics.gen-ph', name: 'Physics - General Physics', emoji: 'fas fa-atom' },
          { id: 'physics.optics', name: 'Physics - Optics', emoji: 'fas fa-lightbulb' },
          { id: 'physics.plasm-ph', name: 'Physics - Plasma Physics', emoji: 'fas fa-fire' },
          { id: 'physics.comp-ph', name: 'Physics - Computational Physics', emoji: 'fas fa-laptop-code' },
          { id: 'physics.data-an', name: 'Physics - Data Analysis, Statistics and Probability', emoji: 'fas fa-chart-bar' },
          { id: 'physics.ed-ph', name: 'Physics - Education', emoji: 'fas fa-graduation-cap' },
          { id: 'physics.flu-dyn', name: 'Physics - Fluid Dynamics', emoji: 'fas fa-wind' },
          { id: 'physics.geo-ph', name: 'Physics - Geophysics', emoji: 'fas fa-globe' },
          { id: 'physics.hist-ph', name: 'Physics - History and Philosophy of Physics', emoji: 'fas fa-book' },
          { id: 'physics.ins-det', name: 'Physics - Instrumentation and Detectors', emoji: 'fas fa-microscope' },
          { id: 'physics.med-ph', name: 'Physics - Medical Physics', emoji: 'fas fa-heartbeat' },
          { id: 'physics.pop-ph', name: 'Physics - Popular Physics', emoji: 'fas fa-users' },
          { id: 'physics.soc-ph', name: 'Physics - Physics and Society', emoji: 'fas fa-globe' },
          { id: 'physics.space-ph', name: 'Physics - Space Physics', emoji: 'fas fa-rocket' },
        ]
      },
      {
        id: 'astrophysics-cosmology',
        name: 'Astrophysics and Cosmology',
        emoji: 'fas fa-star',
        subcategories: [
          { id: 'astro-ph.CO', name: 'Astrophysics - Cosmology and Nongalactic Astrophysics', emoji: 'fas fa-globe' },
          { id: 'astro-ph.EP', name: 'Astrophysics - Earth and Planetary Astrophysics', emoji: 'fas fa-globe' },
          { id: 'astro-ph.GA', name: 'Astrophysics - Astrophysics of Galaxies', emoji: 'fas fa-star' },
          { id: 'astro-ph.HE', name: 'Astrophysics - High Energy Astrophysical Phenomena', emoji: 'fas fa-bolt' },
          { id: 'astro-ph.IM', name: 'Astrophysics - Instrumentation and Methods for Astrophysics', emoji: 'fas fa-microscope' },
          { id: 'astro-ph.SR', name: 'Astrophysics - Solar and Stellar Astrophysics', emoji: 'fas fa-sun' },
          { id: 'gr-qc', name: 'General Relativity and Quantum Cosmology', emoji: 'fas fa-globe' },
          { id: 'math-ph', name: 'Mathematical Physics', emoji: 'fas fa-atom' },
          { id: 'quant-ph', name: 'Quantum Physics', emoji: 'fas fa-atom' },
        ]
      },
      {
        id: 'nonlinear-sciences',
        name: 'Nonlinear Sciences',
        emoji: 'fas fa-project-diagram',
        subcategories: [
          { id: 'nlin.CD', name: 'Nonlinear Sciences - Chaotic Dynamics', emoji: 'fas fa-bolt' },
          { id: 'nlin.AO', name: 'Nonlinear Sciences - Adaptation and Self-Organizing Systems', emoji: 'fas fa-brain' },
          { id: 'nlin.CG', name: 'Nonlinear Sciences - Cellular Automata and Lattice Gases', emoji: 'fas fa-th' },
          { id: 'nlin.SI', name: 'Nonlinear Sciences - Exactly Solvable and Integrable Systems', emoji: 'fas fa-calculator' },
          { id: 'nlin.PS', name: 'Nonlinear Sciences - Pattern Formation and Solitons', emoji: 'fas fa-shapes' },
        ]
      },
      {
        id: 'nuclear-physics',
        name: 'Nuclear Physics',
        emoji: 'fas fa-flask',
        subcategories: [
          { id: 'nucl-ex', name: 'Nuclear Physics - Nuclear Experiment', emoji: 'fas fa-flask' },
          { id: 'nucl-th', name: 'Nuclear Physics - Nuclear Theory', emoji: 'fas fa-bolt' },
        ]
      }
    ]
  },
  {
    id: 'q-bio',
    name: 'Quantitative Biology',
    emoji: 'fas fa-dna',
    subcategoryGroups: [
      {
        id: 'quantitative-biology',
        name: 'Quantitative Biology',
        emoji: 'fas fa-dna',
        subcategories: [
          { id: 'q-bio.BM', name: 'Biomolecules', emoji: 'fas fa-microscope' },
          { id: 'q-bio.CB', name: 'Cell Behavior', emoji: 'fas fa-microscope' },
          { id: 'q-bio.GN', name: 'Genomics', emoji: 'fas fa-dna' },
          { id: 'q-bio.MN', name: 'Molecular Networks', emoji: 'fas fa-project-diagram' },
          { id: 'q-bio.NC', name: 'Neurons and Cognition', emoji: 'fas fa-brain' },
          { id: 'q-bio.OT', name: 'Other Quantitative Biology', emoji: 'fas fa-ellipsis-h' },
          { id: 'q-bio.PE', name: 'Populations and Evolution', emoji: 'fas fa-seedling' },
          { id: 'q-bio.QM', name: 'Quantitative Methods', emoji: 'fas fa-tools' },
          { id: 'q-bio.SC', name: 'Subcellular Processes', emoji: 'fas fa-atom' },
          { id: 'q-bio.TO', name: 'Tissues and Organs', emoji: 'fas fa-heart' },
        ]
      }
    ]
  },
  {
    id: 'q-fin',
    name: 'Quantitative Finance',
    emoji: 'fas fa-chart-line',
    subcategoryGroups: [
      {
        id: 'quantitative-finance',
        name: 'Quantitative Finance',
        emoji: 'fas fa-chart-line',
        subcategories: [
          { id: 'q-fin.CP', name: 'Computational Finance', emoji: 'fas fa-laptop-code' },
          { id: 'q-fin.EC', name: 'Economics', emoji: 'fas fa-coins' },
          { id: 'q-fin.GN', name: 'General Finance', emoji: 'fas fa-chart-line' },
          { id: 'q-fin.MF', name: 'Mathematical Finance', emoji: 'fas fa-calculator' },
          { id: 'q-fin.PM', name: 'Portfolio Management', emoji: 'fas fa-briefcase' },
          { id: 'q-fin.PR', name: 'Pricing of Securities', emoji: 'fas fa-dollar-sign' },
          { id: 'q-fin.RM', name: 'Risk Management', emoji: 'fas fa-shield-alt' },
          { id: 'q-fin.ST', name: 'Statistical Finance', emoji: 'fas fa-chart-bar' },
          { id: 'q-fin.TR', name: 'Trading and Market Microstructure', emoji: 'fas fa-exchange-alt' },
        ]
      }
    ]
  },
  {
    id: 'stat',
    name: 'Statistics',
    emoji: 'fas fa-chart-pie',
    subcategoryGroups: [
      {
        id: 'statistics',
        name: 'Statistics',
        emoji: 'fas fa-chart-pie',
        subcategories: [
          { id: 'stat.AP', name: 'Applications', emoji: 'fas fa-tasks' },
          { id: 'stat.CO', name: 'Computation', emoji: 'fas fa-laptop-code' },
          { id: 'stat.ME', name: 'Methodology', emoji: 'fas fa-tools' },
          { id: 'stat.ML', name: 'Machine Learning', emoji: 'fas fa-brain' },
          { id: 'stat.OT', name: 'Other Statistics', emoji: 'fas fa-ellipsis-h' },
          { id: 'stat.TH', name: 'Statistics Theory', emoji: 'fas fa-calculator' },
        ]
      }
    ]
  }
]

// Topic modeling related information
export const topicModelingInfo = {
  title: "Topic Modeling Technology",
  description: "PaperTrends uses BERTopic for advanced topic modeling and SPECTER for semantic embeddings",
  techniques: [
    {
      name: "BERTopic",
      description: "State-of-the-art topic modeling using transformer-based embeddings and clustering",
      icon: "fas fa-brain"
    },
    {
      name: "SPECTER",
      description: "Semantic embeddings for scientific papers using citation-based supervision",
      icon: "fas fa-microscope"
    }
  ],
  benefits: [
    "Automatic discovery of research themes",
    "Identification of emerging topics",
    "Semantic understanding of paper content",
    "Citation-based paper similarity",
    "Research gap identification"
  ]
}
