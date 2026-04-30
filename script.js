/* ============================================================
   DATA LAYER
   ============================================================ */
const courses = [
  {
    courseName: "資料科學與程式設計應用",
    category: "Data Science",
    skillsLearned: ["Python", "R", "社會統計", "生成式 AI"],
    description: "培養數據處理能力，並能將 Python 與 R 語言應用於學術分析與自動化腳本撰寫。"
  },
  {
    courseName: "史學方法與文獻分析",
    category: "History / Research",
    skillsLearned: ["文獻考證", "史料爬梳", "批判性思考", "獨立研究"],
    description: "熟稔文獻考證與史料爬梳，具備嚴密的批判性思考與獨立撰寫研究的能力。"
  },
  {
    courseName: "社區 GIS 的理論與實務",
    category: "Geography / GIS",
    skillsLearned: ["GIS 操作", "空間數據處理", "地方歷史分析"],
    description: "學習地理資訊系統（GIS）操作，能將空間數據處理能力應用於地方歷史與空間發展的分析。"
  },
  {
    courseName: "都市經濟學",
    category: "Urban Economics",
    skillsLearned: ["都市發展分析", "空間結構", "交通路網規劃"],
    description: "學習都市發展與經濟運作的關聯，培養對都市空間的分析視角，並應用於交通運輸網絡規劃。"
  },
  {
    courseName: "基礎日語與文化",
    category: "Language & Culture",
    skillsLearned: ["初級日文", "情境溝通", "日本文化"],
    description: "著重於旅遊、購物與交通等實用情境的日語溝通，並培養基礎的文化涵養。"
  }
];

const projects = [
  {
    projectName: "Python 隨機生成腳本開發",
    status: "Completed",
    detailDesc: "使用 Python 撰寫基於 d100 系統的隨機化腳本，能自動產出包含數值與背景的詳盡角色設定檔（如 Fate 系列 Servant）。",
    techStack: ["Python", "腳本開發", "自動化"]
  },
  {
    projectName: "交通運輸模擬與模組開發",
    status: "Completed",
    detailDesc: "在《Transport Fever 2》中結合現實時刻表與廣播系統規劃交通網，並在 Minecraft Create 中進行航空物理模擬。",
    techStack: ["遊戲模組開發", "交通路網規劃", "模擬實作"]
  }
];

const skills = {
  programming: {
    label: "程式語言",
    items: ["Python", "R"]
  },
  specialties: {
    label: "專業專長",
    items: ["文獻考證與研究", "空間資料分析 (GIS)", "交通路網規劃", "遊戲模組開發", "數據資料處理"]
  },
  languages: {
    label: "語言能力",
    items: ["中文 (母語)", "日文 (基礎溝通)"]
  }
};

/* ============================================================
   CORE LOGIC
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化資料渲染
  renderCourses();
  renderProjects();
  renderSkills();

  // 2. 處理導覽列捲動透明度效果
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  });

  // 3. 手機版選單切換邏輯
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // 點擊選單項目後自動關閉選單 (手機版專用)
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
   RENDERING FUNCTIONS
   ============================================================ */
function renderCourses() {
  const container = document.getElementById('courses-container');
  if (!container) return;
  container.innerHTML = courses.map(course => `
    <div class="data-card">
      <span class="data-card__category">${course.category}</span>
      <h3 class="data-card__title">${course.courseName}</h3>
      <p class="data-card__desc">${course.description}</p>
      <div class="data-card__tags">
        ${course.skillsLearned.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = projects.map(p => `
    <div class="data-card">
      <span class="data-card__category">${p.status}</span>
      <h3 class="data-card__title">${p.projectName}</h3>
      <p class="data-card__desc">${p.detailDesc}</p>
      <div class="data-card__tags">
        ${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  container.innerHTML = Object.entries(skills).map(([key, group]) => `
    <div class="skill-group">
      <span class="skill-group__label">${group.label}</span>
      <div class="skill-group__list">
        ${group.items.map(item => `<div class="skill-item">${item}</div>`).join('')}
      </div>
    </div>
  `).join('');
}