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

  // ページの読み込みが終わったら実行される
document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーとfvセクションの要素を取得
  const header = document.querySelector(".js-header");
  const fv = document.querySelector(".fv");

  // 要素がどちらか無ければ、処理を中止
  if (!header || !fv) return;

  // fvの下端の位置（画面の一番上からの距離）を取得する関数
  const getFvBottom = () => {
    const fvRect = fv.getBoundingClientRect(); // fvの現在の位置と大きさ
    return window.scrollY + fvRect.bottom;     // スクロール位置＋fvの下端位置
  };

  // スクロールしたときに呼ばれる関数
  const handleScroll = () => {
    const scrollY = window.scrollY;       // 現在のスクロール量（＝ヘッダーの上端）
    const fvBottom = getFvBottom();       // fvの下端の位置を取得

    // ヘッダーの上端がfvの下端より下になったら背景色をつける
    if (scrollY > fvBottom) {
      header.style.backgroundColor = "#4D9600"; // 緑色の背景にする
    } else {
      header.style.backgroundColor = "transparent"; // 透明に戻す
    }
  };

  // debounce関数：何度も連続で呼ばれる関数を、最後の1回だけにする
  const debounce = (func, delay = 100) => {
    let timer;
    return () => {
      clearTimeout(timer);          // 前のタイマーをキャンセル
      timer = setTimeout(func, delay); // 一定時間後に実行（最後の1回）
    };
  };

  // スクロールするたびにhandleScroll関数を実行
  window.addEventListener("scroll", handleScroll);

  // リサイズしたときにもhandleScrollを実行（ただし負荷を減らすためにdebounceする）
  window.addEventListener("resize", debounce(handleScroll, 100));

  // ページ読み込み直後にも一度判定しておく（すでにスクロールされている可能性があるため）
  handleScroll();
});

  //  ハンバーガーメニューの機能 ---
  // ハンバーガーアイコンとSP用ナビゲーションの開閉を制御。
  const $hamburger = $('#js-hamburger'); // ハンバーガーアイコン要素
  const $nav = $('#js-nav');             // SP用ナビゲーション要素

  $hamburger.on('click', function() {
    $(this).toggleClass('is-open'); // ハンバーガーアイコンの見た目を切り替える
    $nav.toggleClass('is-open');     // ナビゲーションの表示・非表示を切り替える
  });
// modalを開く

  // ページ読み込み直後にも一度スクロール処理を実行
  // これにより、リロード時などに正しいヘッダーの状態を維持
  $(window).trigger('scroll');
});
document.addEventListener('DOMContentLoaded', () => {
  // ... (モーダルを開く処理は省略)

  // 閉じるボタンとオーバーレイにイベントを追加
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
      const closeButton = modal.querySelector('.modal-close-button');
      const overlay = modal.querySelector('.modal-overlay');

      // 閉じる処理
      const closeModal = () => {
          modal.classList.remove('is-open');
          document.body.style.overflow = ''; // 背景のスクロールを有効化
      };

      // ボタンクリックで閉じる
      closeButton.addEventListener('click', closeModal);
      // オーバーレイクリックで閉じる
      overlay.addEventListener('click', closeModal);
  });
});