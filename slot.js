document.addEventListener("DOMContentLoaded", () => {

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

  if (!spinBtn) {
    console.error("spinBtn not found! Check your HTML.");
    return;
  }

  // Build stacked reel images
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

  // Spin animation
  function spinReels() {
    spinBtn.disabled = true;
    result.textContent = "Ça tourne!... 🎰";

    reels.forEach((reel, i) => {

      // wobble effect
      reel.classList.add("spinning");

      const totalHeight = reel.scrollHeight;
      const duration = 2000 + i * 400;
      const start = performance.now();

      // choose random end image
      const finalIndex = Math.floor(Math.random() * images.length);

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // easing
        const ease = 1 - Math.pow(1 - progress, 3);

        // scroll through stack
        const y = -(ease * (totalHeight - 100));
        reel.style.transform = `translateY(${y}px)`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // stop reel — show correct final image:
          reel.innerHTML = "";  
          const img = document.createElement("img");
          img.src = images[finalIndex];
          reel.appendChild(img);

          reel.style.transform = "translateY(0)";
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

  spinBtn.addEventListener("click", spinReels);
  initializeReels();

});
