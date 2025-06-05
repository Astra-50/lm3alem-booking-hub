
// Security utility functions
export const setupSecurityHeaders = () => {
  // Add meta tags for security
  const metaTags = [
    { name: 'X-Frame-Options', content: 'DENY' },
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' },
  ];

  metaTags.forEach(({ name, content }) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });

  // Content Security Policy
  let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!cspMeta) {
    cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    document.head.appendChild(cspMeta);
  }
  
  const cspContent = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://impbefoxbakhanpehkbt.supabase.co",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://impbefoxbakhanpehkbt.supabase.co wss://impbefoxbakhanpehkbt.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  cspMeta.setAttribute('content', cspContent);
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const setCSRFToken = (token: string) => {
  sessionStorage.setItem('csrf_token', token);
};

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken === token;
};

// Session timeout management
let sessionTimeoutId: NodeJS.Timeout | null = null;

export const setupSessionTimeout = (timeoutMs: number = 30 * 60 * 1000) => { // 30 minutes default
  if (sessionTimeoutId) {
    clearTimeout(sessionTimeoutId);
  }
  
  sessionTimeoutId = setTimeout(() => {
    // Force logout admin users after timeout
    if (window.location.pathname.includes('/admin')) {
      sessionStorage.clear();
      window.location.href = '/';
    }
  }, timeoutMs);
};

export const resetSessionTimeout = () => {
  if (window.location.pathname.includes('/admin')) {
    setupSessionTimeout();
  }
};

// Initialize security measures
export const initializeSecurity = () => {
  setupSecurityHeaders();
  
  // Generate CSRF token if not exists
  if (!getCSRFToken()) {
    setCSRFToken(generateCSRFToken());
  }
  
  // Set up session timeout for admin pages
  if (window.location.pathname.includes('/admin')) {
    setupSessionTimeout();
    
    // Reset timeout on user activity
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetSessionTimeout, true);
    });
  }
};
