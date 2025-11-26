const track = document.querySelector(".discover-slider__track");
const slides = document.querySelectorAll(".discover-slider__slide");
const points = document.querySelectorAll(".discover-slider__indicator-point");

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${
    position * slideWidth + position * 30
  }px)`;
}

points.forEach((point, index) => {
  point.addEventListener("click", () => {
    let activeSlide = document.querySelector(
      ".discover-slider__indicator-point-active"
    );
    activeSlide.classList.remove("discover-slider__indicator-point-active");
    points[index].classList.add("discover-slider__indicator-point-active");
    updateSlide(index);
  });
});

window.addEventListener("resize", () => {
  updateSlide(currentSlide);
});
