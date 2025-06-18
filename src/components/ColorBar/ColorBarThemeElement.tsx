import type { Theme, ThemeColors } from '@/types/theme';

import { motion } from 'motion/react';

import { Card, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { colors } from '@/utils';
import ColorPicker from './ColorPicker';

interface ColorElementProps {
    theme: Theme,
    colorKey: keyof ThemeColors,
    disableControls?: boolean
};

function ColorThemeElement({ theme, colorKey, disableControls }: ColorElementProps) {

    const themeColor = theme.colors[colorKey];
    const isHighContrast = colors.isHighContrast(themeColor, theme.colors.text);


    const parseColorKey = () => {
        let colorTitle = "";
        const uLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        for(let i = 0; i < colorKey.length; i++) {
            let current = colorKey[i];
            if(i === 0) {
                current = colorKey[i].toUpperCase();
            }

            if(uLetters.includes(colorKey[i])) {
                colorTitle += " ";
            }

            colorTitle += current;
        };

        return colorTitle;
    };

    return(
        <Popover>
            <PopoverTrigger className="w-full">
                <motion.div
                    className="hover:cursor-pointer"
                    whileHover={{ y: "-.5dvh" }}
                >
                    <Card 
                        className="border-3 border-transparent py-2.5 flex items-center justify-center" 
                        style={{ 
                            color: isHighContrast ? theme.colors.text : "black",
                            backgroundColor: theme.colors[colorKey],
                            ...(colorKey === "cardLight" && { borderColor: "#151515" })
                        }}
                    >
                        <CardTitle className="text-sm">{parseColorKey()}</CardTitle>
                    </Card>
                </motion.div>
            </PopoverTrigger>
            {
                !disableControls && (
                    <PopoverContent className="flex flex-col justify-center gap-4 border-none rounded-xl">
                        <ColorPicker color={themeColor} colorKey={colorKey} />
                    </PopoverContent>
                )
            }
            </Popover>
    );
};

export default ColorThemeElement;