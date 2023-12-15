let mySlider;
function createSwiper() {
  mySlider = new Swiper(".swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    keyboard: true,
    freeMode: true,
    centeredSlides: false,
    mousewheel: false,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1920: {
        slidesPerView: 3
      }
    },
    speed: 300
  });
}
createSwiper();