const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  observer.observe(item);
});

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const youTubeEmbeds = document.querySelectorAll('.video-embed iframe');
const isHttpOrigin = window.location.protocol === 'http:' || window.location.protocol === 'https:';

youTubeEmbeds.forEach((iframe) => {
  try {
    const url = new URL(iframe.src);
    url.searchParams.set('rel', '0');
    url.searchParams.set('modestbranding', '1');
    if (isHttpOrigin) {
      url.searchParams.set('origin', window.location.origin);
    }
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.src = url.toString();
  } catch (error) {
    // Keep current src when parsing fails for any unexpected value.
  }
});
