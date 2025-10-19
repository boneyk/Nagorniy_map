document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasSidebar");
  let startY = 0,
    currentY = 0,
    offsetY = 0,
    isDragging = false;
  let lastTranslateY = 0; // чтобы сохранять положение при отпускании

  const maxTranslateY = offcanvas.offsetHeight; // закрытие только если полностью вниз

  // touch start
  offcanvas.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });

  // touch move
  offcanvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    offsetY = currentY - startY;
    if (offsetY < 0) offsetY = 0; // не тянем выше верхнего края
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  // touch end
  offcanvas.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";

    if (offsetY >= maxTranslateY - 10) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    } else {
      lastTranslateY = offsetY; // сохраняем новое положение
      offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
    }
  });

  // mouse для ПК
  offcanvas.addEventListener("mousedown", (e) => {
    startY = e.clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
    offsetY = currentY - startY;
    if (offsetY < 0) offsetY = 0;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";

    if (offsetY >= maxTranslateY - 10) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    } else {
      lastTranslateY = offsetY;
      offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
    }
  });

  // сброс трансформации при открытии/закрытии
  offcanvas.addEventListener("shown.bs.offcanvas", () => {
    lastTranslateY = 0;
    offcanvas.style.transform = "translateY(0)";
  });
  offcanvas.addEventListener("hidden.bs.offcanvas", () => {
    lastTranslateY = 0;
    offcanvas.style.transform = "translateY(0)";
  });
});
