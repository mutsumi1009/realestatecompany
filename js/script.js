// js/script.js

// すべてのコードをこのブロックにまとめることで、DOM読み込み後の実行を保証
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
  // 教材のように、共通のクラスを使って処理をまとめる
  const $trigger = $('.hamburger-trigger');
  const $hamburger = $('#hamburger-block');
  const $navSp = $('.header__nav-sp');
  const $hamburgerBg = $('#hamburger-bg');
  
  $trigger.on('click', function() {
    $hamburger.toggleClass('is-open');
    $navSp.toggleClass('is-open');
    $hamburgerBg.toggleClass('is-open');
  });

  // --- 3. ヘッダーの背景色切り替え機能（jQueryで統一）---
  const $header = $('.js-header');
  const $fv = $('.fv');

  // 要素が存在するか確認
  if ($header.length > 0 && $fv.length > 0) {
    const changeHeaderBg = () => {
      // .fvセクションの下端の位置を計算
      const fvBottom = $fv.offset().top + $fv.outerHeight();
      
      // スクロール位置が.fvセクションの下端を越えたら
      if ($(window).scrollTop() > fvBottom) {
        $header.css('background-color', '#4D9600');
      } else {
        $header.css('background-color', 'transparent');
      }
    };
    
    // スクロールとリサイズ時にイベントを発火
    $(window).on('scroll resize', changeHeaderBg);
    
    // ページ読み込み時に一度実行
    changeHeaderBg();
  }
  
  // --- 4. モーダル機能---
  $('[data-modal-target]').on('click', function() {
    const targetId = $(this).data('modal-target');
    $(targetId).addClass('is-open');
    $('body').css('overflow', 'hidden'); // 背景のスクロールを無効化
  });

  $('.modal-close-button, .modal-overlay').on('click', function() {
    $(this).closest('.modal').removeClass('is-open');
    $('body').css('overflow', ''); // 背景のスクロールを有効化
  });
});