import { useState } from 'react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';

import { useThemeStore } from '@/store/theme';
import { Card, CardContent } from '@/components/ui/card';

import ColorBarTheme from './ColorBarTheme';
import ColorBarNavigator from './ColorBarNavigator';
import ColorBarThemeList from './ColorBarThemeList';

export type ColorBarState = "Current Theme" | "Saved Themes"; 

function ColorBar() {

    const theme = useThemeStore((state) => state.currentTheme);

    const [colorBarState, setColorBarState] = useState<ColorBarState>("Current Theme");

    const renderState = () => {

        const animationProps: HTMLMotionProps<"div"> = {
            initial: { x: "-100dvw" },
            animate: { x: 0 },
            exit: { x: "100dvw" },
            transition: {
                duration: .5,
                type: "spring"
            }
        };

        switch(colorBarState) {
            case "Current Theme":
                return(
                    <motion.div {...animationProps}>
                        <ColorBarTheme theme={theme} />
                    </motion.div>
                )
            case "Saved Themes":
                return(
                    <motion.div {...animationProps}>
                        <ColorBarThemeList />
                    </motion.div>
                );
            default:
                return(
                    <motion.div  {...animationProps}>
                        <ColorBarTheme theme={theme} />
                    </motion.div>
                );
        }
    };

    return(
        <div className="fixed left-40 right-40 bottom-20 z-30">
            <Card className="bg-card-light pt-3 border-2 border-muted/20">
                <CardContent className="flex flex-col gap-4 overflow-hidden">
                    <ColorBarNavigator 
                        paths={["Current Theme", "Saved Themes"]}
                        currentPath={colorBarState}
                        setPath={setColorBarState}
                    />
                    <AnimatePresence mode="wait">
                        {renderState()}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};

export default ColorBar;