// js/script.js
$(function () {
  // --- 1. FVスライダーのSlick設定 ---
  $('.fv__slider').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'linear'
  }); 

  // --- 2. ハンバーガーメニューの機能 ---
  const $trigger = $('.hamburger-trigger');
  const $hamburger = $('#hamburger-block');
  const $navSp = $('.header__nav-sp');
  const $hamburgerBg = $('#hamburger-bg');

  $trigger.on('click', function () {
    $hamburger.toggleClass('is-open');
    $navSp.toggleClass('is-open');
    $hamburgerBg.toggleClass('is-open');
  });

  // --- 3. ヘッダーの背景色切り替え ---
  const $header = $('.js-header');
  const $fv = $('.fv');

  function changeHeaderBg() {
    if (!$header.length || !$fv.length) return;
    const fvBottom = $fv.offset().top + $fv.outerHeight();
    if ($(window).scrollTop() > fvBottom) {
      $header.css('background-color', '#4D9600');
    } else {
      $header.css('background-color', 'transparent');
    }
  }
  $(window).on('scroll resize load', changeHeaderBg);
  changeHeaderBg();

  // --- 4. モーダル機能 ---
  const $modalOpen = $('.works__item');
  const $modalClose = $('.js-modal-close');
  const $modalArea  = $('.js-modal');

  $modalOpen.on('click', function () {
    const data = $(this).data('modal');
    $('#modal-img').attr({ src: data.img_src, alt: data.title });
    $('#modal-text').html(`<strong>${data.title}</strong>`);
    $modalArea.addClass('is-active');
    $('body').css('overflow', 'hidden');
  });

  $modalClose.on('click', function () {
    $modalArea.removeClass('is-active');
    $('body').css('overflow', '');
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $modalArea.removeClass('is-active');
      $('body').css('overflow', '');
    }
  });


  // --- 6. TOPへ戻る（FVより下で表示） ---
  const $toTopBtn = $('.js-to-top');
  function fvHeight() { return $fv.length ? $fv.outerHeight() : 200; }
  function onScrollToTop() {
    const y = $(window).scrollTop();
    if (y > fvHeight()) $toTopBtn.addClass('is-show');
    else $toTopBtn.removeClass('is-show');
  }
  $(window).on('scroll resize load', onScrollToTop);
  onScrollToTop();

  $toTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
}); 

AOS.init({
  once: true,
  duration: 900,              
  offset: 150,                 
  easing: 'ease-out',
  startEvent: 'load',         // 画像レイアウト確定後に初期化
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
});
// 画像やスライダーの影響で位置がズレるのを再計算
window.addEventListener('load', () => AOS.refresh());


