// Slider Swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: 1,
  spaceBetween: 50,
  autoHeight: true,
  // Responsive breakpoints
  breakpoints: {
      // when window width is >= 992px
      992: {
      slidesPerView: 2,
      },
  },

  // If we need pagination
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});