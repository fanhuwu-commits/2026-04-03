/* ============================================================
   DATA LAYER
   ============================================================ */
const courses = [
  { courseName: "資料科學與程式設計應用", category: "Data Science", skillsLearned: ["Python", "R", "社會統計", "生成式 AI"], description: "培養數據處理能力，並能將 Python 與 R 語言應用於學術分析與自動化腳本撰寫。" },
  { courseName: "史學方法與文獻分析", category: "History / Research", skillsLearned: ["文獻考證", "史料爬梳", "批判性思考", "獨立研究"], description: "熟稔文獻考證與史料爬梳，具備嚴密的批判性思考與獨立撰寫研究的能力。" },
  { courseName: "社區 GIS 的理論與實務", category: "Geography / GIS", skillsLearned: ["GIS 操作", "空間數據處理", "地方歷史分析"], description: "學習地理資訊系統（GIS）操作，能將空間數據處理能力應用於地方歷史與空間發展的分析。" },
  { courseName: "都市經濟學", category: "Urban Economics", skillsLearned: ["都市發展分析", "空間結構", "交通路網規劃"], description: "學習都市發展與經濟運作的關聯，培養對都市空間的分析視角，並應用於交通運輸網絡規劃。" },
  { courseName: "基礎日語與文化", category: "Language & Culture", skillsLearned: ["初級日文", "情境溝通", "日本文化"], description: "著重於旅遊、購物與交通等實用情境的日語溝通，並培養基礎的文化涵養。" }
];

// 專案圖片已換成穩定的 Picsum 測試圖片
const projects = [
  { projectName: "Python 隨機生成腳本開發", status: "Completed", detailDesc: "使用 Python 撰寫基於 d100 系統的隨機化腳本，能自動產出包含數值與背景的詳盡角色設定檔（如 Fate 系列 Servant）。", techStack: ["Python", "腳本開發", "自動化"], imageUrl: "https://picsum.photos/seed/project1/600/400", link: "https://github.com/edgar-fan-ntpu/python-scripts" },
  { projectName: "交通運輸模擬與模組開發", status: "Completed", detailDesc: "在《Transport Fever 2》中結合現實時刻表與廣播系統規劃交通網，並在 Minecraft Create 中進行航空物理模擬。", techStack: ["遊戲模組開發", "交通路網規劃", "模擬實作"], imageUrl: "https://picsum.photos/seed/project2/600/400", link: "https://github.com/edgar-fan-ntpu/transport-mods" }
];

const skills = {
  programming: { label: "程式語言", items: ["Python", "R"] },
  specialties: { label: "專業專長", items: ["文獻考證與研究", "空間資料分析 (GIS)", "交通路網規劃", "遊戲模組開發", "數據資料處理"] },
  languages: { label: "語言能力", items: ["中文 (母語)", "日文 (基礎溝通)"] }
};

/* ============================================================
   CORE LOGIC & EFFECTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderProjects();
  renderSkills();
  initThemeToggle();
  initScrollAnimations();

  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('site-header--scrolled');
    else header.classList.remove('site-header--scrolled');
  });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

/* ============================================================
   FUNCTIONS
   ============================================================ */
function renderCourses() {
  const container = document.getElementById('courses-container');
  if (!container) return;
  container.innerHTML = courses.map(course => `
    <div class="data-card fade-in">
      <div class="data-card__content">
        <span class="data-card__category">${course.category}</span>
        <h3 class="data-card__title">${course.courseName}</h3>
        <p class="data-card__desc">${course.description}</p>
        <div class="data-card__tags">
          ${course.skillsLearned.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = projects.map(p => `
    <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="data-card data-card--interactive fade-in">
      <img src="${p.imageUrl}" alt="${p.projectName}" class="data-card__img" />
      <div class="data-card__content">
        <span class="data-card__category">${p.status}</span>
        <h3 class="data-card__title">${p.projectName}</h3>
        <p class="data-card__desc">${p.detailDesc}</p>
        <div class="data-card__tags">
          ${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  container.innerHTML = Object.entries(skills).map(([key, group]) => `
    <div class="skill-group fade-in">
      <span class="skill-group__label">${group.label}</span>
      <div class="skill-group__list">
        ${group.items.map(item => `<div class="skill-item">${item}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const iconSpan = toggleBtn.querySelector('.theme-toggle__icon');
  const htmlEl = document.documentElement;
  
  // 更新圖示的函式：深色模式顯示太陽，淺色模式顯示月亮
  const updateIcon = (theme) => {
    iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const savedTheme = localStorage.getItem('edgar-theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  } else {
    // 預設為淺色
    updateIcon('light');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('edgar-theme', newTheme); 
    updateIcon(newTheme); // 切換時同步更新圖示
  });
}

function initScrollAnimations() {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
}
