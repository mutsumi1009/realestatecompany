// js/script.js

$(function () {
  // --- FVスライダーのSlick設定 ---
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

  // --- ハンバーガーメニューの機能 ---
  const $trigger = $('.hamburger-trigger');
  const $hamburger = $('#hamburger-block');
  const $navSp = $('.header__nav-sp');
  const $hamburgerBg = $('#hamburger-bg');

  $trigger.on('click', function () {
    $hamburger.toggleClass('is-open');
    $navSp.toggleClass('is-open');
    $hamburgerBg.toggleClass('is-open');
    $toTopBtn.toggleClass('is-hidden-temp');
  });


  /*：閉じる関数 */
  function closeHamburger() {
    $hamburger.removeClass('is-open');
    $navSp.removeClass('is-open');
    $hamburgerBg.removeClass('is-open');
    $toTopBtn.removeClass('is-hidden-temp');
  }

  /* SPメニューのリンククリックで自動クローズ */
  $('.header__nav-sp a').on('click', function () {
    closeHamburger();               // ← メニューを閉じる
  });

  // --- ヘッダーの背景色切り替え ---
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

  // --- モーダル機能 ---

  let scrollPosition = 0;
  const $modalArea = $('.js-modal');

  // 開く：a.work-card をクリックした時だけ（委譲）
  $('.works__contents').on('click', 'a.work-card', function (e) {
    e.preventDefault(); // ← # へのジャンプ防止

    const $item = $(this).closest('.works__item');
    const data = $item.data('modal') || {};

    $('#modal-img').attr({ src: data.img_src || '', alt: data.title || '' });
    $('#modal-text').text(data.title || '');

    const $cap = $item.find('.works__caption').first().clone();
    $cap.find('br').remove(); 
    $('#modal-text').empty().append($cap);

    //  $modalArea.appendTo('body');
    $modalArea.addClass('is-active');
    scrollPosition = $(window).scrollTop();

    setTimeout(function() {
    $toTopBtn.addClass('is-hidden-temp');  // 一時的に隠す
    $('body').addClass('is-modal-open');
    $('body').css('overflow', 'hidden');   // 背景スクロール停止
  }, 0);
  });

  // 閉じる：× と 黒幕だけで閉じる（★置き換え）
  $(document).on('click', '.js-modal-close, .modal-bg', function () {
    $modalArea.removeClass('is-active');
    setTimeout(function () {
      $('body').removeClass('is-modal-open').css('overflow', '');
      $toTopBtn.removeClass('is-hidden-temp');
      onScrollToTop();
    }, 600);
  });


  // モーダル本体をクリックしても閉じない
  $(document).on('click', '.modal__item', function (e) {
    e.stopPropagation();
  });

  // Escapeキーで閉じる
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $modalArea.hasClass('is-active')) {
      $modalArea.removeClass('is-active');

      // （CSSアニメーション時間）後にbodyのスタイルをリセットする
      setTimeout(function () {
        $('body').removeClass('is-modal-open').css('overflow', '');
        $toTopBtn.removeClass('is-hidden-temp');
        onScrollToTop();
      }, 800);
    }
  });


  // --- TOPへ戻る（FVより下で表示） ---

  function onScrollToTop() {
    const y = $(window).scrollTop();
    const threshold = 100;
    if (y > threshold) $toTopBtn.addClass('is-show');
    else $toTopBtn.removeClass('is-show');
  }
  $(window).on('scroll resize load', onScrollToTop);
  onScrollToTop();


  $toTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500, 'linear');
  });
});

// --- スクロールでアニメーション発火 ---
AOS.init({
  once: true,
  duration: 900,
  offset: 150,
  easing: 'ease-out',
  startEvent: 'load',
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
});
window.addEventListener('load', () => AOS.refresh());


// --- PCでのみ電話番号リンク無効化 ---
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

