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
  const $trigger = $('.hamburger-trigger');
  const $hamburger = $('#hamburger-block');
  const $navSp = $('.header__nav-sp');
  const $hamburgerBg = $('#hamburger-bg');
  
  $trigger.on('click', function() {
    $hamburger.toggleClass('is-open');
    $navSp.toggleClass('is-open');
    $hamburgerBg.toggleClass('is-open');
  });

  // --- 3. ヘッダーの背景色切り替え---
  const $header = $('.js-header');
  const $fv = $('.fv');

  if ($header.length > 0 && $fv.length > 0) {
    const changeHeaderBg = () => {
      const fvBottom = $fv.offset().top + $fv.outerHeight();
      
      if ($(window).scrollTop() > fvBottom) {
        $header.css('background-color', '#4D9600');
      } else {
        $header.css('background-color', 'transparent');
      }
    };
    
    $(window).on('scroll resize', changeHeaderBg);
    changeHeaderBg();
  }
  
  //--- 4. モーダル機能の記述を、外側のブロックに移動 ---
  const $modalOpen = $('.works__item');
  const $modalClose = $('.js-modal-close');
  const $modalArea = $('.js-modal');

  $modalOpen.on('click', function() {
      const data = $(this).data('modal');
      const $modalImg = $('#modal-img');
      const $modalText = $('#modal-text');

      // data属性から取得した値をセット
      $modalImg.attr('src', data.img_src);
      $modalImg.attr('alt', data.title);
      $modalText.html(`<strong>${data.title}</strong>`);

      $modalArea.addClass('is-active');
      $('body').css('overflow', 'hidden');
  });

  $modalClose.on('click', function() {
      $modalArea.removeClass('is-active');
      $('body').css('overflow', '');
  });
}); 


  // --- 5. TOPへ戻る---
  $(function () {
    // ... (既存のコード) ...

    // --- 5. トップに戻るボタンの表示/非表示 ---
    const $toTopBtn = $('.js-to-top');

    // スクロールイベントを監視
    $(window).on('scroll', function() {
        // ページのトップから100px以上スクロールしたらボタンを表示
        if ($(this).scrollTop() > 100) {
            $toTopBtn.addClass('is-show');
        } else {
            $toTopBtn.removeClass('is-show');
        }
    });

    // ボタンをクリックしたらページトップへスムーズにスクロール
    $toTopBtn.on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: 0
        }, 500); // 500msかけてスクロール
    });

});