// src/hooks/useDarkModeTheme.ts
import { useDarkModeTheme as useDarkModeContext, ThemeMode } from '@/context/theme';

export function useDarkModeTheme() {
  const { themeMode, toggleThemeMode } = useDarkModeContext();

  return {
    themeMode,
    isDark: themeMode === ThemeMode.Dark,
    toggleTheme: toggleThemeMode,
    toggleThemeMode,
  };
}
