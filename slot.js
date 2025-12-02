function getCacheBustedUrl(url) {
  return url + "?v=" + new Date().getTime();
}

// Array of all images in your "images/" folder
const images = [
  "images/amies.jpg",
  "images/amis.jpg",
  "images/basket.jpg",
  "images/billiards.jpg",
  "images/boules.jpg",
  "images/foot.jpg",
  "images/hockey.jpg",
  "images/jadorelesport.jpg",
  "images/jenesuispassportif.jpg",
  "images/jenesuispassportive.jpg",
  "images/jesuisassezsportif.jpg",
  "images/jesuisassezsportive.jpg",
  "images/jesuistressportif.jpg",
  "images/jesuistressportive.jpg",
  "images/petanque.jpg",
  "images/pingpong.jpg",
  "images/rugby.jpg",
  "images/tennis.jpg",
  "images/volleyball.jpg",
  "images/wii.jpg",
  "images/tuessportif.jpg",
  "images/tuessportive.jpg"
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

// Enable button and initialize reels when DOM is ready
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

// Spin function
function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {
    const duration = 1500 + i * 400; // staggered spin
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const rand = Math.floor(Math.random() * images.length);
      reel.src = getCacheBustedUrl(images[rand]);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        const finalIndex = Math.floor(Math.random() * images.length);
        reel.src = getCacheBustedUrl(images[finalIndex]);

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
