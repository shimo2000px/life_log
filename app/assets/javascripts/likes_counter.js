// 開発用（編集・機能追加はこのファイルで行う）
// 動作確認後、public/assets/ にコピー
// 読み込みはpublic/assets/の方で行う

document.addEventListener('turbo:load', function() {
  document.querySelectorAll('.likes-counter-instagram:not(.animated)').forEach(function(element, index) {
    const counter = element.querySelector('.count');
    const heartsContainer = element.querySelector('.hearts-container');
    const likesBlock = element.querySelector('.likes-block');
    const heartIcon = element.querySelector('.heart-icon');
    const target = parseInt(element.dataset.target);
    
    if (!counter || !target || target <= 0) return;
    
    element.classList.add('animated');
    
    setTimeout(() => {
      // ★ ブロックにハートビートアニメーション追加 ★
      likesBlock.classList.add('animating');
      
      // 数字カウントアニメーション
      let current = 0;
      const increment = Math.ceil(target / 50);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
          
          // アニメーション終了
          setTimeout(() => {
            heartIcon.textContent = heartIcon.dataset.liked;
            heartIcon.classList.add('liked');
            likesBlock.classList.remove('animating');
          }, 200);
        } else {
          counter.textContent = current.toLocaleString();
        }
      }, 30);
      
      // ★ ハート爆発アニメーション ★
      if (heartsContainer) {
        animateExplodingHearts(heartsContainer, target);
      }
    }, index * 200);
  });
});

// ★ インスタ風ハート爆発アニメーション ★
function animateExplodingHearts(container, targetCount) {
  const heartCount = Math.min(Math.floor(targetCount / 50), 15); // より多くのハート
  
  if (heartCount <= 0) return;
  
  // ハート生成
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      createInstagramHeart(container, i, heartCount);
    }, i * 100);
  }
}

function createInstagramHeart(container, index, totalHearts) {
  const heart = document.createElement('span');
  const heartTypes = ['💖', '💕', '💗', '🧡', '💛', '💚', '💙', '💜', '❤️', '🤍'];
  heart.textContent = heartTypes[index % heartTypes.length];
  heart.className = 'exploding-heart';
  
  // 円形配置（より美しく分散）
  const angle = (Math.PI * 2 * index) / totalHearts + (Math.random() - 0.5) * 0.5;
  const distance = Math.random() * 100 + 80; // 80-180pxの距離
  const endX = Math.cos(angle) * distance;
  const endY = Math.sin(angle) * distance;
  
  heart.style.position = 'absolute';
  heart.style.left = '0px';
  heart.style.top = '0px';
  heart.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
  heart.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1001';
  heart.style.fontSize = (Math.random() * 10 + 18) + 'px'; // 18-28px
  heart.style.opacity = '1';
  
  container.appendChild(heart);
  
  // ★ 美しいアニメーション開始 ★
  setTimeout(() => {
    const rotation = (Math.random() - 0.5) * 720; // ランダム回転
    heart.style.transform = `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.2) rotate(${rotation}deg)`;
    heart.style.opacity = '0';
  }, 50);
  
  // 清掃
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 2050);
}