const loadingScreen = document.getElementById("loadingScreen");
const themeToggle = document.getElementById("themeToggle");
const slideshow = document.getElementById("newsSlideshow");
const slides = slideshow ? Array.from(slideshow.querySelectorAll(".news-slide")) : [];
const dotsContainer = slideshow ? slideshow.querySelector(".slide-dots") : null;
const prevButton = slideshow ? slideshow.querySelector(".slide-btn.prev") : null;
const nextButton = slideshow ? slideshow.querySelector(".slide-btn.next") : null;
const fullscreenButton = document.getElementById("fullscreenBtn");

let slideIndex = 0;
let autoplay;

const updateSlides = () => {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === slideIndex);
  });

  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }
};

const createDots = () => {
  if (!dotsContainer) return;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      slideIndex = index;
      updateSlides();
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
};

const nextSlide = () => {
  if (!slides.length) return;
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlides();
};

const prevSlide = () => {
  if (!slides.length) return;
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlides();
};

const resetAutoplay = () => {
  clearInterval(autoplay);
  autoplay = setInterval(nextSlide, 5000);
};

if (prevButton) {
  prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });
}

if (fullscreenButton && slideshow) {
  fullscreenButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await slideshow.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  });
}

window.addEventListener("load", () => {
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 1200);
  }
});

const savedTheme = localStorage.getItem("theme-mode");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme-mode", isDark ? "dark" : "light");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const articleFeed = [
  {
    id: "admission-2024-2025",
    title: "Admission for SY 2024-2025 is now ongoing",
    summary: "Future Lasallians are encouraged to explore the academic programs and admissions steps for the new school year.",
    image: "Photos/Articles/𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐅𝐎𝐑 𝐒𝐘 𝟐𝟎𝟐𝟒-𝟐𝟎𝟐𝟓 𝐈𝐒 𝐍𝐎𝐖 𝐎𝐍𝐆𝐎𝐈𝐍𝐆.jpg",
    tag: "Admissions"
  },
  {
    id: "alumni-homecoming-2024",
    title: "Alumni Homecoming 2024",
    summary: "The school welcomed former students, families, and friends for an evening of memories and community spirit.",
    image: "Photos/Articles/Alumni Homecoming 2024.jpg",
    tag: "Community"
  },
  {
    id: "pre-enrollment-2024",
    title: "Ready to write the next chapter of your academic journey",
    summary: "The pre-enrollment campaign helps young learners and parents prepare for a meaningful school year ahead.",
    image: "Photos/Articles/ready-to-write-next-chapter.jpg",
    tag: "Enrollment"
  },
  {
    id: "science-benchmarking",
    title: "Science teachers join academic benchmarking",
    summary: "Teachers explored new instructional practices and strengthened collaborative learning for the future.",
    image: "Photos/Articles/DLSJBC Science Teachers in their benchmarking activity at CSU.jpg",
    tag: "Academics"
  },
  {
    id: "green-and-bright",
    title: "Green and bright",
    summary: "The campus community highlighted sustainability, service, and vibrant school life through a fresh campaign.",
    image: "Photos/Articles/𝐆𝐑𝐄𝐄𝐍 𝐀𝐍𝐃 𝐁𝐑𝐈𝐆𝐇𝐓.jpg",
    tag: "Campus Life"
  },
  {
    id: "tokyo-educational-immersion",
    title: "Tokyo educational immersion",
    summary: "Students and teachers returned with new ideas and global appreciation from a learning experience abroad.",
    image: "Photos/Articles/𝐓𝐨𝐤𝐲𝐨 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐈𝐦𝐦𝐞𝐫𝐬𝐢𝐨𝐧.jpg",
    tag: "Programs"
  },
  {
    id: "60th-anniversary-culmination",
    title: "60th anniversary culmination",
    summary: "The celebration honored the school’s rich history and the many people who shaped its community.",
    image: "Photos/Articles/60th ANNIVERSARY CULMINATION.jpg",
    tag: "Milestones"
  },
  {
    id: "let-2023",
    title: "LET 2023 licensure examination",
    summary: "The college celebrated the success of teacher education graduates who passed the licensure examination.",
    image: "Photos/Articles/September 2023 Licensure Examination for Teachers (LET).jpg",
    tag: "Achievements"
  },
  {
    id: "lasallian-ambassadors-2024",
    title: "Lasallian ambassadors 2024",
    summary: "Student leaders showcased service, leadership, and school pride through a meaningful campaign.",
    image: "Photos/Articles/lasallian-ambassadors-2024.jpg",
    tag: "Leadership"
  },
  {
    id: "academia-socials-2023",
    title: "Academia the Lasallian socials 2023",
    summary: "The event highlighted student creativity, fellowship, and the spirit of community engagement.",
    image: "Photos/Articles/Academia The Lasallian Socials 2023.jpg",
    tag: "Events"
  },
  {
    id: "quality-lasallian-education",
    title: "Experience quality Lasallian education",
    summary: "The campaign shared how the school provides a meaningful education rooted in values and excellence.",
    image: "Photos/Articles/Experience Quality Lasallian Education.jpg",
    tag: "Education"
  },
  {
    id: "summer-sports-clinic",
    title: "Summer sports clinic and enrichment classes",
    summary: "The program welcomed learners for fun, fitness, and skill-building activities beyond the classroom.",
    image: "Photos/Articles/Summer Sports Clinic and Enrichment Classes.jpg",
    tag: "Programs"
  },
  {
    id: "senior-high-school-plus",
    title: "Senior High School Plus",
    summary: "The initiative brought together academic preparation and practical opportunities for senior high learners.",
    image: "Photos/Articles/alumni.jpg",
    tag: "Senior High"
  }
];

const articleList = document.getElementById("articlesFeedList");
if (articleList) {
  articleList.innerHTML = articleFeed
    .map(
      (article) => `
        <article class="article-card">
          <img src="${article.image}" alt="${article.title}" />
          <div class="article-card-content">
            <p class="eyebrow">${article.tag}</p>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <a class="article-link" href="${article.id}.html">Read story</a>
          </div>
        </article>
      `
    )
    .join("");
}

if (slides.length) {
  createDots();
  updateSlides();
  resetAutoplay();
}
