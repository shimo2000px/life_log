function startCountAnimation(element, counter, likesBlock, heartIcon, heartsContainer, target, index) {
  const delay = index * 200;
  
  const animationTimeout = setTimeout(() => {
    
    // 既存のCSSアニメーションクラスを使用
    if (likesBlock) {
      likesBlock.classList.add('animating');
    }
    
    // 数字カウントアニメーション
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 50));
    const intervalTime = Math.max(20, Math.min(50, 1500 / target));
    
    const timer = setInterval(() => {
      try {
        current += increment;
        
        if (current >= target) {
          // 最終値を確実に設定（1,000区切り）
          if (counter) {
            counter.textContent = target.toLocaleString();
          }
          clearInterval(timer);
          
          
          // 最終アニメーション（既存デザインを維持）
          setTimeout(() => {
            try {
              if (heartIcon) {
                // 既存のCSSクラスを使用
                heartIcon.classList.add('liked');
                // data-liked属性があればそれを使用、なければ♥
                heartIcon.textContent = heartIcon.dataset.liked || '♥';
              }
              
              if (likesBlock) {
                likesBlock.classList.remove('animating');
              }
              
            } catch (error) {
            }
          }, 200);
        } else {
          if (counter) {
            counter.textContent = current.toLocaleString();
          }
        }
      } catch (error) {
        clearInterval(timer);
      }
    }, intervalTime);
    
    // タイマーの参照を保存
    if (element) {
      element.dataset.timerId = timer;
    }
    
    // ハート爆発アニメーション（既存のheartsContainerを使用）
    if (heartsContainer && target > 0) {
      try {
        animateExplodingHearts(heartsContainer, target);
      } catch (error) {
      }
    }
    
  }, delay);
  
  // タイムアウトの参照を保存
  if (element) {
    element.dataset.timeoutId = animationTimeout;
  }
}

// ハート爆発アニメーション（既存デザインに合わせて調整）
function animateExplodingHearts(heartsContainer, likesCount) {
  const heartCount = Math.min(Math.ceil(likesCount / 100), 8); // 少し控えめに
  
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.textContent = '♥';
      heart.className = 'exploding-heart'; // 既存のCSSクラスを使用
      
      // ランダムな位置と動き（既存デザインに合わせて調整）
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = -(Math.random() * 25 + 15);
      const randomRotation = Math.random() * 360;
      
      heart.style.cssText = `
        position: absolute;
        color: #ff3040;
        font-size: ${10 + Math.random() * 4}px;
        pointer-events: none;
        z-index: 1001;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        animation: flyHeartSimple 1.2s ease-out forwards;
        --random-x: ${randomX}px;
        --random-y: ${randomY}px;
        --random-rotation: ${randomRotation}deg;
      `;
      
      heartsContainer.appendChild(heart);
      
      // ハートを自動削除
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 1200);
    }, i * 80);
  }
}

// 既存のアニメーションをクリア
function clearExistingAnimations(element) {
  // タイマーをクリア
  if (element.dataset.timerId) {
    clearInterval(parseInt(element.dataset.timerId));
    delete element.dataset.timerId;
  }
  
  // タイムアウトをクリア
  if (element.dataset.timeoutId) {
    clearTimeout(parseInt(element.dataset.timeoutId));
    delete element.dataset.timeoutId;
  }
  
  // アニメーションクラスをリセット
  element.classList.remove('animated');
  
  const likesBlock = element.querySelector('.likes-block');
  if (likesBlock) {
    likesBlock.classList.remove('animating');
  }
  
  const heartIcon = element.querySelector('.heart-icon');
  if (heartIcon) {
    heartIcon.classList.remove('liked');
  }
  
  const counter = element.querySelector('.likes-count');
  if (counter) {
    counter.textContent = '0';
  }
}

// 自動初期化関数（改良版）
function initializeLikesCounters() {
  
  // 投稿一覧ページでのみ実行
  if (!window.location.pathname.includes('/posts') && 
      window.location.pathname !== '/') {
    return;
  }
  
  // 全ての要素を取得
  const allElements = document.querySelectorAll('.likes-counter-instagram');
  
  if (allElements.length === 0) {
    return;
  }
  
  // 未初期化の要素のみフィルタリング
  const elements = Array.from(allElements).filter(element => {
    return !element.classList.contains('animated');
  });
  
  
  if (elements.length === 0) {
    return;
  }

    elements.forEach((element, index) => {
    
    try {
      // 既存のアニメーションをクリア（安全のため）
      clearExistingAnimations(element);
      
      // data-target属性から値を取得
      const targetFromData = element.dataset.target;
      const targetFromAttr = element.getAttribute('data-target');
      
      
      // 値を数値に変換
      let likes = 0;
      const rawValue = targetFromData || targetFromAttr;
      
      if (rawValue !== null && rawValue !== undefined && rawValue !== '') {
        likes = parseInt(rawValue);
        if (isNaN(likes)) {
          likes = 0;
        } else {
        }
      } else {
      }
      
      // 要素を取得（既存のクラス名を使用）
      const counter = element.querySelector('.count'); // 既存デザインに合わせて変更
      const likesBlock = element.querySelector('.likes-block');
      const heartIcon = element.querySelector('.heart-icon');
      const heartsContainer = element.querySelector('.hearts-container');
      
 
      
      // 必須要素チェック
      if (!counter) {
        return;
      }
      
      // アニメーション実行（0以上の場合）
      if (likes >= 0) {
        
        // 初期化済みマークを先に付ける（重複実行防止）
        element.classList.add('animated');
        
        if (likes > 0) {
          // アニメーション実行
          startCountAnimation(element, counter, likesBlock, heartIcon, heartsContainer, likes, index);
        } else {
          // いいね数が0の場合は即座に完了状態にする
          counter.textContent = '0';
        }
      } else {
      }
      
    } catch (error) {
      // エラーが発生しても他の要素の処理は続行
    }
  });
  
}

// ページ読み込み時の初期化システム
function setupLikesAnimation() {
  
  // 重複実行防止フラグ
  if (window.likesAnimationSetup) {
    return;
  }
  window.likesAnimationSetup = true;
  
  // 初期化関数のラッパー（エラーハンドリング付き）
  function safeInitialize() {
    try {
      initializeLikesCounters();
    } catch (error) {
    }
  }
  
  // DOMContentLoaded後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(safeInitialize, 100);
    });
  } else {
    // 既に読み込み済みの場合は即座に実行
    setTimeout(safeInitialize, 100);
  }
  
  // Turbo対応（Rails 7の場合）
  document.addEventListener('turbo:load', () => {
    setTimeout(safeInitialize, 100);
  });
  
  // 従来のTurbolinks対応
  document.addEventListener('turbolinks:load', () => {
    setTimeout(safeInitialize, 100);
  });
  
  // ページ離脱時のクリーンアップ
  window.addEventListener('beforeunload', () => {
    
    // 全てのアニメーションをクリア
    const elements = document.querySelectorAll('.likes-counter-instagram');
    elements.forEach(element => {
      try {
        clearExistingAnimations(element);
      } catch (error) {
      }
    });
    
    // セットアップフラグをリセット
    window.likesAnimationSetup = false;
  });
}

// 必要最小限のCSSアニメーション（既存デザインを補完）- 続き
function injectMinimalCSS() {
  // 既に追加済みかチェック
  if (document.getElementById('likes-animation-minimal-styles')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'likes-animation-minimal-styles';
  style.textContent = `
    /* 飛び散るハート用の最小限CSS（既存デザインを補完） */
    @keyframes flyHeartSimple {
      0% {
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: translate(
          calc(-50% + var(--random-x)), 
          calc(-50% + var(--random-y))
        ) scale(1.2) rotate(calc(var(--random-rotation) * 0.5));
        opacity: 0.8;
      }
      100% {
        transform: translate(
          calc(-50% + var(--random-x) * 1.5), 
          calc(-50% + var(--random-y) * 2)
        ) scale(0.3) rotate(var(--random-rotation));
        opacity: 0;
      }
    }
    
    /* 数値カウントのスムーズ変更 */
    .likes-block .count {
      transition: all 0.1s ease;
    }
  `;
  
  document.head.appendChild(style);
}

// メイン実行関数
function main() {
  
  try {
    // 最小限CSSを注入
    injectMinimalCSS();
    
    // アニメーションシステムをセットアップ
    setupLikesAnimation();
    
  } catch (error) {
  }
}

// 即座に実行（スクリプト読み込み時）
main();

// グローバルに公開（デバッグ用）
window.likesAnimationDebug = {
  initialize: initializeLikesCounters,
  clearAnimations: (selector = '.likes-counter-instagram') => {
    document.querySelectorAll(selector).forEach(clearExistingAnimations);
  },
  reinitialize: () => {
    window.likesAnimationSetup = false;
    setupLikesAnimation();
  },
  // 新しいデバッグ機能
  testAnimation: (likesCount = 150) => {
    const testElement = document.querySelector('.likes-counter-instagram');
    if (testElement) {
      clearExistingAnimations(testElement);
      testElement.dataset.target = likesCount;
      initializeLikesCounters();
    } else {
    }
  }
};
