function getCacheBustedUrl(url) {
  return url + "?v=" + new Date().getTime();
}

const images = [
  "amies.jpg", "amis.jpg", "basket.jpg", "billiards.jpg", 
  "boules.jpg", "foot.jpg", "hockey.jpg", "jadorelesport.jpg",
  "jenesuispassportif.jpg", "jenesuispassportive.jpg",
  "jesuisassezsportif.jpg", "jesuisassezsportive.jpg",
  "jesuistressportif.jpg", "jesuistressportive.jpg",
  "petanque.jpg", "pingpong.jpg", "rugby.jpg", "tennis.jpg",
  "volleyball.jpg", "wii.jpg", "tuessportif.jpg", "tuessportive.jpg"
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

// Enable button after DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  spinBtn.disabled = false;
  initializeReels();
});

function initializeReels() {
  reels.forEach(reel => {
    const rand = Math.floor(Math.random() * images.length);
    reel.src = getCacheBustedUrl(images[rand]);
  });
  result.textContent = "Ça tourne!... 🎰";
}

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
        // final symbol
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
