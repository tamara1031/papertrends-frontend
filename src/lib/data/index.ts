import { arxivCategories } from './arxiv-categories'

// Use arXiv categories as the main categories
export const categories = arxivCategories

export const generateMockData = () => ({
  stackAreaChart: {
    categories: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
    data: [
      { month: "2023-01", "Machine Learning": 45, "Deep Learning": 30, "Natural Language Processing": 25, "Computer Vision": 20 },
      { month: "2023-02", "Machine Learning": 50, "Deep Learning": 35, "Natural Language Processing": 28, "Computer Vision": 22 },
      { month: "2023-03", "Machine Learning": 55, "Deep Learning": 40, "Natural Language Processing": 32, "Computer Vision": 25 },
      { month: "2023-04", "Machine Learning": 60, "Deep Learning": 45, "Natural Language Processing": 35, "Computer Vision": 28 },
      { month: "2023-05", "Machine Learning": 65, "Deep Learning": 50, "Natural Language Processing": 38, "Computer Vision": 30 },
      { month: "2023-06", "Machine Learning": 70, "Deep Learning": 55, "Natural Language Processing": 42, "Computer Vision": 33 }
    ]
  },
  papers: {
    default: [
      {
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"],
        year: 2017,
        citations: 45000,
        category: "nlp",
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
      },
      {
        title: "BERT: Pre-training of Deep Bidirectional Transformers",
        authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
        year: 2018,
        citations: 38000,
        category: "nlp",
        abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers."
      },
      {
        title: "ResNet: Deep Residual Learning for Image Recognition",
        authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren"],
        year: 2016,
        citations: 42000,
        category: "cv",
        abstract: "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions."
      },
      {
        title: "Generative Adversarial Networks",
        authors: ["Ian Goodfellow", "Jean Pouget-Abadie", "Mehdi Mirza"],
        year: 2014,
        citations: 35000,
        category: "ai",
        abstract: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G."
      },
      {
        title: "AlphaGo: Mastering the Game of Go",
        authors: ["David Silver", "Aja Huang", "Chris Maddison"],
        year: 2016,
        citations: 28000,
        category: "ai",
        abstract: "The game of Go has long been viewed as the most challenging of classic games for artificial intelligence due to its enormous search space and the difficulty of evaluating board positions and moves."
      }
    ],
    "Machine Learning": [
      {
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"],
        year: 2017,
        citations: 45000,
        category: "nlp",
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
      },
      {
        title: "BERT: Pre-training of Deep Bidirectional Transformers",
        authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
        year: 2018,
        citations: 38000,
        category: "nlp",
        abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers."
      }
    ],
    "Computer Vision": [
      {
        title: "ResNet: Deep Residual Learning for Image Recognition",
        authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren"],
        year: 2016,
        citations: 42000,
        category: "cv",
        abstract: "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions."
      },
      {
        title: "Vision Transformer (ViT): An Image is Worth 16x16 Words",
        authors: ["Alexey Dosovitskiy", "Lucas Beyer", "Alexander Kolesnikov"],
        year: 2021,
        citations: 18000,
        category: "cv",
        abstract: "While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place."
      }
    ]
  }
})

export const generateBubbleChartData = () => ({
  topics: [
    {
      name: "Deep Learning",
      frequency: 120,
      color: "#3b82f6",
      words: [
        { name: "neural networks", size: 25, importance: 0.9, topic: "Deep Learning" },
        { name: "backpropagation", size: 20, importance: 0.8, topic: "Deep Learning" },
        { name: "gradient descent", size: 18, importance: 0.7, topic: "Deep Learning" },
        { name: "activation functions", size: 15, importance: 0.6, topic: "Deep Learning" },
        { name: "dropout", size: 12, importance: 0.5, topic: "Deep Learning" },
        { name: "batch normalization", size: 10, importance: 0.4, topic: "Deep Learning" }
      ]
    },
    {
      name: "Natural Language Processing",
      frequency: 95,
      color: "#10b981",
      words: [
        { name: "transformer", size: 22, importance: 0.9, topic: "Natural Language Processing" },
        { name: "attention mechanism", size: 20, importance: 0.8, topic: "Natural Language Processing" },
        { name: "BERT", size: 18, importance: 0.7, topic: "Natural Language Processing" },
        { name: "GPT", size: 16, importance: 0.6, topic: "Natural Language Processing" },
        { name: "tokenization", size: 14, importance: 0.5, topic: "Natural Language Processing" },
        { name: "word embeddings", size: 12, importance: 0.4, topic: "Natural Language Processing" }
      ]
    },
    {
      name: "Computer Vision",
      frequency: 80,
      color: "#f59e0b",
      words: [
        { name: "convolutional networks", size: 20, importance: 0.9, topic: "Computer Vision" },
        { name: "object detection", size: 18, importance: 0.8, topic: "Computer Vision" },
        { name: "image classification", size: 16, importance: 0.7, topic: "Computer Vision" },
        { name: "semantic segmentation", size: 14, importance: 0.6, topic: "Computer Vision" },
        { name: "feature extraction", size: 12, importance: 0.5, topic: "Computer Vision" },
        { name: "data augmentation", size: 10, importance: 0.4, topic: "Computer Vision" }
      ]
    },
    {
      name: "Reinforcement Learning",
      frequency: 65,
      color: "#ef4444",
      words: [
        { name: "Q-learning", size: 18, importance: 0.9, topic: "Reinforcement Learning" },
        { name: "policy gradient", size: 16, importance: 0.8, topic: "Reinforcement Learning" },
        { name: "actor-critic", size: 14, importance: 0.7, topic: "Reinforcement Learning" },
        { name: "exploration", size: 12, importance: 0.6, topic: "Reinforcement Learning" },
        { name: "reward function", size: 10, importance: 0.5, topic: "Reinforcement Learning" },
        { name: "environment", size: 8, importance: 0.4, topic: "Reinforcement Learning" }
      ]
    },
    {
      name: "Generative Models",
      frequency: 55,
      color: "#8b5cf6",
      words: [
        { name: "GAN", size: 16, importance: 0.9, topic: "Generative Models" },
        { name: "VAE", size: 14, importance: 0.8, topic: "Generative Models" },
        { name: "diffusion models", size: 12, importance: 0.7, topic: "Generative Models" },
        { name: "autoregressive", size: 10, importance: 0.6, topic: "Generative Models" },
        { name: "latent space", size: 8, importance: 0.5, topic: "Generative Models" },
        { name: "sampling", size: 6, importance: 0.4, topic: "Generative Models" }
      ]
    }
  ],
  correlations: [
    { source: "Deep Learning", target: "Natural Language Processing", strength: 0.8 },
    { source: "Deep Learning", target: "Computer Vision", strength: 0.9 },
    { source: "Deep Learning", target: "Reinforcement Learning", strength: 0.6 },
    { source: "Deep Learning", target: "Generative Models", strength: 0.7 },
    { source: "Natural Language Processing", target: "Computer Vision", strength: 0.4 },
    { source: "Natural Language Processing", target: "Generative Models", strength: 0.8 },
    { source: "Computer Vision", target: "Generative Models", strength: 0.6 },
    { source: "Reinforcement Learning", target: "Generative Models", strength: 0.3 }
  ]
})
