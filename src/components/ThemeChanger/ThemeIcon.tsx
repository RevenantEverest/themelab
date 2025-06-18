import type { Theme } from '@/types/theme';
import type { ThemeChangerSize } from './ThemeChanger';

import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from '@/components/ui/tooltip';
import React from 'react';

export interface ThemeIconProps extends React.HTMLProps<HTMLDivElement> {
    theme: Theme,
    currentTheme: Theme,
    iconSize: ThemeChangerSize,
    square?: boolean
};

function ThemeIcon({ theme, currentTheme, iconSize, square, onClick }: ThemeIconProps) {

    const isCurrentTheme = theme.name === currentTheme.name;

    const generateDisplayName = (): string => {
        const words = theme.name.split(" ");

        for(let i = 0; i < words.length; i++) {
            const current = words[i];
            words[i] = current.charAt(0).toUpperCase() + current.substring(1);
        };

        return words.join(" ");
    };

    const sizes: Record<ThemeChangerSize, string> = {
        "sm": "h-6 w-6",
        "md": "h-10 w-10",
        "lg": "h-14 w-14",
        "xl": "h-18 w-18",
    };

    return(
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <div 
                        onClick={onClick} 
                        className={`
                            ${square ? "rounded-lg" : "rounded-full"} hover:cursor-pointer 
                            ${isCurrentTheme ? "border-2 border-secondary" : "border-2 border-gray-600"}
                        `}
                    >
                        <div
                            className={`${sizes[iconSize]} ${square ? "rounded-lg" : "rounded-full"}`} 
                            style={{ 
                                background: theme.colors.background 
                            }}
                        />                            
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">{generateDisplayName()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ThemeIcon;