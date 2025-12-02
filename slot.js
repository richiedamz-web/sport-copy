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
      for (let i = 0; i < images.length * 2; i++) {
        const img = document.createElement("img");
        img.src = images[i % images.length];
        reel.appendChild(img);
      }
    });
    result.textContent = "Cliquez sur 'Spin' pour commencer!";
  }

  // Spin animation with smooth scroll illusion
  function spinReels() {
    spinBtn.disabled = true;
    result.textContent = "Ça tourne!... 🎰";

    reels.forEach((reel, i) => {
      const singleHeight = 100;
      const totalHeight = reel.scrollHeight;
      const finalIndex = Math.floor(Math.random() * images.length);
      const startTime = performance.now();
      const duration = 2000 + i * 400; // staggered stop

      reel.classList.add("spinning");

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
       // Quick start, smooth stop
            const ease = progress < 0.3 
             ? 3 * Math.pow(progress, 2)       // faster initial surge
             : 1 - Math.pow(1 - progress, 3); // smooth deceleration

        // Smooth scrolling effect
        const scrollY = -(ease * (totalHeight - singleHeight));
        reel.style.transform = `translateY(${scrollY}px)`;

        // Rapid shuffle for realism
        if (elapsed % 50 < 20) {
          const randomChild = Math.floor(Math.random() * reel.children.length);
          reel.children[randomChild].src = images[Math.floor(Math.random() * images.length)];
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Lock final image
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

