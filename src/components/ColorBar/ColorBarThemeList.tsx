import { ThemeChanger } from '@/components/ThemeChanger';
import { useThemeStore } from '@/store/theme';

import ThemeExport from './ThemeExport';
import ThemeImport from './ThemeImport';

function ColorBarThemeList() {

    const setTheme = useThemeStore((state) => state.setTheme);

    return(
        <div className="flex gap-5 items-center justify-center relative h-full py-1.5">
            <div className="flex-1 absolute top-0 bottom-0 w-10/12 overflow-x-scroll">
                <ThemeChanger 
                    square 
                    withActions
                    iconSize="md" 
                    className="!gap-4" 
                    setTheme={setTheme}
                />
            </div>
            <div className="flex gap-4 w-full justify-end">
                <div>
                    <ThemeExport />
                </div>
                <div>
                    <ThemeImport />
                </div>
            </div>
        </div>
    );
};

export default ColorBarThemeList;