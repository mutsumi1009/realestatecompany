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

  // --- 2. スティッキーヘッダーと背景色変更の機能 ---
  // このブロックはヘッダーをスクロールで固定し、FVセクションを通り過ぎたら背景色を変更。
  const $header = $('.header'); // ヘッダー要素を取得 (headerクラスを持つ要素)
  const $fv = $('.fv');         // FVセクション要素を取得 (fvクラスを持つ要素)
  let headerHeight = $header.outerHeight(); // ヘッダーの現在の高さを取得
  const $body = $('body');      // body要素を取得

  let headerOffsetTop = $header.offset().top; // ページ上部からのヘッダーの初期位置
  let fvBottomPosition = 0; // FVセクションの下端のY座標

  // FVの下端位置を計算する関数
  // スクロールするたびに正確な位置を取得するために関数化しています。
  function calculateFvBottom() {
    if ($fv.length) {
      fvBottomPosition = $fv.offset().top + $fv.outerHeight();
    }
  }

  // ウィンドウのリサイズ時とページロード時に各種オフセットとヘッダー高さを更新します。
  // これにより、画面サイズが変わっても正確な位置で機能が動作するようになります。
  $(window).on('load resize', function () {
    headerHeight = $header.outerHeight(); // ヘッダーの高さを再取得

    // ヘッダーが既に固定されている場合、一旦固定を解除して正しい初期位置を再計算します。
    if ($header.hasClass('is-fixed')) {
      $header.removeClass('is-fixed');
      $body.css('padding-top', '0px'); // bodyの余白も一時的にリセット
      headerOffsetTop = $header.offset().top; // fixedを外して再度オフセットを取得
      $(window).trigger('scroll'); // 現在のスクロール位置で再評価を促す
    } else {
      $body.css('padding-top', '0px'); // fixedでない場合はpadding-topは不要
      headerOffsetTop = $header.offset().top; // ヘッダーの初期位置を再計算
    }
    calculateFvBottom(); // FVの下端位置を更新
  });

  // 初期ロード時にもFV下端を一度取得しておきます。
  calculateFvBottom();

  // スクロールイベントが発生するたびに実行される関数
  $(window).on('scroll', function () {
    const scrollPosition = $(this).scrollTop(); // 現在のスクロール位置 (ページの最上部からの距離)

    // ヘッダーを固定するかどうかのロジック
    // スクロール位置がヘッダーの初期位置を超えたら「is-fixed」クラスを付与して固定します。
    if (scrollPosition >= headerOffsetTop) {
      if (!$header.hasClass('is-fixed')) {
        $header.addClass('is-fixed');
        // ヘッダーがfixedになったら、その高さ分コンテンツが隠れないようにbodyにpadding-topを設定します。
        $body.css('padding-top', headerHeight + 'px');
      }
    } else {
      // ヘッダーの初期位置よりも上に戻ったら固定を解除します。
      if ($header.hasClass('is-fixed')) {
        $header.removeClass('is-fixed');
        $body.css('padding-top', '0px'); // 固定解除したらpadding-topをリセット
      }
    }

    // ヘッダーの背景色変更のロジック (FVセクションの下端を基準)
    // スクロール位置がFVセクションの下端を超えたら背景色を緑に、そうでなければ透明にします。
    if (scrollPosition > fvBottomPosition) {
      $header.css('background-color', '#4D9600'); // 緑色の背景にする
    } else {
      $header.css('background-color', 'transparent'); // 透明に戻す
    }


    // --- 3. スクロールに応じたナビゲーションのアクティブ状態更新 ---
    // 現在表示されているセクションに応じて、ナビゲーションメニューのリンクに「is-active」クラスを付与します。
    $('.header__nav-list li a').each(function () {
      const targetId = $(this).attr('href'); // リンクのhref属性（例: #about）
      if (targetId && targetId !== '#') { // 有効なIDを持つリンクのみ処理
        const $targetSection = $(targetId); // リンク先のセクション要素
        if ($targetSection.length) { // セクションが存在するか確認
          // ターゲットセクションの開始位置を計算 (ヘッダーの高さ分を考慮して少し上から判定)
          const targetSectionTop = $targetSection.offset().top - headerHeight - 1;

          // ターゲットセクションの終了位置を計算 (次のセクションの開始位置、またはドキュメントの最後まで)
          const targetSectionBottom = $targetSection.next().length ? $targetSection.next().offset().top - headerHeight - 1 : $(document).height();

          // 現在のスクロール位置がセクションの範囲内であれば、そのリンクをアクティブにします。
          if (scrollPosition >= targetSectionTop && scrollPosition < targetSectionBottom) {
            $('.header__nav-list li').removeClass('is-active'); // 他のアクティブを解除
            $(this).parent('li').addClass('is-active');         // 現在のリンクをアクティブに
          }
        }
      }
    });
  });

  // --- 4. ナビをクリックしたらスムーススクロール & アクティブクラス切り替え ---
  // ページ内リンク（#から始まるリンク）がクリックされたときに、滑らかにスクロールさせます。
  $('a[href^="#"]').click(function (e) {
    e.preventDefault(); // デフォルトのアンカーリンク動作を無効化

    const speed = 300; // スクロール速度（ミリ秒）
    const href = $(this).attr("href"); // クリックされたリンクのhref属性

    // hrefが「#」または空の場合は、ページ最上部にスクロールします。
    if (href === "#" || href === "") {
        $('html, body').animate({ scrollTop: 0 }, speed, "swing");
        $('.header__nav-list li').removeClass('is-active'); // 全てのアクティブを解除
        return false;
    }

    const $target = $(href); // リンク先の要素
    if ($target.length) { // ターゲット要素が存在する場合
        const position = $target.offset().top - headerHeight; // ヘッダーの高さ分を考慮したスクロール位置
        $('html, body').animate({ scrollTop: position }, speed, "swing"); // アニメーションスクロール

        // クリックされたリンクをアクティブに設定します。
        $('.header__nav-list li').removeClass('is-active');
        $(this).parent('li').addClass('is-active');

        // SPナビが開いている場合は閉じます。
        $('#js-hamburger').removeClass('is-open');
        $('#js-nav').removeClass('is-open');
    }
    return false;
  });

  // --- 5. ハンバーガーメニューの機能 ---
  // ハンバーガーアイコンとSP用ナビゲーションの開閉を制御します。
  const $hamburger = $('#js-hamburger'); // ハンバーガーアイコン要素
  const $nav = $('#js-nav');             // SP用ナビゲーション要素

  $hamburger.on('click', function() {
    $(this).toggleClass('is-open'); // ハンバーガーアイコンの見た目を切り替える
    $nav.toggleClass('is-open');     // ナビゲーションの表示・非表示を切り替える
  });

  // ページ読み込み直後にも一度スクロール処理を実行（すでにスクロールされている可能性があるため）
  // これにより、リロード時などに正しいヘッダーの状態を維持します。
  $(window).trigger('scroll');
});