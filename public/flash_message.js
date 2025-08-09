document.addEventListener('turbo:load', function() {
  console.log('Flash message setup');
  
  const alerts = document.querySelectorAll('.flash-auto-hide');
  
  alerts.forEach(function(alert) {
    const hideTime = parseInt(alert.dataset.autoHideTime) || 3000;
    
    // 自動非表示のタイマーを設定
    const autoHideTimer = setTimeout(function() {
      // 要素がまだ存在するかチェック（手動で削除されていない場合）
      if (alert && alert.parentNode) {
        // Bootstrap の標準的な削除方法を使用
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
        console.log('Flash message auto-hidden');
      }
    }, hideTime);
    
    // 手動削除された場合のタイマークリア
    alert.addEventListener('closed.bs.alert', function() {
      clearTimeout(autoHideTimer);
      console.log('Manual close detected, timer cleared');
    });
  });
});