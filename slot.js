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

// ---------- INITIALISE STACKS ----------
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

window.addEventListener("DOMContentLoaded", initializeReels);

// ---------- THE SPIN FUNCTION ----------
function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {

    // RANDOM RESULT
    const finalIndex = Math.floor(Math.random() * images.length);
    const finalOffset = -finalIndex * 100;  // image height is 100px

    // ANIMATION TIMING
    const duration = 2000 + i * 400;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      // slide full reel for effect, but end on random offset
      const spinDistance = -(reel.scrollHeight - 100);
      const current = progress < 1
        ? spinDistance * ease
        : finalOffset;

      reel.style.transform = `translateY(${current}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // ADD WOBBLE
        reel.classList.add("wobble");
        setTimeout(() => reel.classList.remove("wobble"), 300);

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
