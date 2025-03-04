document.addEventListener('DOMContentLoaded', function() {
  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'scroll-progress';
  document.body.appendChild(progressIndicator);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressIndicator.style.width = scrolled + '%';
  });
});
