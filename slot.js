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

// Populate stacks
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

function spinReels() {
  spinBtn.disabled = true;
  result.textContent = "Ça tourne!... 🎰";

  reels.forEach((reel, i) => {
    const finalIndex = Math.floor(Math.random() * images.length);
    const singleHeight = 100;
    const endY = - finalIndex * singleHeight;

    const duration = 2000 + i * 400;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const totalScroll = -(reel.scrollHeight - singleHeight);
      const currentY = progress < 1
        ? totalScroll * ease
        : endY;

      reel.style.transform = `translateY(${currentY}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
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
