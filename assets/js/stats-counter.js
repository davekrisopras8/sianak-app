// Counter Animation
function animateCounter(id, target, suffix = "") {
  const element = document.getElementById(id);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString("id-ID") + suffix;
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current).toLocaleString("id-ID") + suffix;
    }
  }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter("stat1", 15337);
        animateCounter("stat2", 80, "%");
        animateCounter("stat3", 38);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector("#stat1").closest("section");
if (statsSection) statsObserver.observe(statsSection);
