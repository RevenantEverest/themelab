import type { IconType } from 'react-icons';

import { motion } from 'motion/react';
import { 
    TooltipProvider, 
    Tooltip, 
    TooltipTrigger, 
    TooltipContent
} from '@/components/ui/tooltip';

type SocialIconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";

interface SocialIconProps {
    icon: IconType,
    tooltip: string,
    to: string,
    size?: SocialIconSize
};

function SocialIcon({ icon, tooltip, to, size="lg" }: SocialIconProps) {

    const Icon = icon;
    const textSize: Record<SocialIconSize, string> = {
        "xs": "text-xs",
        "sm": "text-xs md:text-sm",
        "md": "text-sm md:text-md",
        "lg": "text-md md:text-lg",
        "xl": "text-lg md:text-xl",
        "2xl": "text-xl md:text-2xl",
        "3xl": "text-2xl md:text-3xl",
        "4xl": "text-3xl md:text-4xl",
        "5xl": "text-4xl md:text-5xl",
        "6xl": "text-5xl md:text-6xl",
        "7xl": "text-6xl md:text-7xl",
        "8xl": "text-7xl md:text-6xl",
    };

    return(

        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <motion.div
                        className="hover:cursor-pointer"
                        whileHover={{ y: "-0.5dvh" }}
                    >
                        <a href={to} target="_blank" rel="noopener noreferrer">
                            <Icon className={textSize[size]} />
                        </a>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SocialIcon;