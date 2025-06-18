import type { Theme } from '@/types/theme';
import { RiResetLeftFill } from 'react-icons/ri';

import ColorThemeElement from './ColorBarThemeElement';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import SaveTheme from './SaveTheme';

import { useThemeStore } from '@/store/theme';

interface ColorBarThemeProps {
    theme: Theme
};

function ColorBarTheme({ theme }: ColorBarThemeProps) {

    const resetTheme = useThemeStore((state) => state.resetTheme);

    return(
        <div className="flex gap-10 text-center w-full">
            <div className="flex gap-3 w-full">
                <ColorThemeElement theme={theme} colorKey="primary" />
                <ColorThemeElement theme={theme} colorKey="secondary" />
                <ColorThemeElement theme={theme} colorKey="accent" />
                <ColorThemeElement theme={theme} colorKey="background" />
                <ColorThemeElement theme={theme} colorKey="text" />
                <ColorThemeElement theme={theme} colorKey="muted" />
                <ColorThemeElement theme={theme} colorKey="card" />
                <ColorThemeElement theme={theme} colorKey="cardLight" />
            </div>
            <div className="flex items-center justify-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button className="font-semibold" onClick={resetTheme}>
                        <RiResetLeftFill />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-semibold">Reset to default</p>
                    </TooltipContent>
                </Tooltip>
                <SaveTheme />
            </div>
        </div>
    );
};

export default ColorBarTheme;