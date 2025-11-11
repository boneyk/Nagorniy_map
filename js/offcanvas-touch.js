// document.addEventListener("DOMContentLoaded", function () {
//   const offcanvas = document.getElementById("offcanvasSidebar");
//   let startY = 0,
//     currentY = 0,
//     offsetY = 0,
//     isDragging = false;

//   // первая версия начало{
//   // let lastTranslateY = 0; // чтобы сохранять положение при отпускании
//   // // const maxTranslateY = offcanvas.offsetHeight; // закрытие только если полностью вниз
//   // const handleHeight = 50;
//   // const maxTranslateY = offcanvas.offsetHeight - handleHeight; // максимальный сдвиг вниз
//   // первая версия конец}

//   let lastTranslateY = 50 * window.innerHeight / 100; // старт: 50vh
//   const handleHeight = 50;
//   const maxTranslateY = offcanvas.offsetHeight - handleHeight; // 90vh - ярлычок
//   const minTranslateY = 0; // полностью раскрыто

//   // touch start
//   offcanvas.addEventListener("touchstart", (e) => {
//     startY = e.touches[0].clientY - lastTranslateY;
//     isDragging = true;
//     offcanvas.style.transition = "none";
//   });

//   // touch move
//   offcanvas.addEventListener("touchmove", (e) => {
//     if (!isDragging) return;
//     currentY = e.touches[0].clientY;
//     offsetY = currentY - startY;
//     console.log(startY)
//     if (offsetY < minTranslateY) offsetY = minTranslateY;
//     if (offsetY > maxTranslateY) offsetY = maxTranslateY;
//     offcanvas.style.transform = `translateY(${offsetY}px)`;
//   });

//   // touch end
//   offcanvas.addEventListener("touchend", () => {
//     if (!isDragging) return;
//     isDragging = false;
//     offcanvas.style.transition = "transform 0.3s ease";

//     // if (offsetY >= maxTranslateY - 10) {
//     //   const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
//     //   if (bsOffcanvas) bsOffcanvas.hide();
//     // } else {
//       lastTranslateY = offsetY; // сохраняем новое положение
//       offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
//     // }
//   });

//   // mouse для ПК
//   offcanvas.addEventListener("mousedown", (e) => {
//     startY = e.clientY - lastTranslateY;
//     isDragging = true;
//     offcanvas.style.transition = "none";
//   });

//   document.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     currentY = e.clientY;
//     offsetY = currentY - startY;
//     if (offsetY < minTranslateY) offsetY = minTranslateY;
//     if (offsetY > maxTranslateY) offsetY = maxTranslateY;
//     offcanvas.style.transform = `translateY(${offsetY}px)`;
//   });
  
//   document.addEventListener("mouseup", () => {
//     if (!isDragging) return;
//     isDragging = false;
//     offcanvas.style.transition = "transform 0.3s ease";

//     // if (offsetY >= maxTranslateY - 10) {
//     //   const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
//     //   if (bsOffcanvas) bsOffcanvas.hide();
//     // } else {
//       lastTranslateY = offsetY;
//       offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
//     // }
//   });

//   // сброс трансформации при открытии/закрытии
//   offcanvas.addEventListener("shown.bs.offcanvas", () => {
//     lastTranslateY = 0;
//     offcanvas.style.transform = "translateY(0)";
//   });
//   offcanvas.addEventListener("hidden.bs.offcanvas", () => {
//     lastTranslateY = 0;
//     offcanvas.style.transform = "translateY(0)";
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasSidebar");
  let startY = 0,
      currentY = 0,
      offsetY = 0,
      isDragging = false;
  
  let lastTranslateY = window.innerHeight * 0.5; // Стартовая высота панели: 50vh
  const handleHeight = 50; // ярлычок снизу
  const maxTranslateY = window.innerHeight * 0.9 - handleHeight; // максимум: 90vh - ярлычок
  const minTranslateY = 0; // полностью раскрыто (панель вверху)

  // --- Touch события ---
  offcanvas.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });

  offcanvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    offsetY = currentY - startY;
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  offcanvas.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY; // сохраняем текущее положение
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });

  // --- Mouse события для ПК ---
  offcanvas.addEventListener("mousedown", (e) => {
    startY = e.clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
    offsetY = currentY - startY;
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY;
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });

  // --- Сброс трансформации при открытии/закрытии Bootstrap ---
  offcanvas.addEventListener("shown.bs.offcanvas", () => {
    lastTranslateY = window.innerHeight * 0.5; // старт: 50vh
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });
  offcanvas.addEventListener("hidden.bs.offcanvas", () => {
    lastTranslateY = window.innerHeight * 0.5;
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });

  // --- Инициализация стартового положения ---
  offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
});
