export interface ThemeColors {
    primary: string,
    secondary: string,
    accent: string,
    background: string,

    text: string,
    muted: string,

    card: string,
    cardLight: string
};

export type MappedThemeKeys = (
    "--color-primary" |
    "--color-secondary" |
    "--color-accent" |

    "--color-text" |
    "--color-muted" |

    "--color-card" |
    "--color-card-light" |

    "--background"
); 

export type MappedTheme = Record<MappedThemeKeys, string>;
export type ThemeName = string;

export interface Theme {
    name: ThemeName,
    mode: "dark" | "light",
    colors: ThemeColors
};