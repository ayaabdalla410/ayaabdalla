/**
 * Aya Abdalla Mohamed - Portfolio JavaScript
 * Modern, Interactive & Accessible Functions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLightbox();
  initProjectModals();
  initLanguageToggle();
  initCopyButtons();
  initContactForm();
  initTypingEffect();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.innerHTML = '☰';
      });
    });
  }

  // Active Link Highlight via IntersectionObserver
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================================================
   2. FULLSCREEN IMAGE LIGHTBOX MODAL
   - Opens at Full Resolution
   - Smooth animation
   - Dark backdrop
   - Clear close button
   - Closes on outside click & ESC
   ========================================================================== */
let currentZoom = 1;

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const fullImg = document.getElementById('lightboxFullImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const zoomInBtn = document.getElementById('lightboxZoomIn');
  const zoomOutBtn = document.getElementById('lightboxZoomOut');
  const zoomResetBtn = document.getElementById('lightboxZoomReset');
  const fullscreenBtn = document.getElementById('lightboxFullscreenBtn');

  // Select all clickable gallery image containers
  const galleryItems = document.querySelectorAll('[data-lightbox-trigger]');

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const img = item.querySelector('img');
      const title = item.getAttribute('data-project-title') || img.alt || 'Project Preview';
      const caption = item.getAttribute('data-project-caption') || 'n8n Workflow Full Resolution Architecture Diagram';
      const fullSrc = item.getAttribute('data-full-src') || img.src;

      openLightbox(fullSrc, title, caption);
    });
  });

  function openLightbox(src, title, caption) {
    if (!modal || !fullImg) return;
    
    currentZoom = 1;
    fullImg.style.transform = `scale(${currentZoom})`;
    fullImg.src = src;
    fullImg.alt = title;

    if (titleEl) titleEl.textContent = title;
    if (captionEl) captionEl.innerHTML = `<span>⚡</span> ${caption}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (fullImg) fullImg.src = '';
      currentZoom = 1;
    }, 300);
  }

  // 1. Close on Close Button Click
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // 2. Close on Clicking Outside Image (on the dark backdrop overlay)
  if (modal) {
    modal.addEventListener('click', (e) => {
      // If clicked element is the modal background or outside the image stage
      if (e.target === modal || e.target.classList.contains('lightbox-backdrop-click-target')) {
        closeLightbox();
      }
    });
  }

  // 3. Close on ESC Keyboard Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (modal && modal.classList.contains('active')) {
        closeLightbox();
      }
      closeAllInteractiveModals();
    }
  });

  // Zoom Controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentZoom < 2.5) {
        currentZoom += 0.25;
        fullImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentZoom > 0.6) {
        currentZoom -= 0.25;
        fullImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentZoom = 1;
      fullImg.style.transform = `scale(1)`;
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    });
  }
}

/* ==========================================================================
   3. CODE & LIVE DEMO INTERACTIVE MODALS
   ========================================================================== */
const projectData = {
  1: {
    title: "AI Customer Service Bot with n8n",
    titleAr: "بوت خدمة العملاء الذكي باستخدام n8n",
    codeFilename: "n8n_customer_support_flow.json",
    codeContent: `{
  "name": "AI Customer Support Bot - Omnichannel & CRM",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "customer-chat",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "1",
      "name": "Webhook Inbound",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "model": "gemini-1.5-pro",
        "options": {
          "temperature": 0.2,
          "systemMessage": "You are Aya's AI Customer Service Agent. Analyze intent, match order/account, and answer with high accuracy."
        }
      },
      "id": "2",
      "name": "Gemini AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.6,
      "position": [480, 300]
    },
    {
      "parameters": {
        "resource": "contact",
        "operation": "getOrUpsert",
        "email": "={{ $json.body.email }}",
        "additionalFields": {
          "status": "active_inquiry",
          "notes": "={{ $json.body.message }}"
        }
      },
      "id": "3",
      "name": "HubSpot CRM Sync",
      "type": "n8n-nodes-base.hubspot",
      "typeVersion": 2,
      "position": [720, 200]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { status: 'success', reply: $json.ai_reply, latency_ms: 240 } }}"
      },
      "id": "4",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [960, 300]
    }
  ]
}`,
    demoType: "chat",
    botResponses: {
      "default": "Hello! I am Aya's AI Customer Assistant powered by n8n workflows. I can help verify orders, answer queries, or sync your tickets into HubSpot CRM! How can I assist you?",
      "order": "I found order #48291! It is currently processed and scheduled for delivery today at 4:00 PM via Aramex. Tracking ID has been updated in CRM.",
      "price": "Our pricing depends on automated workflow volume: Basic Tier covers up to 10k executions/month, and Enterprise covers custom AI multi-agents with 99.9% uptime.",
      "human": "I have flagged this conversation for human agent takeover. A senior specialist will reach out shortly. Ticket #TS-992 logged in HubSpot CRM.",
      "n8n": "This workflow runs autonomously on n8n self-hosted engine with webhooks, Python data cleaning nodes, and Gemini 1.5 Pro LLM agents."
    }
  },
  2: {
    title: "News Aggregator, AI Summarizer & Keyphrase Extractor",
    titleAr: "مجمع المقالات والأخبار والتلخيص الذكي واستخراج الكلمات المفتاحية",
    codeFilename: "news_scraper_and_summarizer.py",
    codeContent: `# ============================================================
# n8n Embedded Python Node & Standalone Pipeline
# News Aggregator, Text Sanitizer & Keyphrase Extractor
# Developer: Aya Abdalla Mohamed
# ============================================================

import re
import json
from bs4 import BeautifulSoup

def clean_and_extract_article(raw_html: str, target_source: str) -> dict:
    """
    Parses messy HTML scraped via n8n HTTP Request node,
    strips ads/scripts, cleans whitespace, and formats payload.
    """
    soup = BeautifulSoup(raw_html, "html.parser")
    
    # Remove unwanted script, style, and navigation tags
    for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
        tag.decompose()
        
    # Extract clean text
    article_text = soup.get_text(separator=" ")
    article_text = re.sub(r'\\s+', ' ', article_text).strip()
    
    # Extract meta tags
    title_meta = soup.find("meta", property="og:title")
    title = title_meta["content"] if title_meta else "Latest Tech Article"
    
    return {
        "source": target_source,
        "clean_title": title,
        "character_count": len(article_text),
        "clean_text_preview": article_text[:3500],
        "status": "ready_for_llm_summarization"
    }

# n8n Node execution entry
# items = [{ 'json': clean_and_extract_article($input.item.json.raw_html, 'TechPortal') }]
# return items
`,
    demoType: "news"
  }
};

function initProjectModals() {
  const codeModal = document.getElementById('codeModal');
  const demoModal = document.getElementById('demoModal');
  const codePre = document.getElementById('modalCodeSnippet');
  const codeFileName = document.getElementById('modalCodeFileName');
  const codeTitle = document.getElementById('modalCodeTitle');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  // Trigger Code Buttons
  document.querySelectorAll('[data-code-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-code-project');
      const data = projectData[projId];
      if (!data) return;

      if (codeTitle) codeTitle.textContent = data.title;
      if (codeFileName) codeFileName.textContent = data.codeFilename;
      if (codePre) codePre.textContent = data.codeContent;

      openInteractiveModal(codeModal);
    });
  });

  // Trigger Live Demo Buttons
  document.querySelectorAll('[data-demo-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-demo-project');
      const data = projectData[projId];
      if (!data) return;

      const demoTitle = document.getElementById('modalDemoTitle');
      if (demoTitle) demoTitle.textContent = data.title;

      const demoChatArea = document.getElementById('demoChatArea');
      const demoNewsArea = document.getElementById('demoNewsArea');

      if (projId === "1") {
        if (demoChatArea) demoChatArea.style.display = 'block';
        if (demoNewsArea) demoNewsArea.style.display = 'none';
      } else {
        if (demoChatArea) demoChatArea.style.display = 'none';
        if (demoNewsArea) demoNewsArea.style.display = 'block';
      }

      openInteractiveModal(demoModal);
    });
  });

  // Close buttons inside modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllInteractiveModals();
    });
  });

  // Close modals on outside click
  [codeModal, demoModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeAllInteractiveModals();
        }
      });
    }
  });

  // Copy code to clipboard button
  if (copyCodeBtn && codePre) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codePre.textContent).then(() => {
        showToast('Code copied to clipboard! 📋');
      });
    });
  }

  // Live Chat Simulator Logic
  initChatSimulator();
  // Live News Summarizer Simulator Logic
  initNewsSimulator();
}

function openInteractiveModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllInteractiveModals() {
  document.querySelectorAll('.interactive-modal').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* Chat Simulator */
function initChatSimulator() {
  const sendBtn = document.getElementById('simSendBtn');
  const inputEl = document.getElementById('simChatInput');
  const messagesBox = document.getElementById('simMessages');

  if (!sendBtn || !inputEl || !messagesBox) return;

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'sim-msg sim-msg-user';
    userMsg.textContent = text;
    messagesBox.appendChild(userMsg);
    inputEl.value = '';
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Show typing status
    const typingMsg = document.createElement('div');
    typingMsg.className = 'sim-msg sim-msg-bot';
    typingMsg.innerHTML = '<em>⚡ n8n AI Agent is generating response...</em>';
    messagesBox.appendChild(typingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Simulate n8n workflow latency (400ms)
    setTimeout(() => {
      typingMsg.remove();
      const botMsg = document.createElement('div');
      botMsg.className = 'sim-msg sim-msg-bot';
      
      const lower = text.toLowerCase();
      let reply = projectData[1].botResponses["default"];
      if (lower.includes('order') || lower.includes('track') || lower.includes('طلب')) {
        reply = projectData[1].botResponses["order"];
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('سعر')) {
        reply = projectData[1].botResponses["price"];
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('مساعدة')) {
        reply = projectData[1].botResponses["human"];
      } else if (lower.includes('n8n') || lower.includes('workflow') || lower.includes('كيف')) {
        reply = projectData[1].botResponses["n8n"];
      }

      botMsg.innerHTML = `<strong>Aya's AI Bot:</strong> ${reply}`;
      messagesBox.appendChild(botMsg);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 450);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

/* News Simulator */
function initNewsSimulator() {
  const runBtn = document.getElementById('runSummarizerBtn');
  const newsOutput = document.getElementById('summarizerOutput');
  const newsSelect = document.getElementById('sampleNewsSelect');

  if (!runBtn || !newsOutput) return;

  runBtn.addEventListener('click', () => {
    runBtn.disabled = true;
    runBtn.textContent = '⚡ Running n8n Pipeline...';
    newsOutput.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--accent-cyan);">
        <p>1. Scraping HTML via HTTP Request node...</p>
        <p>2. Executing Python text cleaning script...</p>
        <p>3. Gemini LLM generating concise 3-bullet summary...</p>
        <p>4. Extracting keyphrases and semantic tags...</p>
      </div>
    `;

    setTimeout(() => {
      runBtn.disabled = false;
      runBtn.textContent = 'Run n8n Summarization Pipeline';
      
      newsOutput.innerHTML = `
        <div style="background: #090d16; border: 1px solid var(--border-cyan); border-radius: 12px; padding: 1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.8rem;">
            <span style="color:#34d399; font-weight:700; font-size:0.85rem;">✓ Workflow Completed in 1.4s</span>
            <span style="color:#94a3b8; font-size:0.8rem; font-family:monospace;">Tokens: 412 • Compression: 95.2%</span>
          </div>
          <h4 style="color:#f8fafc; font-size:1.1rem; margin-bottom:0.75rem;">AI Bullet Summary:</h4>
          <ul style="color:#cbd5e1; font-size:0.92rem; line-height:1.6; margin-bottom:1rem; padding-left:1.25rem;">
            <li>Enterprises adopting n8n workflows reduce manual data entry and CRM synchronization overhead by over 80%.</li>
            <li>Custom Python nodes allow granular sanitization of unstructured HTML before passing payloads to LLMs.</li>
            <li>Real-time automated keyword extraction enables multi-database archiving and instant Slack/Telegram notifications.</li>
          </ul>
          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
            <p style="font-size:0.8rem; color:#94a3b8; margin-bottom:0.4rem; font-weight:600;">EXTRACTED KEYPHRASES:</p>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
              <span class="badge badge-cyan">#Automation</span>
              <span class="badge badge-n8n">#n8nPipelines</span>
              <span class="badge badge-status">#PythonNLP</span>
              <span class="badge badge-cyan">#GeminiAI</span>
              <span class="badge badge-n8n">#WorkflowOptimization</span>
            </div>
          </div>
        </div>
      `;
    }, 900);
  });
}

/* ==========================================================================
   4. BILINGUAL SWITCHER (English / العربية)
   ========================================================================== */
const translations = {
  ar: {
    navAbout: "نبذة عني",
    navSkills: "المهارات",
    navProjects: "معرض الأعمال",
    navExperience: "الخبرة والتعليم",
    navContact: "تواصل معي",
    heroBadge: "متاحة للعمل | جاهزية تامة للسفر بنسبة 100%",
    heroRolePrefix: "أخصائية أتمتة مهام وسير عمل",
    heroBio: "أخصائية n8n وأتمتة العمليات مع أساس تقني متين في منطق سير العمل، وواجهات برمجة التطبيقات REST APIs، وتحليل بيانات JSON، وبرمجة Python. أسعى لتوظيف خبرتي العملية في ربط أدوات الذكاء الاصطناعي وأنظمة إدارة علاقات العملاء (CRM) لأتمتة عمليات الأعمال ورفع الكفاءة التشغيلية.",
    btnExploreProjects: "استعراض المشاريع",
    btnContact: "تواصل معي",
    statReliability: "موثوقية العمليات",
    statE2E: "أتمتة شاملة E2E",
    statIntegrations: "تكامل الأنظمة",
    aboutTag: "نبذة مهنية",
    aboutTitle: "الهدف والبيانات الشخصية",
    objTitle: "الهدف الوظيفي (Objective)",
    personalTitle: "المعلومات الشخصية",
    lblMobile: "رقم الهاتف",
    lblEmail: "البريد الإلكتروني",
    lblAddress: "العنوان",
    lblMobility: "السفر والتنقل",
    valAddress: "المنصورة، الدقهلية",
    valMobility: "جاهزية تامة للسفر 100%",
    skillsTag: "الخبرات التقنية",
    skillsTitle: "المهارات والأدوات الأساسية",
    cat1Title: "أتمتة العمليات والتكامل (Workflow Automation)",
    cat2Title: "البرمجة والتطوير (Programming & Scripting)",
    cat3Title: "دمج الأدوات والمنصات (Tools & Integration)",
    cat4Title: "المفاهيم التقنية المتقدمة (Core Technical Concepts)",
    langTitle: "اللغات المتقنة",
    langAr: "العربية (اللغة الأم)",
    langEn: "الإنجليزية: فوق المتوسط (درجة TOEFL ITP: 523)",
    projectsTag: "معرض الأعمال",
    projectsTitle: "المشاريع المميزة (Projects)",
    projectsDesc: "معرض يبرز نماذج حقيقية لمسارات عمل تم بناؤها باستخدام n8n ودمج الذكاء الاصطناعي وPython.",
    p1Title: "بناء بوت خدمة عملاء ذكي باستخدام n8n",
    p1Desc: "نظام أتمتة شامل لبوت خدمة عملاء متعدد القنوات (WhatsApp، Telegram، والمحادثة المباشرة)، مدعوم بنماذج الذكاء الاصطناعي LLM للرد الذكي، والربط المباشر مع HubSpot CRM لتسجيل ومتابعة التذاكر تلقائياً.",
    p2Title: "جمع المقالات والأخبار وتلخيصها واستخراج الكلمات المفتاحية",
    p2Desc: "مسار عمل آلي بالكامل يبدأ بجدولة دورية لجلب الأخبار والمقالات من مواقع محددة، وتنظيفها عبر كود Python، ثم تلخيصها بذكاء اصطناعي في 3 نقاط محددة واستخراج الكلمات المفتاحية الأكثر أهمية وتخزينها.",
    btnViewCode: "عرض الكود",
    btnLiveDemo: "معاينة حية (Live Demo)",
    zoomHint: "اضغط لعرض الصورة بالحجم الكامل وملء الشاشة",
    expTag: "المسيرة المهنية",
    expTitle: "الخبرات العملية والتعليم",
    depiRole: "متدربة أتمتة وتطوير برمجيات",
    depiOrg: "مبادرة رواد مصر الرقمية (DEPI) | حالياً",
    eduTitle: "المؤهلات التعليمية",
    edu1: "جامعة المنصورة - بكالوريوس الطب البيطري (09/2018 – 07/2023)",
    edu1Grade: "التقدير: جيد جداً مع مرتبة الشرف [79.7%]",
    edu2: "جامعة المنصورة - دبلومة الكيمياء الحيوية (02/2024 – 10/2024)",
    contactTag: "تواصل مهني",
    contactTitle: "لنبدأ العمل معاً",
    contactDesc: "هل تبحث عن بناء مسارات عمل مؤتمتة ذكية ترفع كفاءة شركتك؟ يسعدني التواصل ومناقشة الفرص.",
    formName: "الاسم بالكامل",
    formEmail: "البريد الإلكتروني",
    formMsg: "الرسالة",
    formSend: "إرسال الرسالة",
    footerText: "جميع الحقوق محفوظة © آية عبد الله محمد • متخصصة أتمتة وn8n",
    backToTop: "العودة للأعلى ↑"
  },
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navExperience: "Experience & Education",
    navContact: "Contact",
    heroBadge: "Available for Opportunities | Willing to travel 100%",
    heroRolePrefix: "n8n & Workflow Automation Specialist",
    heroBio: "Detail-oriented n8n & Automation Specialist with a strong foundation in workflow logic, REST APIs, JSON parsing, and Python. Seeking to leverage hands-on project experience in integrating AI tools and CRMs to automate business processes and enhance operational efficiency.",
    btnExploreProjects: "Explore Projects",
    btnContact: "Get in Touch",
    statReliability: "Workflow Reliability",
    statE2E: "End-to-End Pipelines",
    statIntegrations: "Multi-Platform Sync",
    aboutTag: "Professional Overview",
    aboutTitle: "Objective & Profile Details",
    objTitle: "Career Objective",
    personalTitle: "Personal Information",
    lblMobile: "Mobile Phone",
    lblEmail: "E-mail Address",
    lblAddress: "Address",
    lblMobility: "Relocation / Travel",
    valAddress: "Mansoura, Dakahlia",
    valMobility: "Willing to travel 100%",
    skillsTag: "Technical Expertise",
    skillsTitle: "Core Skills & Tech Stack",
    cat1Title: "Workflow Automation & Integration",
    cat2Title: "Programming & Scripting",
    cat3Title: "Tools & Platforms Integration",
    cat4Title: "Core Technical Concepts",
    langTitle: "Languages Proficiency",
    langAr: "Arabic (Mother Tongue)",
    langEn: "English: Upper-Intermediate (TOEFL ITP: 523)",
    projectsTag: "Featured Portfolio",
    projectsTitle: "Showcase Projects",
    projectsDesc: "Production-ready automation workflows built with n8n, AI/LLMs, and Python.",
    p1Title: "AI Customer Service Bot with n8n",
    p1Desc: "End-to-end automated multi-channel customer service system with webhook triggers, Gemini LLM intent classification, and real-time HubSpot CRM contact & ticket synchronization.",
    p2Title: "Automated News Aggregator & AI Keyphrase Extractor",
    p2Desc: "Scheduled automation pipeline fetching articles from targeted sources, cleaning HTML via Python scripting, generating concise 3-bullet AI summaries, and extracting semantic keywords.",
    btnViewCode: "View Code",
    btnLiveDemo: "Live Demo",
    zoomHint: "Click to open Full Screen in Full Resolution",
    expTag: "Career Timeline",
    expTitle: "Experience & Education",
    depiRole: "Automation & Software Trainee",
    depiOrg: "Digital Egypt Pioneers Initiative (DEPI) | Present",
    eduTitle: "Education Background",
    edu1: "Mansoura University - Bachelor’s degree of veterinary medicine (09/2018 – 07/2023)",
    edu1Grade: "Grade: Very Good with honors [79.7%]",
    edu2: "Mansoura University - Diploma in Biochemistry (02/2024 – 10/2024)",
    contactTag: "Get In Touch",
    contactTitle: "Let's Build Intelligent Automations",
    contactDesc: "Looking to automate tedious workflows, connect CRMs, or integrate AI into your business pipeline? Feel free to reach out.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Your Message",
    formSend: "Send Message",
    footerText: "All Rights Reserved © Aya Abdalla Mohamed • n8n & Automation Specialist",
    backToTop: "Back to top ↑"
  }
};

let currentLang = 'ar'; // Default in Arabic for direct alignment with user's prompt

function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (!langBtn) return;

  // Check saved preference or default to Arabic
  const savedLang = localStorage.getItem('portfolio_lang') || 'ar';
  setLanguage(savedLang);

  langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  const html = document.documentElement;
  const langBtn = document.getElementById('langToggleBtn');

  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    if (langBtn) langBtn.innerHTML = '🌐 English';
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    if (langBtn) langBtn.innerHTML = '🌐 العربية';
  }

  // Update translatable elements
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetText = btn.getAttribute('data-copy-target');
      navigator.clipboard.writeText(targetText).then(() => {
        showToast(currentLang === 'ar' ? `تم النسخ: ${targetText}` : `Copied: ${targetText}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✓</span> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. CONTACT FORM SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = originalText;
      showToast(currentLang === 'ar' ? 'شكراً لتواصلك! تم إرسال رسالتك بنجاح.' : 'Thank you! Your message has been sent successfully.');
    }, 800);
  });
}

/* ==========================================================================
   7. TYPING ANIMATION IN HERO
   ========================================================================== */
function initTypingEffect() {
  const dynamicTextEl = document.getElementById('dynamicRoleText');
  if (!dynamicTextEl) return;

  const rolesEn = [
    "n8n Workflow Automation Specialist",
    "AI & LLM Pipeline Integrator",
    "Python & REST API Developer",
    "Business Process Optimizer"
  ];

  const rolesAr = [
    "أخصائية أتمتة العمليات وبناء مسارات n8n",
    "مطورة تكامل الذكاء الاصطناعي وLLMs",
    "مطورة سكربتات Python وواجهات REST APIs",
    "أخصائية تحسين وربط أنظمة الأعمال وCRMs"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const list = currentLang === 'ar' ? rolesAr : rolesEn;
    const currentRole = list[roleIdx % list.length];

    if (isDeleting) {
      dynamicTextEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      dynamicTextEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx++;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}
