document.getElementById('spinButton').addEventListener('click', spin);

const reelElements = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

const images = [
  'images/football.png',
  'images/basketball.png',
  'images/tennis.png',
  'images/rugby.png',
  'images/swimming.png'
];

// store the shuffle intervals
let shuffleIntervals = [];

function spin() {
  document.getElementById('spinButton').disabled = true;

  // Add wobble animation
  reelElements.forEach(reel => reel.classList.add('spinning'));

  // Start fast shuffle immediately
  reelElements.forEach((reel, index) => {
    shuffleIntervals[index] = setInterval(() => {
      reel.src = images[Math.floor(Math.random() * images.length)];
    }, 70); // speed of shuffle for realism
  });

  // Stop each reel with a staggered delay
  stopReel(0, 1500);
  stopReel(1, 2000);
  stopReel(2, 2500);
}

function stopReel(reelIndex, delay) {
  setTimeout(() => {
    clearInterval(shuffleIntervals[reelIndex]); // stop the fast shuffle

    const finalImage = images[Math.floor(Math.random() * images.length)];
    reelElements[reelIndex].src = finalImage;

    reelElements[reelIndex].classList.remove('spinning');

    if (reelIndex === 2) {
      document.getElementById('spinButton').disabled = false;
    }
  }, delay);
}
