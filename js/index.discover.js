const wrapper = document.querySelector(".discover-slider__wrapper");
const track   = document.querySelector(".discover-slider__track");
const slides  = [...document.querySelectorAll(".discover-slider__slide")];
const points  = [...document.querySelectorAll(".discover-slider__indicator-point")];

let currentIndex = 0;
let startX = 0;
let startTranslate = 0;
let currentTranslate = 0;
let isPointerDown = false;

const GAP = 30; // збігається з CSS
function slideWidth() {
  // беремо реальну ширину елемента (без gap)
  return slides[0].getBoundingClientRect().width;
}
function visibleCount() {
  // скільки слайдів реально вміщується зараз
  return Math.max(1, Math.round(wrapper.clientWidth / (slideWidth())));
}
function maxIndex() {
  // останній індекс, на який можна прокрутити (без «порожнього хвоста»)
  return Math.max(0, (slides.length - visibleCount())-2);
}
function setTranslate(x, withAnim = false) {
  track.style.transition = withAnim ? "transform 0.4s ease" : "none";
  track.style.transform = `translateX(${x}px)`;
}
function goTo(index, withAnim = true) {
  currentIndex = Math.min(Math.max(0, index), maxIndex());
  currentTranslate = -(currentIndex * (slideWidth() + GAP));
  setTranslate(currentTranslate, withAnim);
  // індикатори
  points.forEach((p,i)=>p.classList.toggle("discover-slider__indicator-point-active", i===currentIndex));
}

// індикатори кліком
points.forEach((p, i) => p.addEventListener("click", () => goTo(i)));

// ресайз/орієнтація
window.addEventListener("resize", () => goTo(currentIndex, false));
window.addEventListener("orientationchange", () => setTimeout(()=>goTo(currentIndex,false), 0));

/* === Pointer Events замість touch/mouse === */
track.addEventListener("pointerdown", (e) => {
  // дозволяємо тільки первинний вказівник (палец)
  if (!e.isPrimary) return;
  isPointerDown = true;
  track.setPointerCapture(e.pointerId);
  track.style.cursor = "grabbing";
  track.style.transition = "none";
  startX = e.clientX;
  startTranslate = currentTranslate;
});

track.addEventListener("pointermove", (e) => {
  if (!isPointerDown || !e.isPrimary) return;
  // блокуємо горизонтальний скрол контейнера, але лишаємо вертикальний (через touch-action: pan-y в CSS)
  const deltaX = e.clientX - startX;
  currentTranslate = startTranslate + deltaX;
  setTranslate(currentTranslate, false);
});

track.addEventListener("pointerup", onPointerUp);
track.addEventListener("pointercancel", onPointerUp);
function onPointerUp(e){
  if (!isPointerDown) return;
  isPointerDown = false;
  track.releasePointerCapture?.(e.pointerId);
  track.style.cursor = "grab";
  // визначаємо «флік»
  const moved = currentTranslate - startTranslate;
  const threshold = 50;
  if (moved < -threshold) goTo(currentIndex + 1);
  else if (moved > threshold) goTo(currentIndex - 1);
  else goTo(currentIndex); // відкотити
}

// стартова позиція
goTo(0, false);
