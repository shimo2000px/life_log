<!-- aria-hidden属性とフォーカスの競合 モーダル1つのみのためhtml埋め込み -->
document.addEventListener('DOMContentLoaded', function() {
  const usageModal = document.getElementById('usageModal');
  
  if (usageModal) {
    usageModal.addEventListener('hide.bs.modal', function() {
      if (document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    });
  }
});




<!-- 背景色クリーンアップ -->
document.addEventListener('turbo:load', function() {
  
  const usageModal = document.getElementById('usageModal');
  
  if (usageModal) {
    // モーダルが開いた時
    usageModal.addEventListener('show.bs.modal', function() {
    });
    
    // モーダルが完全に開いた時
    usageModal.addEventListener('shown.bs.modal', function() {
    });
    
    // モーダルが閉じる瞬間
    usageModal.addEventListener('hide.bs.modal', function() {
    });
    
    // モーダルが完全に閉じた後にクリーンアップ
    usageModal.addEventListener('hidden.bs.modal', function() {
      setTimeout(forceModalCleanup, 200);
    });
  }
});

// ページ遷移前の強制クリーンアップ
document.addEventListener('turbo:before-visit', function() {
  forceModalCleanup();
});

// 強制クリーンアップ関数
function forceModalCleanup() {
  
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.backgroundColor = '';
  
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.remove();
  });
  
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (!modal.classList.contains('show')) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  });
  
}

// 修正された監視機能（開発時のみ）
if (window.location.hostname === 'localhost') {
  setInterval(function() {
    const activeModals = document.querySelectorAll('.modal.show').length;
    const backdropsCount = document.querySelectorAll('.modal-backdrop').length;
    const hasModalOpen = document.body.classList.contains('modal-open');
    
    // 🔧 修正：アクティブなモーダルがあるのに背景が複数ある場合のみ異常と判定
    if (activeModals > 0 && backdropsCount > 1) {
      
      // 余分な背景のみ削除（最初の1つは残す）
      const backdrops = document.querySelectorAll('.modal-backdrop');
      for (let i = 1; i < backdrops.length; i++) {
        backdrops[i].remove();
      }
    }
    // アクティブなモーダルがないのに残骸がある場合
    else if (activeModals === 0 && (hasModalOpen || backdropsCount > 0)) {
      forceModalCleanup();
    }
  }, 500); // 0.5秒ごとにチェック
}