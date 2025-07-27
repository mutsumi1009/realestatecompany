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
  const speed = 600;
  const href = $(this).attr("href");
  const target = $(href === "#" || href === "" ? 'html' : href);
  const position = target.offset().top;
  $('html, body').animate({ scrollTop: position }, speed, "swing");
  return false;
});