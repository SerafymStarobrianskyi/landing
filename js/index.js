function init() {
  import("./global.nav.js");
  import("./index.styles.js");
  import("./index.discover.js");
  import("./index.testimonials.js");
  import("./index.questions.js");
  import("./index.brewery.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
