import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';
import { theme as themeUtils } from '@/utils';

function ThemeValidator() {
    const theme = useThemeStore((state) => state.currentTheme);

    useEffect(() => {
        try {
            themeUtils.applyTheme(theme);
        } catch (error) {
            console.error("Failed to apply theme:", error);
        }
    }, [theme]);

    return null;
}

export default ThemeValidator;