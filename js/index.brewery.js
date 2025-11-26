const prevBtn = document.querySelector(".brewery-slider__btn--prev");
const nextBtn = document.querySelector(".brewery-slider__btn--next");

const track = document.querySelector(".brewery-slider__track");
const slides = document.querySelectorAll(".brewery-slider__slide");
const points = document.querySelectorAll(".brewery-slider__indicator-point");
const popups = document.querySelectorAll(".brewery__popup");
const overlays = document.querySelectorAll(".brewery__popup-overlay");
const closeBtns = document.querySelectorAll(".brewery__popup-close");

let currentSlide = 0;

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${position * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentSlide !== slides.length - 1) {
    currentSlide = (currentSlide + 1) % slides.length;
    let activeSlide = document.querySelector(
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "brewery-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide !== 0) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    let activeSlide = document.querySelector(
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[currentSlide].classList.add(
      "brewery-slider__indicator-point-active"
    );
    updateSlide(currentSlide);
  }
});

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    let activeSlide = document.querySelector(
      ".brewery-slider__indicator-point-active"
    );
    activeSlide.classList.remove("brewery-slider__indicator-point-active");
    points[index].classList.add("brewery-slider__indicator-point-active");
    updateSlide(index);
  });
});

slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    tooglePopUp(index);
  });
});
overlays.forEach((overlay, index) => {
  overlay.addEventListener("click", () => {
    tooglePopUp(index);
  });
});
closeBtns.forEach((closeBtn, index) => {
  closeBtn.addEventListener("click", () => {
    tooglePopUp(index);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeIndex = [...popups].findIndex((popup) =>
      popup.classList.contains("brewery__popup-active")
    );
    if (activeIndex !== -1) {
      tooglePopUp(activeIndex);
    }
  }
});

function tooglePopUp(index) {
  popups[index].classList.toggle("brewery__popup-active");
  document.body.classList.toggle("no-scroll");
}

window.addEventListener("resize", () => {
  updateSlide(currentSlide);
});
