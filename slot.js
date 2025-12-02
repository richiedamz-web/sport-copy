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

// Populate each reel with stacked images
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
    // Determine *this reel’s* random outcome before spinning
    const finalIndex = Math.floor(Math.random() * images.length);

    const totalHeight = reel.scrollHeight;
    const singleImageHeight = 100; // as per your CSS
    const endOffset = - finalIndex * singleImageHeight;

    const duration = 2000 + i * 400; // staggered stops
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      // Interpolate from full spin to final offset
      const spinDistance = -(totalHeight - singleImageHeight);
      const currentY = progress < 1
        ? spinDistance * ease + Math.random()*20  // slight randomness for realism
        : endOffset;

      reel.style.transform = `translateY(${currentY}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Optional wobble / bounce effect
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
