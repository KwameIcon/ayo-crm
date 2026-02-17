const isNode = typeof window === 'undefined';

const getParam = (key: string, defaultValue: string = ''): string => {
  if (isNode) return defaultValue;

  const urlParams = new URLSearchParams(window.location.search);
  const valueFromUrl = urlParams.get(key);

  if (valueFromUrl) {
    // Persist the token for future sessions
    localStorage.setItem(key, valueFromUrl);

    // CLEANUP: Remove the token from the URL bar immediately
    urlParams.delete(key);
    const newRelativePathQuery = window.location.pathname + 
      (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
      window.location.hash;
    
    // This replaces the current URL entry in history without reloading the page
    window.history.replaceState({}, document.title, newRelativePathQuery);

    return valueFromUrl;
  }

  // Fallback to storage if not in URL
  return localStorage.getItem(key) || defaultValue;
};

export const appParams = {
  appId: import.meta.env.VITE_APP_ID || '',
  token: getParam('access_token'), 
  apiBaseUrl: import.meta.env.VITE_API_URL || '/api',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};