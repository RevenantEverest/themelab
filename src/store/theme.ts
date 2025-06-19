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
        primary: "#D82DFF",
        secondary: "#670086",
        accent: "#5cce39",
        background: "#140418",
        card: "#1B0323",
        cardLight: "#32093C",
        text: "#f6d5fe",
        muted: "#694f72"
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