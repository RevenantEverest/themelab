import type { Theme } from '@/types/theme';

import { FaCaretLeft, FaTimesCircle } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useThemeStore } from '@/store/theme';

interface ThemeChangerActionsProps {
    theme: Theme,
    themeIndex: number
};

function ThemeChangerActions({ theme, themeIndex }: ThemeChangerActionsProps) {

    const removeTheme = useThemeStore((state) => state.removeTheme);

    return(
        <div className="flex items-center justify-center">
            <Card className="relative p-0 py-2">
                <FaCaretLeft className="absolute top-2.5 bottom-0 -left-5 text-3xl text-card ml-0" />
                <CardContent className="flex items-center justify-center gap-4">
                    <p className="font-semibold py-1">{theme.name.charAt(0).toUpperCase() + theme.name.substring(1)}</p>
                {
                    themeIndex !== 0 &&
                    (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    size="sm" 
                                    variant="destructive" 
                                    className="px-2" 
                                    onClick={() => removeTheme(themeIndex)}
                                >
                                    <FaTimesCircle />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">Delete Theme</p>
                            </TooltipContent>
                        </Tooltip>
                    )
                }
                </CardContent>
            </Card>
        </div>
    );
};

export default ThemeChangerActions;