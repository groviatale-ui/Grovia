// ===== NAVBAR TOGGLE =====
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// ===== INFINITE SERVICES CAROUSEL =====
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentIndex = 0;
let autoSlide;

// Clone first and last slides for infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

let allSlides = Array.from(track.children);
let slideWidth;

function setSlideWidth() {
  slideWidth = slides[0].getBoundingClientRect().width + 30;
  track.style.transform = `translateX(-${slideWidth}px)`; // Start at first real slide
}
setSlideWidth();
window.addEventListener('resize', setSlideWidth);

function moveToSlide(index) {
  track.style.transition = "transform 0.8s ease-in-out";
  track.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
}

function handleTransitionEnd() {
  if (allSlides[currentIndex + 1] === firstClone) {
    track.style.transition = "none";
    currentIndex = 0;
    track.style.transform = `translateX(-${slideWidth}px)`;
  } else if (allSlides[currentIndex + 1] === lastClone) {
    track.style.transition = "none";
    currentIndex = slides.length - 1;
    track.style.transform = `translateX(-${slides.length * slideWidth}px)`;
  }
}

track.addEventListener('transitionend', handleTransitionEnd);

nextBtn.addEventListener('click', () => {
  currentIndex++;
  moveToSlide(currentIndex);
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  moveToSlide(currentIndex);
  resetAutoSlide();
});

function autoMove() {
  currentIndex++;
  moveToSlide(currentIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(autoMove, 5000);
}

autoSlide = setInterval(autoMove, 5000);
