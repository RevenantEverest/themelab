import type { 
    Theme, 
    MappedTheme, 
    MappedThemeKeys, 
    ThemeColors
} from '@/types/theme';

export function applyTheme(theme: Theme) {
    const mappedTheme: MappedTheme = mapTheme(theme.colors);
    
    const root = document.documentElement;

    Object.keys(mappedTheme).forEach((property) => {
        root.style.setProperty(property, mappedTheme[property as MappedThemeKeys]);
    });
};

export function mapTheme(colors: ThemeColors): MappedTheme {
    return {
        "--color-primary": colors.primary,
        "--color-secondary": colors.secondary,
        "--color-accent": colors.accent,
        
        "--color-text": colors.text,
        "--color-muted": colors.muted,
        
        "--color-card": colors.card,
        "--color-card-light": colors.cardLight,

        "--background": colors.background,
    };
};

export function generateExportString(theme: Theme): string {
    const json = JSON.stringify(theme);
    const base64 = btoa(encodeURIComponent(json));
    return `THEMELAB::${base64}`;
};

export function parseImportString(str: string): Theme {
    const [prefix, base64] = str.split("::");
    if(prefix !== "THEMELAB") throw new Error("Invalid theme import string");

    const json = decodeURIComponent(atob(base64));
    return JSON.parse(json);
};