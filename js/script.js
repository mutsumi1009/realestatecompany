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

  // スティッキーヘッダーの機能
  const $header = $('.header'); // ヘッダー要素を取得
  let headerHeight = $header.outerHeight(); // ヘッダーの高さを取得
  const $body = $('body'); // body要素を取得
  const $aboutSection = $('#about'); // ABOUTセクション要素を取得 (HTMLにid="about"があることを確認)

  let headerOffsetTop = $header.offset().top; // ヘッダーの初期位置 (画面上部からの距離)
  let aboutOffsetTop = 0; // ABOUTセクションの上端のY座標

  // ABOUTセクションのオフセットトップを計算
  function getAboutOffset() {
    if ($aboutSection.length) {
      aboutOffsetTop = $aboutSection.offset().top;
    }
  }

  // windowリサイズ時、ロード時に各種オフセットを更新
  $(window).on('load resize', function () {
    headerHeight = $header.outerHeight(); // ヘッダーの高さを取得
    headerOffsetTop = $header.offset().top; // ヘッダーの初期位置を再計算
    getAboutOffset(); // ABOUTセクションのオフセットトップを更新

    // リサイズ時はis-fixedの状態を一旦リセットして再評価する
    // これにより、headerOffsetTopの計算が正確になる
    if ($header.hasClass('is-fixed')) {
      $header.removeClass('is-fixed');
      $body.css('padding-top', '0px');
      headerOffsetTop = $header.offset().top; // fixedを外して再度オフセットを取得
      // そして現在のスクロール位置で再評価を促すため、スクロールイベントを強制発火させる
      $(window).trigger('scroll');
    } else {
      // fixedでない場合はpadding-topは不要 (bodyのpadding-topをCSSで0に戻しておくこと)
      $body.css('padding-top', '0px'); // 念のため0に設定
    }
  });

  // 初期ロード時にも一度取得
  getAboutOffset();

  // スクロール時の処理
  $(window).on('scroll', function () {
    const scrollPosition = $(this).scrollTop(); // 現在のスクロール位置

    // // ヘッダーを固定するかどうかのロジック
    // // スクロール位置がヘッダーの初期位置を超えたら固定
    // if (scrollPosition >= headerOffsetTop) {
    //   if (!$header.hasClass('is-fixed')) {
    //     $header.addClass('is-fixed');
    //     // ヘッダーがfixedになったら、コンテンツが隠れないようにbodyにpadding-topを設定
    //     $body.css('padding-top', headerHeight + 'px');
    //   }
    // } else {
    //   // ヘッダーの初期位置よりも上に戻ったら固定を解除
    //   if ($header.hasClass('is-fixed')) {
    //     $header.removeClass('is-fixed');
    //     $body.css('padding-top', '0px'); // 固定解除したらpadding-topをリセット
    //   }
    // }

    // ヘッダーの背景色変更のロジック (ヘッダーが固定されていて、かつABOUTエリアまでスクロールしたら)
    // このロジックはヘッダーがis-fixedクラスを持っている場合にのみ評価されるようにします
    if ($header.hasClass('is-fixed')) {
        if (scrollPosition >= aboutOffsetTop) {
            if (!$header.hasClass('has-background')) {
                $header.addClass('has-background');
            }
        } else {
            if ($header.hasClass('has-background')) {
                $header.removeClass('has-background');
            }
        }
    } else {
        // ヘッダーがfixedでない場合は、has-backgroundクラスも必ず外しておく
        if ($header.hasClass('has-background')) {
            $header.removeClass('has-background');
        }
    }


    // スクロールに応じたナビゲーションのアクティブ状態更新
    $('.header__nav-list li a').each(function () {
      const targetId = $(this).attr('href');
      if (targetId && targetId !== '#') {
        const $targetSection = $(targetId);
        if ($targetSection.length) {
          // ターゲットセクションの開始位置を計算 (ヘッダーの高さ分を考慮)
          const targetSectionTop = $targetSection.offset().top - headerHeight - 1; // -1は微調整用

          // ターゲットセクションの終了位置を計算 (次のセクションの開始位置 - ヘッダーの高さ分 - 1)
          // もし次のセクションがない場合は、スクロールの最後までそのセクションがアクティブになる
          const targetSectionBottom = $targetSection.next().length ? $targetSection.next().offset().top - headerHeight - 1 : $(document).height();

          if (scrollPosition >= targetSectionTop && scrollPosition < targetSectionBottom) {
            $('.header__nav-list li').removeClass('is-active');
            $(this).parent('li').addClass('is-active');
          }
        }
      }
    });
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
        const position = $target.offset().top - headerHeight; // スムーススクロール時もヘッダーの高さを考慮
        $('html, body').animate({ scrollTop: position }, speed, "swing");

        // クリック時にもis-activeクラスを切り替えます
        $('.header__nav-list li').removeClass('is-active');
        $(this).parent('li').addClass('is-active');
    }
    return false;
  });

});
// hamburger
const hamburger = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open');
  nav.classList.toggle('is-open');
});


