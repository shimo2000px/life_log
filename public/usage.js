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
  console.log('🔧 Page loaded - Setup modal handlers');
  
  const usageModal = document.getElementById('usageModal');
  
  if (usageModal) {
    // モーダルが開いた時
    usageModal.addEventListener('show.bs.modal', function() {
      console.log('✅ Modal opening...');
    });
    
    // モーダルが完全に開いた時
    usageModal.addEventListener('shown.bs.modal', function() {
      console.log('✅ Modal opened successfully');
    });
    
    // モーダルが閉じる瞬間
    usageModal.addEventListener('hide.bs.modal', function() {
      console.log('🔧 Modal hiding - Starting cleanup');
    });
    
    // モーダルが完全に閉じた後にクリーンアップ
    usageModal.addEventListener('hidden.bs.modal', function() {
      console.log('🔧 Modal hidden - Force cleanup');
      setTimeout(forceModalCleanup, 200);
    });
  }
});

// ページ遷移前の強制クリーンアップ
document.addEventListener('turbo:before-visit', function() {
  console.log('🔧 Page leaving - Force cleanup');
  forceModalCleanup();
});

// 強制クリーンアップ関数
function forceModalCleanup() {
  console.log('🧹 Executing force cleanup...');
  
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.backgroundColor = '';
  
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    console.log('🗑️ Removing backdrop:', backdrop);
    backdrop.remove();
  });
  
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (!modal.classList.contains('show')) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  });
  
  console.log('✅ Force cleanup completed');
  console.log('Body classes:', document.body.className);
  console.log('Remaining backdrops:', document.querySelectorAll('.modal-backdrop').length);
}

// 修正された監視機能（開発時のみ）
if (window.location.hostname === 'localhost') {
  setInterval(function() {
    const activeModals = document.querySelectorAll('.modal.show').length;
    const backdropsCount = document.querySelectorAll('.modal-backdrop').length;
    const hasModalOpen = document.body.classList.contains('modal-open');
    
    // 🔧 修正：アクティブなモーダルがあるのに背景が複数ある場合のみ異常と判定
    if (activeModals > 0 && backdropsCount > 1) {
      console.warn('⚠️ Multiple backdrops detected with active modal - Cleaning excess');
      console.log('active modals:', activeModals);
      console.log('backdrops:', backdropsCount);
      
      // 余分な背景のみ削除（最初の1つは残す）
      const backdrops = document.querySelectorAll('.modal-backdrop');
      for (let i = 1; i < backdrops.length; i++) {
        console.log('🗑️ Removing excess backdrop:', backdrops[i]);
        backdrops[i].remove();
      }
    }
    // アクティブなモーダルがないのに残骸がある場合
    else if (activeModals === 0 && (hasModalOpen || backdropsCount > 0)) {
      console.warn('⚠️ Modal remnants detected (no active modals) - Auto cleanup');
      console.log('modal-open:', hasModalOpen);
      console.log('backdrops:', backdropsCount);
      forceModalCleanup();
    }
  }, 1000); // 1秒ごとにチェック
}