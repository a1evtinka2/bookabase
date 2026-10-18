import { useTheme } from '../../providers/ThemeProvider';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  const toggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <svg
          className="h-10 w-10 text-yellow-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <path
            d="
            M12 1v3
            M12 20v3
            M1 12h3
            M20 12h3
            M4.22 4.22l2.12 2.12
            M17.66 17.66l2.12 2.12
            M19.78 4.22l-2.12 2.12
            M6.34 17.66l-2.12 2.12
            "
          />
        </svg>
      ) : (
        <svg
          className="h-10 w-10 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
