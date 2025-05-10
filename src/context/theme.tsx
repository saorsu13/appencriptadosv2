import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

interface DarkModeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  themeMode: ThemeMode.Light,
  toggleThemeMode: () => {},
});

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Dark);

  // Carga el theme guardado en AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('themeMode');
        if (saved === ThemeMode.Light || saved === ThemeMode.Dark) {
          setThemeMode(saved);
        }
      } catch {}
    })();
  }, []);

  const toggleThemeMode = () => {
    const next = themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    setThemeMode(next);
    AsyncStorage.setItem('themeMode', next).catch(() => {});
  };

  return (
    <DarkModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Este es el hook que vas a usar en vez de useThemeMode
export const useDarkModeTheme = () => useContext(DarkModeContext);