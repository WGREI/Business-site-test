const answers = [
  {
    title: "Openings can change quickly.",
    copy: "This site routes parents to call or email for current availability, then collects the basics so staff can respond without playing phone tag."
  },
  {
    title: "Age details belong front and center.",
    copy: "The owner can plug in exact classroom ages, ratios, and program details. The layout is ready for parents to compare fit fast."
  },
  {
    title: "Tours should feel like an easy next step.",
    copy: "The final flow can invite families to request a visit, ask about tuition, or join a waitlist from one focused contact section."
  }
];

function splitText() {
  document.querySelectorAll("[data-split]").forEach((element) => {
    const words = element.textContent.trim().split(/\s+/);
    element.innerHTML = words.map((word) => `<span class="split-word"><span>${word}</span></span>`).join(" ");
  });
}

function initQuestions() {
  const buttons = document.querySelectorAll("[data-question]");
  const title = document.querySelector("#answer-title");
  const copy = document.querySelector("#answer-copy");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = answers[Number(button.dataset.question)] || answers[0];
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      title.textContent = next.title;
      copy.textContent = next.copy;
    });
  });
}

function initForm() {
  const form = document.querySelector("[data-form]");
  if (!form) return;

  const note = form.querySelector(".form-note");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = "Preview action complete. A real version would send this into email or the CRM.";
    form.classList.add("submitted");
    window.setTimeout(() => form.classList.remove("submitted"), 650);
  });
}

function revealOnScroll() {
  const elements = document.querySelectorAll("[data-reveal], [data-card], [data-day-card]");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  elements.forEach((element) => observer.observe(element));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  splitText();
  initQuestions();
  initForm();
  revealOnScroll();
  document.documentElement.classList.add("ready");
});
