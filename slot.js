const images = [
  "images/amies.jpg","images/amis.jpg","images/basket.jpg","images/billiards.jpg",
  "images/boules.jpg","images/foot.jpg","images/hockey.jpg","images/jadorelesport.jpg",
  "images/jenesuispassportif.jpg","images/jenesuispassportive.jpg",
  "images/jesuisassezsportif.jpg","images/jesuisassezsportive.jpg",
  "images/jesuistressportif.jpg","images/jesuistressportive.jpg",
  "images/petanque.jpg","images/pingpong.jpg","images/rugby.jpg",
  "images/tennis.jpg","images/volleyball.jpg","images/wii.jpg",
  "images/tuessportif.jpg","images/tuessportive.jpg"
];

const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
  document.getElementById("reel4"),
  document.getElementById("reel5")
];

const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

// Initialize reels with stacked images
function initializeReels() {
  reels.forEach(reel => {
    reel.innerHTML = "";
    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      reel.appendChild(img);
    });
  });
  result.textContent = "Cliquez sur 'Spin' pour commencer!";
}

// Spin function
function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {
    const totalHeight = reel.scrollHeight;
    const duration = 2000 + i * 400; // staggered stop
    const startTime = performance.now();
    const startTop = 0;
    const endTop = -(totalHeight - 100); // stop at bottom

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out for realistic stop
      const ease = 1 - Math.pow(1 - progress, 3);

      reel.style.transform = `translateY(${startTop + ease * endTop}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Reset position for next spin
        reel.style.transform = `translateY(0px)`;
        if (i === reels.length - 1) {
          spinBtn.disabled = false;
          result.textContent = "Voici tes images!";
        }
      }
    }

    requestAnimationFrame(animate);
  });
}

spinBtn.addEventListener("click", spinReels);
window.addEventListener("DOMContentLoaded", initializeReels);
