/* ============================================================
   resume.js — Resume rendering (HTML version) + modal
   ============================================================ */

function buildResumeHTML() {
  const d = PORTFOLIO_DATA;
  return `
    <div class="res-doc">
      <div class="res-name">${d.personal.name.toUpperCase()}</div>
      <div class="res-contact">
        <span>📍 ${d.personal.location}</span>
        <a href="tel:${d.personal.phone}">📞 ${d.personal.phone}</a>
        <a href="mailto:${d.personal.email}">✉ ${d.personal.email}</a>
        <a href="${d.personal.github}" target="_blank">⚡ github.com/MH-SHUVO20</a>
        <a href="${d.personal.linkedin}" target="_blank">💼 linkedin.com/in/mh-shuvo-aiub</a>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">RESEARCH SUMMARY</div>
      <p class="res-summary">Computer Science undergraduate (Expected 2026) specializing in Computer Vision, Deep Learning, and Large Language Models — actively seeking <strong>internship positions</strong>, <strong>full-time AI/ML engineering roles</strong>, and research collaborations.</p>
      <p class="res-summary">Published author in IEEE conferences, including a CORE-ranked international venue (AICCSA 2025), with research contributions in YOLO-based detection frameworks and applied AI architectures.</p>
      <p class="res-summary">Skilled in experimental design, model benchmarking, fine-tuning, and performance evaluation using PyTorch, transformer-based models, and modern LLM orchestration frameworks (LangChain, LangGraph).</p>
      <p class="res-summary">Active IEEE conference reviewer with strong grounding in research methodology, reproducibility, and critical evaluation of machine learning and computer vision research.</p>

      <div class="res-divider"></div>
      <div class="res-section-title">RESEARCH EXPERIENCE</div>
      <div class="res-item">
        <div class="res-role">Undergraduate Researcher — AI, Computer Vision and Deep Learning</div>
        <div class="res-org">American International University–Bangladesh (AIUB)</div>
        <div class="res-date">2024 – Present</div>
        <ul>
          <li><strong>AICCSA 2025 (CORE-ranked):</strong> "Deep Learning Based Real-Time Hand Detection Using First-Person Egocentric Perspectives" — <a href="https://ieeexplore.ieee.org/document/11315447" target="_blank" style="color:var(--accent)">IEEE Xplore</a></li>
          <li><strong>ECCE 2025:</strong> "A Deep Learning-Based Framework for Accurate Detection and Classification of On-Road Vehicles Using Improved YOLOv11"</li>
          <li><strong>RAAICON 2025 (First Author):</strong> "DBNet: Automated Driver Behavior Analysis for Road Safety Using Vision-Based Systems"</li>
          <li><strong>RAAICON 2025:</strong> "TOM-YOLO: Tomato Leaf Disease Detection Using Enhanced YOLOv12 Framework"</li>
          <li><strong>ICCIT 2025:</strong> "An Enhanced YOLOv11 Framework for Automatic Lumbar Spine Level Detection"</li>
          <li>Developed and trained deep learning models using YOLO architectures in PyTorch; performed dataset preprocessing, hyperparameter tuning, and evaluation (precision, recall, F1, mAP).</li>
          <li>Expanding research scope to LLMs and NLP, with ongoing work on model fine-tuning, RAG, and multi-agent systems.</li>
        </ul>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">REVIEWER EXPERIENCE</div>
      <div class="res-item">
        <div class="res-role">Conference Reviewer</div>
        <div class="res-org">IEEE-affiliated International Conferences</div>
        <div class="res-date">2025 – Present</div>
        <ul>
          <li>Reviewer, 2025 International Conference on Innovation and Intelligence for Informatics, Computing, and Technologies (3ICT)</li>
          <li>Reviewer, 2026 International Conference on Frontiers of Engineering and Emerging Technologies (FET'26)</li>
        </ul>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">SELECTED PROJECTS</div>
      <div class="res-item">
        <ul>
          <li><strong>Multi-Tool AI Agent for Bangladesh Data:</strong> LangChain & LangGraph agent with SQLite and web search integration, dynamic SQL tool-calling, memory management.</li>
          <li><strong>LLM Article Analysis Pipeline:</strong> Streamlit → FastAPI → n8n → LLM → Google Sheets → Gmail automated workflow.</li>
          <li><strong>YOLOv11 Real-Time Detection API:</strong> FastAPI microservice with Redis caching and Docker containerization.</li>
          <li><strong>BERT Fine-Tuning:</strong> SQuAD v1.1 (71.15% EM, 80.97% F1); comparative sentiment analysis on IMDB 50K.</li>
          <li><strong>CityWatch (PHP/MySQL):</strong> MVC web app with RBAC, multi-role auth, AJAX operations.</li>
        </ul>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">TECHNICAL SKILLS</div>
      <div class="res-skills-grid">
        <div class="res-skill-row"><span>Deep Learning & CV:</span> <span>YOLO Models, CNN, Transformers, Object Detection, Transfer Learning</span></div>
        <div class="res-skill-row"><span>LLMs & Agents:</span> <span>LangChain, LangGraph, BERT Fine-tuning, RAG, Prompt Engineering</span></div>
        <div class="res-skill-row"><span>ML:</span> <span>Supervised/Unsupervised Learning, XGBoost, Ensemble Methods</span></div>
        <div class="res-skill-row"><span>Frameworks:</span> <span>PyTorch, TensorFlow, HuggingFace, Scikit-learn, OpenCV</span></div>
        <div class="res-skill-row"><span>Backend & Infra:</span> <span>FastAPI, Docker, Redis, REST APIs, PHP, MySQL, Oracle</span></div>
        <div class="res-skill-row"><span>Languages:</span> <span>Python (Primary), C#, Java, R, C++, C</span></div>
        <div class="res-skill-row"><span>Tools:</span> <span>Git, Docker, Jupyter, Google Colab, LaTeX, VS Code</span></div>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">EDUCATION</div>
      <div class="res-edu-row">
        <div>
          <div class="res-edu-degree">B.Sc. in Computer Science and Engineering</div>
          <div class="res-edu-school">American International University–Bangladesh (AIUB), Dhaka</div>
        </div>
        <div>
          <div class="res-edu-year">Expected 2026</div>
          <div class="res-edu-gpa">CGPA: 3.75/4.00</div>
        </div>
      </div>
      <div class="res-edu-row">
        <div>
          <div class="res-edu-degree">Higher Secondary Certificate (Science)</div>
          <div class="res-edu-school">Govt. Keshab Chandra College, Jhenaidah</div>
        </div>
        <div>
          <div class="res-edu-year">2021</div>
          <div class="res-edu-gpa">GPA: 5.00/5.00</div>
        </div>
      </div>
      <div class="res-edu-row">
        <div>
          <div class="res-edu-degree">Secondary School Certificate (Science)</div>
          <div class="res-edu-school">Garagonj High School</div>
        </div>
        <div>
          <div class="res-edu-year">2018</div>
          <div class="res-edu-gpa">GPA: 4.67/5.00</div>
        </div>
      </div>

      <div class="res-divider"></div>
      <div class="res-section-title">MEMBERSHIPS</div>
      <p class="res-summary">IEEE Student Member · IEEE Computer Society — AIUB Chapter</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('resumeContent');
  const modalContent = document.getElementById('resumeModalContent');
  const modal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeResumeModal');

  const html = buildResumeHTML();
  if (preview) preview.innerHTML = html;
  if (modalContent) {
    modalContent.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h2 style="font-family:var(--font-display);font-size:32px;letter-spacing:2px">Resume</h2>
        <a href="${PORTFOLIO_DATA.personal.resumePDF}" download class="btn-dl" style="text-decoration:none;font-family:var(--font-mono);font-size:12px;padding:10px 20px;background:var(--accent3);color:var(--bg);border-radius:6px;display:flex;align-items:center;gap:6px">
          <i class="fas fa-download"></i> Download PDF
        </a>
      </div>
      ${html}
    `;
  }

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  ['openResume','openResumeModal','openResumeModal2','resumeNavBtn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', e => { e.preventDefault(); openModal(); });
  });
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
