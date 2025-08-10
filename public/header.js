document.addEventListener('turbo:load', function() {
  console.log('🚀 Navbar setup');
  
  // 既存のリスナーをクリーンアップ
  const existingHandler = document.querySelector('#navbarNav')?._clickHandler;
  if (existingHandler) {
    document.removeEventListener('click', existingHandler);
  }
  
  // 新しいハンドラーを作成
  const clickHandler = function(event) {
    const link = event.target.closest('a.navbar-brand, #navbarNav a');
    
    // ログアウトリンクは除外する
    if (link && link.getAttribute('href') === '/logout') {
      return; // ログアウトリンクの場合は何もしない
    }
    
    if (!link || window.innerWidth >= 992) return;
    
    const navbar = document.querySelector('#navbarNav');
    if (navbar?.classList.contains('show')) {
      event.preventDefault();
      navbar.classList.remove('show');
      
      const toggle = document.querySelector('[data-bs-target="#navbarNav"]');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.add('collapsed');
      }
      
      setTimeout(() => window.location.href = link.href, 100);
    }
  };
  
  // ハンドラーを保存して重複を防ぐ
  const navbar = document.querySelector('#navbarNav');
  if (navbar) {
    navbar._clickHandler = clickHandler;
    document.addEventListener('click', clickHandler);
  }
});