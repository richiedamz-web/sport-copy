// Images, reels, spin button
const images = [...]; // your array
const reels = [...]; 
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

// Initialize reels
window.addEventListener("DOMContentLoaded", () => {
  spinBtn.disabled = false;
  initializeReels();
});

function initializeReels() {
  reels.forEach(reel => {
    const rand = Math.floor(Math.random() * images.length);
    reel.src = getCacheBustedUrl(images[rand]);
  });
  result.textContent = "Cliquez sur 'Spin' pour commencer!";
}

// This is the only spin function
function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {
    reel.classList.add("spinning"); // start wobble

    const duration = 1500 + i * 400;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;

      // Vertical motion to simulate spinning
      const offset = Math.sin(elapsed / 50 * Math.PI) * 20; // ±20px
      reel.style.transform = `translateY(${offset}px)`;

      // Swap images rapidly
      if (elapsed % 50 < 16) {
        const rand = Math.floor(Math.random() * images.length);
        reel.src = getCacheBustedUrl(images[rand]);
      }

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        // Stop reel
        const finalIndex = Math.floor(Math.random() * images.length);
        reel.src = getCacheBustedUrl(images[finalIndex]);
        reel.style.transform = ""; // reset
        reel.classList.remove("spinning");

        // Enable button after last reel
        if (i === reels.length - 1) {
          spinBtn.disabled = false;
          result.textContent = "Voici tes images!";
        }
      }
    }

    requestAnimationFrame(animate);
  });
}

// Only one event listener
spinBtn.addEventListener("click", spinReels);

