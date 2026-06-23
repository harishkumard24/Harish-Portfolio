/* Central portfolio content for the redesigned premium portfolio. */
import { BrainCircuit, BriefcaseBusiness, Github, Linkedin, Mail, Rocket, ShieldCheck, Sparkles, Database } from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Exp", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" }
] as const;

export const heroStats = [
  { value: "2M+", label: "records processed per run" },
  { value: "30%", label: "pricing inconsistencies reduced" },
  { value: "40%", label: "faster issue resolution" },
  { value: "3+", label: "research papers under review / published" }
] as const;

export const highlights = [
  "Backend systems that stay calm under production pressure",
  "AI workflows with measurable evaluation",
  "Clean interfaces and reliable execution",
  "Cross-functional collaboration with engineers and stakeholders"
] as const;

export const strengths = [
  { label: "Backend Systems", icon: BriefcaseBusiness },
  { label: "AI / ML", icon: BrainCircuit },
  { label: "Data Pipelines", icon: Database },
  { label: "Product Thinking", icon: Rocket },
  { label: "Reliability", icon: ShieldCheck },
  { label: "Technical Writing", icon: Sparkles }
] as const;

export const experience = [
  {
    company: "Flipkart",
    role: "Backend Engineer · via Netscribes",
    period: "Jan 2025 — Aug 2025",
    summary:
      "Owned automated rate-card workflows for a revenue-critical pricing system with pipelines processing up to 2 million records per run.",
    bullets: [
      "Reduced pricing inconsistencies across 300K+ records by automating validation and processing logic.",
      "Cut production issue resolution time by 40% through log analysis, structured debugging, and root-cause documentation.",
      "Collaborated with engineering and business teams to convert operational gaps into scalable backend improvements."
    ]
  },
  {
    company: "Tequed Labs",
    role: "AI / ML Intern",
    period: "Feb 2024 — Jul 2024",
    summary:
      "Built ContextBridge, a scoped memory orchestration system for multi-session LLM workflows.",
    bullets: [
      "Designed layered architecture with a memory service, business logic, and graph-backed knowledge storage.",
      "Reduced token redundancy by 40% with selective persistence and retrieval scoping.",
      "Evaluated output quality across retrieval configurations and refined prompts for accuracy."
    ]
  },
  {
    company: "24/7.ai",
    role: "Product & Customer Experience Analyst",
    period: "Sept 2023 — Jan 2024",
    summary:
      "Translated support conversations into clear product insights.",
    bullets: [
      "Surfaced usability gaps and recurring pain points from user-reported issues.",
      "Converted qualitative feedback into structured improvement recommendations.",
      "Synthesized patterns into root-cause findings for feature decisions."
    ]
  }
] as const;

export const projects = [
  {
    category: "Backend · Pricing",
    title: "Flipkart Rate Card Pipelines",
    description:
      "Automated backend pipelines for pricing validation and record reconciliation across a revenue-critical workflow.",
    tags: ["Python", "Automation", "Pipelines", "SQL"],
    footerLeft: "2M+ records",
    footerRight: "05 / 07"
  },
  {
    category: "Memory Orchestration",
    title: "ContextBridge",
    description:
      "A project-scoped memory system that enables shared memory across multiple LLM sessions using graph-backed retrieval.",
    tags: ["LLMs", "RAG", "Graph DB", "MCP"],
    footerLeft: "40% ↓ token overhead",
    footerRight: "01 / 07"
  },
  {
    category: "Computer Vision",
    title: "Cancer Detection System",
    description:
      "Vision Transformer histopathology classifier with domain-adversarial training for cross-dataset generalization.",
    tags: ["ViT", "PyTorch", "AUROC", "Grad-CAM"],
    footerLeft: "99.83% accuracy",
    footerRight: "06 / 07"
  },
  {
    category: "NLP · Forecasting",
    title: "Demand Forecasting Ensemble",
    description:
      "Boosting ensemble combining ARIMA, LSTM, SVR and dynamic weights for food supply chain demand prediction.",
    tags: ["ARIMA", "LSTM", "MLflow", "Forecasting"],
    footerLeft: "Published research",
    footerRight: "07 / 07"
  },
  {
    category: "Agentic AI",
    title: "FIR Intelligence System",
    description:
      "Bilingual AI analytics for crime record accessibility with hybrid SQL and semantic routing.",
    tags: ["RAG", "Bilingual NLP", "ChromaDB", "Agents"],
    footerLeft: "7 intent types",
    footerRight: "03 / 07"
  },
  {
    category: "ML · Analytics",
    title: "Telecom Churn Prediction",
    description:
      "Recall-oriented churn pipeline paired with a Power BI dashboard for stakeholder visibility.",
    tags: ["scikit-learn", "Power BI", "EDA", "Python"],
    footerLeft: "Business insights",
    footerRight: "04 / 07"
  },
  // {
  //   category: "Portfolio · UI",
  //   title: "Portfolio System Rebuild",
  //   description:
  //     "A premium Next.js portfolio rebuilt with a cleaner structure, sharper typography, and responsive motion.",
  //   tags: ["Next.js", "Tailwind", "TypeScript", "Framer Motion"],
  //   footerLeft: "Recruiter-first",
  //   footerRight: "07 / 07"
  // }
] as const;

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "C", "PHP", "JavaScript", "SQL", "HTML", "CSS"],
    direction: "left",
    speed: 28
  },
  {
    category: "Backend & APIs",
    items: ["REST APIs", "OOP", "DBMS", "Operating Systems", "System Design", "Git", "Linux", "Debugging"],
    direction: "right",
    speed: 34
  },
  {
    category: "AI / ML",
    items: ["Machine Learning", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Feature Engineering", "RAG", "LLMs"],
    direction: "left",
    speed: 31
  },
  {
    category: "Databases & Cloud",
    items: ["MySQL", "PostgreSQL", "Database Design", "AWS", "Docker", "CI/CD", "CRUD Operations", "SQL"],
    direction: "right",
    speed: 30
  },
  {
    category: "Testing & Delivery",
    items: ["Unit Testing", "Root Cause Analysis", "Technical Documentation", "Problem Solving", "Analytical Thinking", "Communication", "Team Collaboration"],
    direction: "left",
    speed: 33
  },
  {
    category: "Product Thinking",
    items: ["Product Thinking", "User Experience", "Stakeholder Management", "Prompt Engineering", "Model Evaluation", "EDA", "Matplotlib"],
    direction: "right",
    speed: 36
  }
] as const;

export const research = [
  {
    title: "Generalized Cancer Detection from Histopathology Images using Deep Learning",
    summary:
      "Vision Transformer-based cancer classification with domain-adversarial training for cross-dataset generalization.",
    metrics: ["ViT", "PyTorch", "AUROC"]
  },
  {
    title: "Chunking Is the Real Bottleneck in RAG",
    summary:
      "Controlled evaluation of document chunking strategies and their impact on retrieval quality, faithfulness, and hallucination behavior.",
    metrics: ["RAG", "Retrieval", "Evaluation"]
  },
  {
    title: "Demand Forecasting and Sales Prediction",
    summary:
      "Boosting ensemble with dynamic weight assignment for food supply chain demand forecasting, validated on real-world datasets.",
    metrics: ["ARIMA", "LSTM", "MLflow"]
  }
] as const;

export const contactLinks = [
  { label: "Email me", href: "mailto:harishkumard12@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/harishkumard12", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/harishkumard24", icon: Github }
] as const;
