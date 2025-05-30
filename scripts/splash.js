// splash.js
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  const progressText = document.getElementById('progress-text');
  const progressBar = document.getElementById('progress-bar');
  const accessMsg = document.getElementById('access-message');

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress > 100) progress = 100;

    progressText.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      accessMsg.style.display = "block";
      setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
          splash.style.display = 'none';
        }, 1000);
      }, 1500);
    }
  }, 300); // Más lento
});
