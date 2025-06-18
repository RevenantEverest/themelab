import { BiExport } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import { theme as themeUtils } from '@/utils';
import { useThemeStore } from '@/store/theme';
import { useCopyToClipboard } from '@/hooks';

function ThemeExport() {

    const theme = useThemeStore((state) => state.currentTheme);
    const exportString = themeUtils.generateExportString(theme);

    const [open, setOpen] = useState(false);
    const copier = useCopyToClipboard();

    return(
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button>
                            <BiExport />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">Export Theme</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="border-0 bg-card" title="Export Theme">
                <div className="flex flex-col gap-10">
                    <h1 className="text-center text-4xl font-semibold">
                        Exporting Theme 
                        <span className="text-primary ml-2">
                            {theme.name.charAt(0).toUpperCase() + theme.name.substring(1)}
                        </span>
                    </h1>
                    <div className="flex flex-wrap break-all p-4 bg-card-light rounded-lg font-semibold text-sm">
                        <p>{exportString}</p>
                    </div>
                    <div className="flex gap-4 justify-end w-full">
                        <Button 
                            className=""
                            onClick={() => copier.copy(exportString, "Theme export string Copied!")}
                        >
                            {copier.isCopied ? <FaCheck /> : <p>Copy</p>}
                        </Button>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            <p>Close</p>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ThemeExport;