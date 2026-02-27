/* ============================================================
   data.js — All portfolio content data
   Edit this file to update your portfolio!
   ============================================================ */

const PORTFOLIO_DATA = {

  // ── Personal Info ─────────────────────────────────────────
  personal: {
    name: "Md. Mehedi Hasan Shuvo",
    shortName: "MH Shuvo",
    title: "AI Engineer & Researcher",
    email: "mdmehedihasanshuvo994@gmail.com",
    phone: "+8801954-596854",
    location: "Kuratoli, Khilkhet, Dhaka 1229, Bangladesh",
    github: "https://github.com/MH-SHUVO20",
    linkedin: "https://www.linkedin.com/in/mh-shuvo-aiub/",
    portfolio: "https://mhshuvo.me/",
    facebook: "https://www.facebook.com/mh.shuvo.7370",
    // Place your photo at assets/img/avatar.jpg
    avatar: "assets/img/avatar.jpg",
    // Place your resume PDF at assets/resume/Md_Mehedi_Hasan_Shuvo_Resume.pdf
    resumePDF: "assets/resume/Md_Mehedi_Hasan_Shuvo_Resume.pdf",
    typedStrings: [
      "Computer Vision Engineer",
      "Deep Learning Researcher",
      "LLM & Agent Systems Builder",
      "IEEE Published Author",
      "YOLO Architecture Specialist",
    ],
  },

  // ── Skills ─────────────────────────────────────────────────
  skills: [
    {
      icon: "🧠",
      cat: "ai",
      category: "Deep Learning & CV",
      title: "Computer Vision",
      tags: ["YOLO Models (v8–v12)", "CNN", "Transformers", "Object Detection", "Image Classification", "Transfer Learning", "Model Optimization"]
    },
    {
      icon: "🤖",
      cat: "ai",
      category: "LLMs & Agents",
      title: "Language & Agents",
      tags: ["LangChain", "LangGraph", "BERT Fine-tuning", "RAG", "Prompt Engineering", "OpenAI API", "Ollama", "Multi-Agent Systems"]
    },
    {
      icon: "📊",
      cat: "ai",
      category: "Machine Learning",
      title: "Classical ML",
      tags: ["KNN", "Decision Trees", "SVM", "XGBoost", "Ensemble Methods", "Cross-Validation", "Feature Engineering", "LSTM", "RNN"]
    },
    {
      icon: "⚡",
      cat: "ai",
      category: "Frameworks",
      title: "ML Libraries",
      tags: ["PyTorch", "TensorFlow", "Keras", "HuggingFace Transformers", "OpenCV", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]
    },
    {
      icon: "🌐",
      cat: "eng",
      category: "Web & Backend",
      title: "Engineering",
      tags: ["FastAPI", "Docker", "Redis", "REST APIs", "PHP", "MVC Architecture", "AJAX/JSON", "Session Management", "RBAC"]
    },
    {
      icon: "🗄️",
      cat: "eng",
      category: "Databases",
      title: "Data & Storage",
      tags: ["MySQL", "Oracle", "SQLite", "Relational Schema Design", "3NF Normalization", "Query Optimization", "SQL Injection Prevention"]
    },
    {
      icon: "💻",
      cat: "lang",
      category: "Programming",
      title: "Languages",
      tags: ["Python (Primary)", "C#", "Java", "R", "C++", "C", "HTML5", "CSS3", "JavaScript", "LaTeX"]
    },
    {
      icon: "🛠️",
      cat: "tools",
      category: "Dev Tools",
      title: "Tools & Platforms",
      tags: ["Jupyter Notebook", "Google Colab", "Git", "GitHub", "Docker", "VS Code", "Kaggle", "R Studio", "Matlab", "LaTeX"]
    },
    {
      icon: "🔬",
      cat: "tools",
      category: "Research Practices",
      title: "Research Skills",
      tags: ["Experimental Design", "Model Benchmarking", "IEEE Paper Writing", "Peer Review", "mAP/F1 Evaluation", "Reproducibility", "Systematic Benchmarking"]
    },
  ],

  // ── Skill Proficiency Bars ─────────────────────────────────
  proficiency: [
    { name: "Computer Vision", pct: 92 },
    { name: "Machine Learning", pct: 91 },
    { name: "Python & PyTorch", pct: 90 },
    { name: "LangChain / LangGraph", pct: 82 },
    { name: "BERT & NLP", pct: 80 },
    { name: "FastAPI & Docker", pct: 75 },
    { name: "Research & Academic Writing", pct: 88 },
  ],

  // ── Publications ────────────────────────────────────────────
  research: [
    {
      num: "01",
      title: "Deep Learning Based Real-Time Hand Detection Using First-Person Egocentric Perspectives",
      venue: "IEEE/ACS AICCSA 2025 — 22nd Int'l Conference on Computer Systems and Applications",
      badges: ["CORE RANKED", "Published"],
      link: "https://ieeexplore.ieee.org/document/11315447",
      doi: "10.1109/AICCSA66935.2025.11315447",
    },
    {
      num: "02",
      title: "A Deep Learning-Based Framework for Accurate Detection and Classification of On-Road Vehicles Using Improved YOLOv11",
      venue: "IEEE ECCE 2025 — Int'l Conference on Electrical, Computer and Communication Engineering",
      badges: ["Published"],
      link: "https://ieeexplore.ieee.org/document/11013964",
      doi: "10.1109/ECCE64574.2025.11013964",
    },
    {
      num: "03",
      title: "DBNet: Automated Driver Behavior Analysis for Road Safety Using Vision-Based Systems",
      venue: "IEEE RAAICON 2025 — 4th Int'l Conference on Robotics, Automation, AI and IoT",
      badges: ["First Author", "Presented"],
      link: null,
    },
    {
      num: "04",
      title: "TOM-YOLO: Tomato Leaf Disease Detection Using Enhanced YOLOv12 Framework",
      venue: "IEEE RAAICON 2025 — 4th Int'l Conference on Robotics, Automation, AI and IoT",
      badges: ["Presented"],
      link: null,
    },
    {
      num: "05",
      title: "An Enhanced YOLOv11 Framework for Automatic Lumbar Spine Level Detection",
      venue: "IEEE ICCIT 2025 — 28th Int'l Conference on Computer and Information Technology",
      badges: ["Presented"],
      link: null,
    },
  ],

  // ── Projects ─────────────────────────────────────────────
  // For each project:
  // image: put file at assets/img/projects/<filename>
  // video: put file at assets/video/<filename> OR use a YouTube URL
  projects: [
    {
      id: "agent-bd",
      title: "Multi-Tool AI Agent (Bangladesh Data)",
      cat: "llm",
      catLabel: "LLM / NLP",
      emoji: "🤖",
      image: "assets/img/projects/agent-bd.jpg",   // add your screenshot here
      video: null,
      description: "LangChain & LangGraph-based AI agent integrating multiple SQLite databases and web search APIs. Features dynamic SQL tool-calling, memory management, and structured prompt pipelines tailored for Bangladesh-specific data.",
      fullDesc: "Built a sophisticated multi-tool AI agent using LangChain and LangGraph that integrates multiple SQLite databases and web search APIs. The agent dynamically selects and calls appropriate SQL tools based on user queries, maintains conversation memory, and generates structured responses using carefully designed prompt pipelines. This project demonstrates practical LLM orchestration for domain-specific data retrieval.",
      highlights: [
        "Dynamic SQL tool-calling with schema-aware query generation",
        "Multi-database integration with LangGraph state management",
        "Web search API integration for real-time data augmentation",
        "Memory-augmented conversation handling",
        "Structured output generation with prompt optimization",
      ],
      stack: ["LangChain", "LangGraph", "SQLite", "Python", "OpenAI API"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "yolo-api",
      title: "YOLOv11 Real-Time Detection API",
      cat: "cv",
      catLabel: "Computer Vision",
      emoji: "⚡",
      image: "assets/img/projects/yolo-api.jpg",
      video: null,
      description: "Production-ready object detection microservice with YOLOv11 backend, FastAPI, Redis caching, and Docker containerization for optimized real-time inference.",
      fullDesc: "Designed and deployed a complete object detection microservice using YOLOv11 as the core model. The system uses FastAPI for high-performance HTTP endpoints, Redis for result caching to reduce redundant inference calls, and Docker for containerized deployment. The architecture supports horizontal scaling and includes performance benchmarking tools.",
      highlights: [
        "YOLOv11 inference with custom-trained model weights",
        "FastAPI async endpoints for concurrent request handling",
        "Redis caching layer reduces repeated inference by ~70%",
        "Docker + docker-compose for reproducible deployment",
        "Benchmarking tools with mAP, precision-recall analysis",
      ],
      stack: ["YOLOv11", "FastAPI", "Docker", "Redis", "Python", "PyTorch"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "llm-pipeline",
      title: "LLM Article Analysis Pipeline",
      cat: "llm",
      catLabel: "LLM / NLP",
      emoji: "📄",
      image: "assets/img/projects/llm-pipeline.jpg",
      video: null,
      description: "Multi-stage automated AI workflow: Streamlit → FastAPI → n8n → LLM → Google Sheets → Gmail. Fully automated document analysis with structured output generation.",
      fullDesc: "Designed an end-to-end automated article analysis pipeline integrating multiple services. Documents are submitted via Streamlit UI, processed by a FastAPI backend, orchestrated through n8n workflow automation, analyzed by an LLM with optimized prompts, and results are automatically saved to Google Sheets and emailed via Gmail integration.",
      highlights: [
        "Multi-service orchestration with n8n automation",
        "OpenAI API with prompt optimization for consistent structured JSON output",
        "Automatic Google Sheets population and Gmail delivery",
        "Streamlit frontend for easy document upload and status tracking",
        "Fault-tolerant pipeline with error handling at each stage",
      ],
      stack: ["OpenAI API", "n8n", "FastAPI", "Streamlit", "Google Sheets API", "Gmail API"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "bert-nlp",
      title: "BERT Fine-Tuning & NLP Study",
      cat: "llm",
      catLabel: "LLM / NLP",
      emoji: "🧠",
      image: "assets/img/projects/bert-nlp.jpg",
      video: null,
      description: "Fine-tuned BERT on SQuAD v1.1 achieving 71.15% EM and 80.97% F1. Comparative sentiment analysis on IMDB (50K samples) evaluating TF-IDF, Word2Vec, and Transformers.",
      fullDesc: "Conducted a comprehensive NLP study covering transformer fine-tuning and classical NLP method comparison. Fine-tuned BERT on the Stanford Question Answering Dataset (SQuAD v1.1), achieving competitive EM and F1 scores. Also performed a large-scale comparative sentiment analysis study on the IMDB 50K dataset, benchmarking TF-IDF + classical ML, Word2Vec embeddings, and full transformer approaches.",
      highlights: [
        "BERT fine-tuning: 71.15% EM, 80.97% F1 on SQuAD v1.1",
        "50K IMDB sentiment analysis with 3-method comparison",
        "TF-IDF, Word2Vec, Transformer performance benchmarking",
        "Ablation studies on model size and training data volume",
        "Comprehensive evaluation with accuracy, F1, and confusion matrices",
      ],
      stack: ["BERT", "HuggingFace", "PyTorch", "Scikit-learn", "Python", "SQuAD"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "citywatch",
      title: "CityWatch — Urban Issue Reporting",
      cat: "web",
      catLabel: "Web / Systems",
      emoji: "🌆",
      image: "assets/img/projects/citywatch.jpg",
      video: null,
      description: "Full-stack MVC web app with multi-role auth (Citizen, Authority, Admin), AJAX operations, RBAC, secure session handling, and relational database design.",
      fullDesc: "Built a comprehensive smart city issue reporting platform. Citizens can submit infrastructure problems with photo evidence and location tagging. Authorities can manage, respond to, and resolve reported issues. An admin panel provides full oversight. The system implements secure authentication, role-based access control, and a real-time AJAX interface for smooth user experience without full page reloads.",
      highlights: [
        "Three-tier role system: Citizen, Authority, Admin",
        "AJAX-powered dynamic UI for real-time updates",
        "RBAC with session security and XSS/SQL injection prevention",
        "Relational MySQL schema with normalized design",
        "Password hashing and prepared statements throughout",
      ],
      stack: ["PHP", "MySQL", "JavaScript", "AJAX", "HTML5", "CSS3", "MVC"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "medical-detection",
      title: "Medical & Disease Detection Systems",
      cat: "cv",
      catLabel: "Computer Vision",
      emoji: "🏥",
      image: "assets/img/projects/medical.jpg",
      video: null,
      description: "ML/DL-based diagnostic tools for bone fracture detection (lumbar spine) and tomato leaf disease classification using enhanced YOLO frameworks.",
      fullDesc: "Developed two medical/agricultural AI systems. The first detects and classifies lumbar spine levels in X-ray images using an enhanced YOLOv11 architecture (the subject of an IEEE ICCIT paper). The second system (TOM-YOLO, IEEE RAAICON paper) classifies tomato leaf diseases in real-time using an enhanced YOLOv12 framework with custom data augmentation and transfer learning.",
      highlights: [
        "IEEE-published lumbar spine detection with YOLOv11",
        "IEEE-published tomato disease detection with YOLOv12",
        "Custom data augmentation pipelines for medical imaging",
        "Precision, Recall, F1, mAP evaluation protocols",
        "Comparison against YOLOv8/v10/v11 baseline models",
      ],
      stack: ["YOLOv11", "YOLOv12", "PyTorch", "OpenCV", "Python", "CNN"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "smart-house",
      title: "Smart House Rent Forecasting",
      cat: "ml",
      catLabel: "Machine Learning",
      emoji: "🏠",
      image: "assets/img/projects/house.jpg",
      video: null,
      description: "Regression-based predictive system for rental price estimation using feature engineering and cross-validation techniques in Python.",
      fullDesc: "Built a machine learning pipeline for predicting rental prices in Bangladesh. The project involves comprehensive EDA, feature engineering (location encoding, property type, amenities scoring), model selection across linear regression, Random Forest, and XGBoost, and thorough cross-validation to prevent overfitting.",
      highlights: [
        "Exploratory Data Analysis with Pandas, Matplotlib, Seaborn",
        "Feature engineering: geo-encoding, amenity scoring",
        "Model comparison: Linear Regression vs RF vs XGBoost",
        "K-fold cross-validation for robust performance estimates",
        "RMSE, MAE, R² evaluation metrics",
      ],
      stack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
    {
      id: "shuttle",
      title: "AIUB Shuttle Management System",
      cat: "web",
      catLabel: "Web / Systems",
      emoji: "🚌",
      image: "assets/img/projects/shuttle.jpg",
      video: null,
      description: "Desktop scheduling and route management system built with C# and MySQL. CRUD operations, relational schema design, user authentication, and query optimization.",
      fullDesc: "Developed a comprehensive shuttle management system for AIUB campus transportation. The system handles route planning, schedule management, user reservations, and administrative oversight. Built with C# Windows Forms, MySQL backend, and features optimized database queries for fast lookups across large scheduling datasets.",
      highlights: [
        "Full CRUD for routes, schedules, and user reservations",
        "C# Windows Forms with event-driven UI",
        "MySQL with optimized queries and proper indexing",
        "User authentication with role-based access",
        "Reporting module for schedule analytics",
      ],
      stack: ["C#", "MySQL", "Windows Forms", ".NET", "SQL"],
      github: "https://github.com/MH-SHUVO20",
      demo: null,
    },
  ],

  // ── Education ─────────────────────────────────────────────
  education: [
    {
      year: "2022 — 2026 (Expected)",
      degree: "B.Sc. in Computer Science & Engineering",
      major: "Major: Information Systems",
      institution: "American International University–Bangladesh (AIUB), Dhaka",
      gpa: "CGPA: 3.75 / 4.00",
      desc: "Pursuing undergraduate studies with a focus on AI, Machine Learning, Computer Vision, and Deep Learning. Active researcher and IEEE student member throughout the program.",
      courses: ["Data Structures & Algorithms", "Machine Learning", "NLP", "Computer Vision", "Software Engineering", "Database Systems", "Data Warehousing & Mining", "OOP", "Operating Systems"],
    },
    {
      year: "2020",
      degree: "Higher Secondary Certificate (Science)",
      major: null,
      institution: "Govt. Keshab Chandra College, Jhenaidah",
      gpa: "GPA: 5.00 / 5.00",
      desc: "Achieved perfect GPA in the science stream, with strong foundation in Mathematics and Physics.",
      courses: ["Higher Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla", "ICT"],
    },
    {
      year: "2018",
      degree: "Secondary School Certificate (Science)",
      major: null,
      institution: "Garagonj Secondary School",
      desc: null,
      courses: [],
    },
  ],

  // ── Contact ───────────────────────────────────────────────
  contactLinks: [
    { icon: "fas fa-envelope", label: "Email", value: "mdmehedihasanshuvo994@gmail.com", href: "mailto:mdmehedihasanshuvo994@gmail.com" },
    { icon: "fab fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/mh-shuvo-aiub", href: "https://linkedin.com/in/mh-shuvo-aiub/" },
    { icon: "fab fa-github", label: "GitHub", value: "github.com/MH-SHUVO20", href: "https://github.com/MH-SHUVO20" },
    { icon: "fas fa-globe", label: "Portfolio", value: "mhshuvo.me", href: "https://mhshuvo.me/" },
    { icon: "fas fa-phone", label: "Phone", value: "+8801954-596854", href: "tel:+8801954596854" },
    { icon: "fab fa-facebook", label: "Facebook", value: "mh.shuvo.7370", href: "https://www.facebook.com/mh.shuvo.7370" },
  ],
};
