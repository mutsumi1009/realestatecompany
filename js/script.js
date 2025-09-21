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
    $('body').removeClass('is-modal-open').css('overflow', ''); 
    $toTopBtn.removeClass('is-hidden-temp');                    
    onScrollToTop();                                            
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
  
    // --- TOPへ戻る：フッター直前で止める（持ち上げ）
  // 1) 念のため body 直下へ退避（footer内にあると重なり順で負ける）
  if ($toTopBtn.length && !$toTopBtn.parent().is('body')) {
    $toTopBtn.appendTo('body');
  }

  const $footer = $('footer');
  const mqSP = window.matchMedia('(max-width: 767px)');
  let prevLift = 0;

  function liftToAvoidFooter() {
    if (!$toTopBtn.length || !$footer.length) return;

    // PC時は解除（SPだけ適用）
    if (!mqSP.matches) {
      prevLift = 0;
      $toTopBtn.css('--lift', '0px');
      return;
    }

    const btnEl = $toTopBtn.get(0);
    const fRect = $footer.get(0).getBoundingClientRect();
    const btnH  = btnEl.getBoundingClientRect().height;

    // 「CSSの bottom 値」を基準に毎回計算（累積しない）
    const cs = getComputedStyle(btnEl);
    const bottomPx = (() => {
      const v = parseFloat(cs.bottom);
      return Number.isFinite(v) ? v : 96; // fallback: 6rem相当
    })();

    const SAFE_GAP = 3;   // フッターとの隙間
    const MAX_LIFT = 56;  // 持ち上げ上限（56〜96で好み調整）

    const intrude = window.innerHeight - fRect.top;          
    let lift = Math.max(0, intrude - (bottomPx + btnH + SAFE_GAP));
    lift = Math.min(lift, MAX_LIFT);

    const STEP = 2;
    lift = Math.ceil(lift / STEP) * STEP;
    if (Math.abs(lift - prevLift) < 2) return;

    prevLift = lift;
    $toTopBtn.css('--lift', `-${lift}px`);
  }

  // スクロール/リサイズ監視（rAFで軽く）
  let ticking = false;
  function scheduleLiftUpdate(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      liftToAvoidFooter();
      ticking = false;
    });
  }

  $(window).on('scroll resize load', scheduleLiftUpdate);

  // フッターの出入り境界でも更新
  if ($footer.length && 'IntersectionObserver' in window) {
    new IntersectionObserver(scheduleLiftUpdate, { threshold:[0,1] })
      .observe($footer.get(0));
  }

  // 初期実行
  liftToAvoidFooter();

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
