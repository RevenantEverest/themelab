import type { Theme, ThemeColors } from '@/types/theme';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
    currentTheme: Theme,
    savedThemes: Theme[],
};

interface ThemeActions {
    setTheme: (theme: Theme) => void,
    updateThemeColor: (key: keyof ThemeColors, hex: string) => void,
    saveTheme: (name: string) => void,
    importTheme: (theme: Theme) => void,
    removeTheme: (index: number) => void,
    resetTheme: () => void
};

const defaultTheme: Theme = {
    colors: {
        primary: "#FB5377",
        secondary: "#FFD4DD",
        accent: "#d0ae61",
        background: "#1a0708",
        card: "#260B0E",
        cardLight: "#47161D",
        text: "#f8dddf",
        muted: "#704c4f"
    },
    mode: "dark",
    name: "default"
};

const initialState: ThemeState = {
    currentTheme: defaultTheme,
    savedThemes: [
        defaultTheme
    ]
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            setTheme: (theme: Theme) => set(() => ({ currentTheme: theme  })),
            updateThemeColor: (key: keyof ThemeColors, hex: string) => {
                const current = get().currentTheme;
                const newColors = { ...current.colors, [key]: hex };
                const updatedTheme = { ...current, colors: newColors };

                set(() => ({ currentTheme: updatedTheme }));
            },
            saveTheme: (name: string) => {
                const current = get().currentTheme;
                const updatedTheme = { ...current, name };

                set((state) => ({ savedThemes: [...state.savedThemes, updatedTheme] }));
            },
            importTheme: (theme: Theme) => {
                set((state) => ({ savedThemes: [...state.savedThemes, theme] }));
            },
            removeTheme: (index: number) => {
                const currentSavedThemes = get().savedThemes;
                set(() => ({ savedThemes: currentSavedThemes.filter((_, idx) => idx !== index) }))
            },
            resetTheme: () => set(() => ({ currentTheme: defaultTheme }))
        }),
        {
            name: 'theme-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);