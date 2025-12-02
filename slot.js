function getCacheBustedUrl(url) {
  return url + "?v=" + new Date().getTime();
}

// All images in your 'images/' folder
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

// Enable button and initialize reels on page load
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

function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {
    reel.classList.add("spinning"); // start visual movement

    const duration = 1500 + i * 400;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;

      // Move image up/down in a more visible way
      const offset = Math.sin(elapsed / 50 * Math.PI) * 20; // ±20px vertical
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
        reel.style.transform = ""; // reset position
        reel.classList.remove("spinning");

        if (i === reels.length - 1) {
          spinBtn.disabled = false;
          result.textContent = "Voici tes images!";
        }
      }
    }

    requestAnimationFrame(animate);
  });
}


  reels.forEach((reel, i) => {
    reel.classList.add("spinning"); // add spinning class

    const duration = 1500 + i * 400; // staggered stop times
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;

      // Swap images fast to simulate spinning
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
        reel.classList.remove("spinning");

        // Enable button after last reel stops
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

spinBtn.addEventListener("click", spinReels);



