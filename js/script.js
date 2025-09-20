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


  /*：閉じる関数 */
  function closeHamburger() {
    $hamburger.removeClass('is-open');
    $navSp.removeClass('is-open');
    $hamburgerBg.removeClass('is-open');
  }

  /* SPメニューのリンククリックで自動クローズ */
  $('.header__nav-sp a').on('click', function () {
    closeHamburger();               // ← メニューを閉じる
  });

  // --- 3. ヘッダーの背景色切り替え ---
  const $header = $('.js-header');
  const $fv = $('.fv');
  const $toTopBtn = $('.js-to-top'); 

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
  const $modalArea = $('.js-modal');

  // 開く：a.work-card をクリックした時だけ（委譲）
  $('.works__contents').on('click', 'a.work-card', function (e) {
    e.preventDefault(); // ← # へのジャンプ防止

    const $item = $(this).closest('.works__item');
    const data = $item.data('modal') || {};

    $('#modal-img').attr({ src: data.img_src || '', alt: data.title || '' });
    $('#modal-text').text(data.title || '');

    $modalArea.appendTo('body');

    $modalArea.addClass('is-active');
    $toTopBtn.addClass('is-hidden-temp');  // 一時的に隠す
    $('body').addClass('is-modal-open');
    $('body').css('overflow', 'hidden');   // 背景スクロール停止（位置は維持）
  });

  // 閉じる：× と 黒幕だけで閉じる（★置き換え）
$(document).on('click', '.js-modal-close, .modal-bg', function () {
  $modalArea.removeClass('is-active');

  $('body').removeClass('is-modal-open').css('overflow', ''); 
  $toTopBtn.removeClass('is-hidden-temp');                    
  onScrollToTop();                                          
});


  // モーダル本体をクリックしても閉じない
  $(document).on('click', '.modal__item', function (e) {
    e.stopPropagation();
  });

 // Escapeキーで閉じる（★置き換え）
$(document).on('keydown', function (e) {
  if (e.key === 'Escape') {
    $modalArea.removeClass('is-active');
    $('body').removeClass('is-modal-open').css('overflow', ''); // クラスも解除
    $toTopBtn.removeClass('is-hidden-temp');                    // ★追加：TOPボタン再表示
    onScrollToTop();                                            // ★追加：現在位置で .is-show を付け直し
  }
});


  // --- 5. TOPへ戻る（FVより下で表示） ---
 
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
  startEvent: 'load',
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
});
window.addEventListener('load', () => AOS.refresh());


// --- 6.PCでのみ電話番号リンク無効化 ---
// ウィンドウの幅でPCかスマホを判定
const isMobile = window.matchMedia("(max-width: 767px)").matches;

// PCの場合のみリンクを無効化する
if (!isMobile) {
  const telLink = document.querySelector('.access__tel a');
  if (telLink) {
    telLink.removeAttribute('href');
    telLink.style.cursor = 'default'; // カーソルをデフォルトに戻す
  }
}
