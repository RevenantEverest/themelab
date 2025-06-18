import type { Theme } from '@/types/theme';

import { FaCheck, FaPaste } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { ToastError } from '@/components/Common';

import { usePasteFromClipboard, useAppForm } from '@/hooks';

import { theme as themeUtils } from '@/utils';

interface ThemeImportFormProps {
    theme: Theme,
    setImportedTheme: (theme: Theme) => void,
    setOpen: (value: boolean) => void
};

function ThemeImportForm({ theme, setImportedTheme, setOpen }: ThemeImportFormProps) {

    const paster = usePasteFromClipboard();

    const form = useAppForm({
        defaultValues: {
            importString: ""
        },
        onSubmit: async ({ value }) => {
            try {
                const themeImport = themeUtils.parseImportString(value.importString);

                setImportedTheme(themeImport);
            }
            catch(error) {
                console.error(error);
                toast((t) => (
                    <ToastError toast={t} message={"Invalid Import String"} />
                ))
            }
        }
    });

    return(
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <div className="flex flex-col gap-10">
                    <h1 className="text-center text-4xl font-semibold">
                        Import Theme 
                        <span className="text-primary ml-2">
                            {theme.name.charAt(0).toUpperCase() + theme.name.substring(1)}
                        </span>
                    </h1>
                    <div className="flex items-center justify-center gap-4 break-all font-semibold text-sm">
                        <div className="flex-1">
                            <form.AppField
                                name="importString"
                                children={(field) => (
                                    <field.TextField label="Import String" theme={theme} />
                                )}
                            />
                        </div>
                        <div
                            className="bg-primary p-3 top-3 relative rounded-lg text-lg"
                            onClick={async () => {
                                const pasteValue = await paster.paste();

                                if(pasteValue) {
                                    form.setFieldValue("importString", pasteValue);
                                    form.handleSubmit();
                                }
                            }}
                        >
                            {paster.isPasted ? <FaCheck /> : <FaPaste />}
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end w-full">
                        <form.SubscribeField label="Import" className="bg-primary px-10" />
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            <p>Close</p>
                        </Button>
                    </div>
                </div>
            </form.AppForm>
        </form>
    );
};

export default ThemeImportForm;