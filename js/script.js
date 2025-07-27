$(function () {
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
  });
  // ナビをクリックしたらスムーススクロール
$('a[href^="#"]').click(function () {
  const speed = 500;
  const href = $(this).attr("href");
  const target = $(href === "#" || href === "" ? 'html' : href);
  const position = target.offset().top;
  $('html, body').animate({ scrollTop: position }, speed, "swing");
  return false;
});
$(function() {
  // 既存のスムーススクロールのコード
  $('a[href^="#"]').click(function () {
    const speed = 300; // 300ms (0.3秒)
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? 'html' : href);
    const position = target.offset().top;
    $('html, body').animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  // モーダルウィンドウのコード (省略)

  // スティッキーヘッダーの機能を追加
  const $header = $('.header'); // ヘッダー要素を取得
  const headerHeight = $header.outerHeight(); // ヘッダーの高さを取得

  // ページのスクロールを監視する
  $(window).on('scroll', function() {
      // 現在のスクロール量を取得
      const scrollPosition = $(this).scrollTop();

      // もし現在のスクロール量がヘッダーの高さより大きくなったら
      if (scrollPosition > headerHeight) {
          // ヘッダーに 'is-fixed' クラスを追加
          $header.addClass('is-fixed');
      } else {
          // そうでなければ 'is-fixed' クラスを削除
          $header.removeClass('is-fixed');
      }
  });

}); // $(function() { ... }); の閉じ括弧