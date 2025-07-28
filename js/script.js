$(function () {
  // FVスライダーのSlick設定
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

  // スティッキーヘッダーと背景色変更の機能
  const $header = $('.header'); // ヘッダー要素を取得
  let headerHeight = $header.outerHeight(); // ヘッダーの高さを取得
  const $body = $('body'); // body要素を取得
  const $aboutSection = $('#about'); // ABOUTセクション要素を取得 (HTMLにid="about"があることを確認)

  let aboutOffsetTop = 0; // ABOUTセクションの上端のY座標

  // ABOUTセクションのオフセットトップを計算
  function getAboutOffset() {
    if ($aboutSection.length) {
      aboutOffsetTop = $aboutSection.offset().top;
    }
  }

  // windowリサイズ時、ロード時にヘッダーの高さとABOUTのオフセットトップを更新
  // ヘッダーは常にfixedなので、初期ロードとリサイズ時にbodyのpadding-topを設定
  $(window).on('load resize', function () {
    headerHeight = $header.outerHeight(); // ヘッダーの高さを取得
    getAboutOffset(); // ABOUTセクションのオフセットトップを更新
    $body.css('padding-top', headerHeight + 'px'); // bodyにpadding-topを設定
  });
  getAboutOffset(); // 初期ロード時にも一度取得

  // スクロール時の処理
  $(window).on('scroll', function () {
    const scrollPosition = $(this).scrollTop();

    // ヘッダーの背景色変更のロジック (ABOUTエリアまでスクロールしたら)
    if (scrollPosition >= aboutOffsetTop) {
      // ABOUTエリアまでスクロールしたら背景色クラスを追加
      if (!$header.hasClass('has-background')) {
        $header.addClass('has-background');
      }
    } else {
      // ABOUTエリアよりも上なら背景色クラスを削除
      if ($header.hasClass('has-background')) {
        $header.removeClass('has-background');
      }
    }

  });

  // ナビをクリックしたらスムーススクロール & アクティブクラス切り替え
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();

    const speed = 300;
    const href = $(this).attr("href");
    if (href === "#" || href === "") {
      $('html, body').animate({ scrollTop: 0 }, speed, "swing");
      $('.header__nav-list li').removeClass('is-active');
      return false;
    }

    const $target = $(href);
    if ($target.length) {
      const position = $target.offset().top - headerHeight;
      $('html, body').animate({ scrollTop: position }, speed, "swing");

      $('.header__nav-list li').removeClass('is-active');
      $(this).parent('li').addClass('is-active');
    }
    return false;
  });

})