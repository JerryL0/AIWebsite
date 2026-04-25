const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section, .hero-grid");
const copyButton = document.querySelector(".copy-email");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-10% 0px -45% 0px",
  }
);

sections.forEach((section) => observer.observe(section));

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy Email";
      }, 1600);
    } catch {
      copyButton.textContent = "Copy Failed";
      setTimeout(() => {
        copyButton.textContent = "Copy Email";
      }, 1600);
    }
  });
}
