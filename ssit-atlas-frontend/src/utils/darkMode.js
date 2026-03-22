// Dark Mode Utility Functions

/**
 * Initialize dark mode based on user preference or system setting
 */
export const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
  
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  return isDarkMode;
};

/**
 * Toggle dark mode on/off
 */
export const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  return isDark;
};

/**
 * Get current theme
 */
export const getCurrentTheme = () => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

/**
 * Set specific theme
 */
export const setTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};

/**
 * Listen to system theme changes
 */
export const watchSystemTheme = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e) => {
    if (!localStorage.getItem('theme')) {
      // Only auto-switch if user hasn't set preference
      const isDark = e.matches;
      setTheme(isDark ? 'dark' : 'light');
      callback(isDark);
    }
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
};
