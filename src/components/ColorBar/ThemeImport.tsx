import type { Theme } from '@/types/theme';

import { useState } from 'react';
import { BiImport } from 'react-icons/bi';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import { useThemeStore } from '@/store/theme';
import ThemeImportForm from './ThemeImportForm';
import ThemeImportConfirm from './ThemeImportConfirm';

function ThemeImport() {

    const theme = useThemeStore((state) => state.currentTheme);

    const [open, setOpen] = useState(false);
    const [importedTheme, setImportedTheme] = useState<Theme | null>(null);

    return(
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button>
                            <BiImport />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">Import Theme</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="border-0 bg-card" title="Import Theme">
                {
                    importedTheme ?
                    <ThemeImportConfirm importedTheme={importedTheme} setImportedTheme={setImportedTheme} setOpen={setOpen} />
                    :
                    <ThemeImportForm theme={theme} setImportedTheme={setImportedTheme} setOpen={setOpen} />
                }
            </DialogContent>
        </Dialog>
    );
};

export default ThemeImport;