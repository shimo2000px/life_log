document.addEventListener('turbo:load', function() {
  
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
      }
    }, hideTime);
    
    // 手動削除された場合のタイマークリア
    alert.addEventListener('closed.bs.alert', function() {
      clearTimeout(autoHideTimer);
    });
  });
});