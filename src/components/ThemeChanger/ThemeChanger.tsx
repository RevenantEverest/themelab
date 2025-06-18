import type React from 'react';
import type { Theme } from '@/types/theme';

import ThemeIcon from './ThemeIcon';
import ThemeChangerActions from './ThemeChangerActions';

import { useThemeStore } from '@/store/theme';

export type ThemeChangerSize = "sm" | "md" | "lg" | "xl";

export interface ThemeChangerProps extends React.HTMLProps<HTMLDivElement> {
    setTheme: (theme: Theme) => void,
    iconSize?: ThemeChangerSize,
    withActions?: boolean,
    square?: boolean
};

function ThemeChanger({ setTheme, iconSize="sm", square, withActions, className }: ThemeChangerProps) {

    const currentTheme = useThemeStore((state) => state.currentTheme);
    const themes = useThemeStore((state) => state.savedThemes);
    const allThemes: Theme[] = themes;

    const generateDisplayName = (t: Theme): string => {
        const words = t.name.split(" ");

        for(let i = 0; i < words.length; i++) {
            const current = words[i];
            words[i] = current.charAt(0).toUpperCase() + current.substring(1);
        };

        return words.join(" ");
    };

    const renderThemes = () => {
        return allThemes.map((theme, index) => {
            const isCurrentTheme = theme.name === currentTheme.name;
            return (
                <div 
                    key={`theme-${theme.name}-${index}`}
                    className="flex gap-5 bg-card md:bg-transparent rounded-full pr-5 md:pr-0" 
                >
                    <ThemeIcon
                        square={square}
                        iconSize={iconSize}
                        theme={theme} 
                        currentTheme={currentTheme}
                        onClick={() => {
                            setTheme(theme);
                        }}
                    />
                    {(withActions && isCurrentTheme) && <ThemeChangerActions theme={theme} themeIndex={index} />}
                    {!withActions && <p className="md:hidden">{generateDisplayName(theme)}</p>}
                </div>
            );
        });
    };

    return(
        <div className={`flex gap-5 justify-center md:gap-1 flex-col md:flex-row ${className}`}>
            {renderThemes()}
        </div>
    );
};

export default ThemeChanger;