import { FaSave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog';
import { ToastSuccess, ToastError } from '@/components/Common';

import { useAppForm } from '@/hooks/useAppForm';
import { useThemeStore } from '@/store/theme';
import { useState } from 'react';

function SaveTheme() {

    const theme = useThemeStore((state) => state.currentTheme);
    const savedThemes = useThemeStore((state) => state.savedThemes);
    const saveTheme = useThemeStore((state) => state.saveTheme);
    const [open, setOpen] = useState(false);

    const initialValues = {
        name: ""
    };

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            try {
                saveTheme(value.name);
                toast((t) => (
                    <ToastSuccess 
                        toast={t} 
                        message={(
                            <p>Theme saved as <span className="font-semibold text-primary">{value.name}</span></p>
                        )}
                    />
                ));
                setOpen(false);
            }
            catch(error) {
                console.error(error);
                toast((t) => (
                    <ToastError toast={t} message="Unable to save theme" />
                ));
            }
        }
    });

    return(
        <Dialog open={open} onOpenChange={setOpen}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button className="font-semibold">
                                <FaSave />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-semibold">Save Current Theme</p>
                    </TooltipContent>
                </Tooltip>
            <DialogContent className="border-0 bg-card" title="Save Theme">
                
                <h1 className="font-bold text-xl text-center">What would you like to save this theme as?</h1>
                <form
                    className="flex flex-col gap-4 mt-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        form.handleSubmit();
                    }}
                >
                    <form.AppForm>
                        <div>
                            <form.AppField
                                name="name"
                                validators={{
                                    onChange: ({ value }) => {
                                        if(value === "") 
                                            return "Field is required"; 
                                        if(savedThemes.map((t) => t.name).includes(value)) {
                                            return "Theme already has this name";
                                        }
                                        
                                        return undefined;
                                    }
                                }}
                                children={(field) => (
                                    <field.TextField label="Theme Name" type="text" theme={theme} />
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <form.SubscribeField label="Save" className="bg-primary px-10" />
                        </div>
                    </form.AppForm>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SaveTheme;