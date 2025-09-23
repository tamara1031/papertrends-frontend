import type { Category } from '../types';

export const arxivCategories: Category[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    emoji: '💻',
    subcategoryGroups: [
      {
        id: 'ai',
        name: 'Artificial Intelligence',
        emoji: '🤖',
        subcategories: [
          { id: 'cs.AI', name: 'Artificial Intelligence', emoji: '🧠' },
          { id: 'cs.CC', name: 'Computational Complexity', emoji: '⚡' },
          { id: 'cs.CL', name: 'Computation and Language', emoji: '🗣️' },
          { id: 'cs.CV', name: 'Computer Vision', emoji: '👁️' },
          { id: 'cs.LG', name: 'Machine Learning', emoji: '📊' },
          { id: 'cs.NE', name: 'Neural and Evolutionary Computing', emoji: '🧬' },
          { id: 'cs.RO', name: 'Robotics', emoji: '🤖' },
        ]
      },
      {
        id: 'systems',
        name: 'Computer Systems',
        emoji: '⚙️',
        subcategories: [
          { id: 'cs.AR', name: 'Hardware Architecture', emoji: '🔧' },
          { id: 'cs.DC', name: 'Distributed Computing', emoji: '🌐' },
          { id: 'cs.NI', name: 'Networking and Internet Architecture', emoji: '🌍' },
          { id: 'cs.OS', name: 'Operating Systems', emoji: '💾' },
          { id: 'cs.PF', name: 'Performance', emoji: '📈' },
        ]
      },
      {
        id: 'theory',
        name: 'Theory',
        emoji: '📐',
        subcategories: [
          { id: 'cs.DS', name: 'Data Structures and Algorithms', emoji: '📊' },
          { id: 'cs.GT', name: 'Computer Science and Game Theory', emoji: '🎮' },
          { id: 'cs.IT', name: 'Information Theory', emoji: '📡' },
          { id: 'cs.LO', name: 'Logic in Computer Science', emoji: '🔍' },
          { id: 'cs.SC', name: 'Symbolic Computation', emoji: '🔢' },
        ]
      },
      {
        id: 'applications',
        name: 'Applications',
        emoji: '🚀',
        subcategories: [
          { id: 'cs.CE', name: 'Computational Engineering', emoji: '🏗️' },
          { id: 'cs.CY', name: 'Cryptography and Security', emoji: '🔐' },
          { id: 'cs.DB', name: 'Databases', emoji: '🗄️' },
          { id: 'cs.GL', name: 'General Literature', emoji: '📚' },
          { id: 'cs.GR', name: 'Graphics', emoji: '🎨' },
          { id: 'cs.HC', name: 'Human-Computer Interaction', emoji: '👥' },
          { id: 'cs.IR', name: 'Information Retrieval', emoji: '🔍' },
          { id: 'cs.MM', name: 'Multimedia', emoji: '🎬' },
          { id: 'cs.SE', name: 'Software Engineering', emoji: '⚙️' },
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    subcategoryGroups: [
      {
        id: 'algebra',
        name: 'Algebra',
        emoji: '🔢',
        subcategories: [
          { id: 'math.AG', name: 'Algebraic Geometry', emoji: '🌐' },
          { id: 'math.AT', name: 'Algebraic Topology', emoji: '🔗' },
          { id: 'math.RA', name: 'Rings and Algebras', emoji: '💍' },
          { id: 'math.RT', name: 'Representation Theory', emoji: '🎭' },
        ]
      },
      {
        id: 'analysis',
        name: 'Analysis',
        emoji: '📊',
        subcategories: [
          { id: 'math.AP', name: 'Analysis of PDEs', emoji: '🌊' },
          { id: 'math.CA', name: 'Classical Analysis', emoji: '📈' },
          { id: 'math.FA', name: 'Functional Analysis', emoji: '⚡' },
          { id: 'math.NA', name: 'Numerical Analysis', emoji: '🔢' },
        ]
      },
      {
        id: 'discrete',
        name: 'Discrete Mathematics',
        emoji: '🔢',
        subcategories: [
          { id: 'math.CO', name: 'Combinatorics', emoji: '🎲' },
          { id: 'math.GT', name: 'Geometric Topology', emoji: '🌍' },
          { id: 'math.NT', name: 'Number Theory', emoji: '🔢' },
        ]
      },
      {
        id: 'statistics',
        name: 'Statistics',
        emoji: '📊',
        subcategories: [
          { id: 'math.ST', name: 'Statistics Theory', emoji: '📈' },
          { id: 'math.PR', name: 'Probability', emoji: '🎯' },
        ]
      }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    emoji: '⚛️',
    subcategoryGroups: [
      {
        id: 'quantum',
        name: 'Quantum Physics',
        emoji: '⚛️',
        subcategories: [
          { id: 'quant-ph', name: 'Quantum Physics', emoji: '⚛️' },
          { id: 'cond-mat.quant-gas', name: 'Quantum Gases', emoji: '💨' },
        ]
      },
      {
        id: 'condensed',
        name: 'Condensed Matter',
        emoji: '🔬',
        subcategories: [
          { id: 'cond-mat', name: 'Condensed Matter', emoji: '🔬' },
          { id: 'cond-mat.mtrl-sci', name: 'Materials Science', emoji: '🧱' },
          { id: 'cond-mat.supr-con', name: 'Superconductivity', emoji: '❄️' },
        ]
      },
      {
        id: 'particles',
        name: 'Particle Physics',
        emoji: '⚡',
        subcategories: [
          { id: 'hep-ph', name: 'High Energy Physics - Phenomenology', emoji: '💥' },
          { id: 'hep-lat', name: 'High Energy Physics - Lattice', emoji: '🔲' },
          { id: 'hep-th', name: 'High Energy Physics - Theory', emoji: '📐' },
        ]
      },
      {
        id: 'astrophysics',
        name: 'Astrophysics',
        emoji: '🌌',
        subcategories: [
          { id: 'astro-ph', name: 'Astrophysics', emoji: '🌌' },
          { id: 'astro-ph.CO', name: 'Cosmology', emoji: '🌍' },
          { id: 'astro-ph.EP', name: 'Earth and Planetary Astrophysics', emoji: '🪐' },
        ]
      }
    ]
  },
  {
    id: 'bio',
    name: 'Biology',
    emoji: '🧬',
    subcategoryGroups: [
      {
        id: 'molecular',
        name: 'Molecular Biology',
        emoji: '🧬',
        subcategories: [
          { id: 'q-bio.BM', name: 'Biomolecules', emoji: '🧬' },
          { id: 'q-bio.CB', name: 'Cell Behavior', emoji: '🔬' },
          { id: 'q-bio.GN', name: 'Genomics', emoji: '🧬' },
        ]
      },
      {
        id: 'evolution',
        name: 'Evolution',
        emoji: '🦕',
        subcategories: [
          { id: 'q-bio.PE', name: 'Populations and Evolution', emoji: '🦕' },
          { id: 'q-bio.QM', name: 'Quantitative Methods', emoji: '📊' },
        ]
      }
    ]
  },
  {
    id: 'econ',
    name: 'Economics',
    emoji: '💰',
    subcategoryGroups: [
      {
        id: 'micro',
        name: 'Microeconomics',
        emoji: '🏪',
        subcategories: [
          { id: 'econ.TH', name: 'Theoretical Economics', emoji: '📊' },
          { id: 'econ.GN', name: 'General Economics', emoji: '🌍' },
        ]
      },
      {
        id: 'macro',
        name: 'Macroeconomics',
        emoji: '🏦',
        subcategories: [
          { id: 'econ.EM', name: 'Econometrics', emoji: '📈' },
          { id: 'econ.FL', name: 'Financial Economics', emoji: '💹' },
        ]
      }
    ]
  },
  {
    id: 'stat',
    name: 'Statistics',
    emoji: '📊',
    subcategoryGroups: [
      {
        id: 'theory',
        name: 'Statistical Theory',
        emoji: '📐',
        subcategories: [
          { id: 'stat.TH', name: 'Statistics Theory', emoji: '📐' },
          { id: 'stat.ME', name: 'Methodology', emoji: '🔧' },
        ]
      },
      {
        id: 'applications',
        name: 'Applications',
        emoji: '🚀',
        subcategories: [
          { id: 'stat.AP', name: 'Applications', emoji: '🚀' },
          { id: 'stat.CO', name: 'Computation', emoji: '💻' },
          { id: 'stat.ML', name: 'Machine Learning', emoji: '🤖' },
        ]
      }
    ]
  },
  {
    id: 'eng',
    name: 'Engineering',
    emoji: '⚙️',
    subcategoryGroups: [
      {
        id: 'electrical',
        name: 'Electrical Engineering',
        emoji: '⚡',
        subcategories: [
          { id: 'eess.AS', name: 'Audio and Speech Processing', emoji: '🎵' },
          { id: 'eess.IV', name: 'Image and Video Processing', emoji: '📹' },
          { id: 'eess.SP', name: 'Signal Processing', emoji: '📡' },
        ]
      },
      {
        id: 'systems',
        name: 'Systems Engineering',
        emoji: '🔧',
        subcategories: [
          { id: 'eess.SY', name: 'Systems and Control', emoji: '🎛️' },
        ]
      }
    ]
  }
];

export const topicModelingInfo = {
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  description: 'Topic modeling data for arXiv categories',
  categories: arxivCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    subcategories: cat.subcategoryGroups.flatMap(group => group.subcategories)
  }))
};
