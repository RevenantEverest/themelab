import type { Theme } from '@/types/theme';

import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToastSuccess } from '@/components/Common';

import ColorThemeElement from './ColorBarThemeElement';

import { useThemeStore } from '@/store/theme';

interface ThemeImportConfirmProps {
    importedTheme: Theme,
    setImportedTheme: (theme: Theme | null) => void,
    setOpen: (value: boolean) => void
};

function ThemeImportConfirm({ importedTheme, setImportedTheme, setOpen }: ThemeImportConfirmProps) {

    const savedThemes = useThemeStore((state) => state.savedThemes);
    const importTheme = useThemeStore((state) => state.importTheme);

    return(
        <div className="flex flex-col gap-5">
            <div className="text-center text-3xl font-semibold flex flex-col gap-3">
                <h1 className="font-semibold">
                    Importing Theme:
                </h1>
                <p className="text-primary font-bold">
                    {importedTheme.name.charAt(0).toUpperCase() + importedTheme.name.substring(1)}
                </p>
            </div>
            <div>
                <Card>
                    <CardContent className="grid grid-cols-2 gap-3 bg-card-light py-5 rounded-lg">
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="primary" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="secondary" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="accent" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="background" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="text" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="muted" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="card" />
                        <ColorThemeElement disableControls theme={importedTheme} colorKey="cardLight" />
                    </CardContent>
                </Card>
            </div>
            <div className="flex gap-3 justify-end">
                <Button
                    onClick={() => {
                        if(savedThemes.map((t) => t.name).includes(importedTheme.name)) {
                            importedTheme.name = importedTheme.name + " " + savedThemes.length;
                        }

                        importTheme(importedTheme);

                        toast((t) => (
                            <ToastSuccess 
                                toast={t} 
                                message={(
                                    <p>Theme imported as <span className="font-semibold text-primary">{importedTheme.name}</span></p>
                                )} />
                        ));

                        setOpen(false);
                    }}
                >
                    <p>Confirm</p>
                </Button>
                <Button
                    variant="outline" 
                    onClick={() => {
                        setImportedTheme(null);
                        setOpen(false);
                    }}
                >
                    <p>Close</p>
                </Button>
            </div>
        </div>
    );
};

export default ThemeImportConfirm;