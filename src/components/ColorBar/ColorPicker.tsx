import type { ThemeColors } from '@/types/theme';

import { HexColorPicker } from 'react-colorful';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { FaPaste } from 'react-icons/fa6';

import { useThemeStore } from '@/store/theme';
import { useAppForm } from '@/hooks/useAppForm';

import { regex } from '@/utils';
import { useCopyToClipboard, usePasteFromClipboard } from '@/hooks';
import { useRef } from 'react';

interface ColorPickerProps {
    color: string,
    colorKey: keyof ThemeColors
};

function ColorPicker({ color, colorKey }: ColorPickerProps) {

    const ref = useRef<HTMLFormElement | null>(null);
    const theme = useThemeStore((state) => state.currentTheme);
    const updateThemeColor = useThemeStore((state) => state.updateThemeColor);

    const copier = useCopyToClipboard();
    const paster = usePasteFromClipboard();

    const form = useAppForm({
        defaultValues: {
            colorValue: color
        },
        onSubmit: ({ value }) => {
            updateThemeColor(colorKey, value.colorValue);
        }
    });

    return(
        <form
            className="flex flex-col gap-3"
            ref={ref}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <form.Field
                    name="colorValue"
                    children={(field) => (
                        <HexColorPicker
                            className="!w-full"
                            color={field.state.value} 
                            onChange={(value) => field.handleChange(value)}
                            onMouseUp={() => form.handleSubmit()}
                        />
                    )}
                />
                <div className="flex gap-2">
                    <div className="">
                        <form.AppField
                            name="colorValue"
                            validators={{
                                onChange: ({ value }) => {
                                    const isRgb = value.match(regex.rgbColor);
                                    const isHex = value.match(regex.hexColor);
        
                                    if (isRgb || isHex) return undefined;
                                    else return "Must be a valid Hex or RGB string";
                                }
                            }}
                            children={(field) => (
                                <field.TextField className="text-center" label="" theme={theme} />
                            )}
                        />
                    </div>
                    <div 
                        className={`
                            bg-card h-10 w-full flex-1 flex items-center justify-center rounded-lg text-xl 
                            hover:cursor-pointer hover:text-primary duration-150
                        `}
                        onClick={async () => {
                            const pasteValue = await paster.paste();

                            if(pasteValue) {
                                form.setFieldValue("colorValue", pasteValue);
                                form.handleSubmit();
                            }
                        }}
                    >
                        {paster.isPasted ? <FaCheck /> : <FaPaste />}
                    </div>
                </div>
            <div className="flex items-center gap-2">
                <div 
                    className={`
                        bg-card h-10 w-full flex-1 flex items-center justify-center rounded-lg text-xl 
                        hover:cursor-pointer hover:text-primary duration-150
                    `}
                    onClick={() => copier.copy(form.state.values.colorValue, "Color Value Copied!")}
                >
                    {copier.isCopied ? <FaCheck /> : <FaCopy />}
                </div>
                <form.Field
                    name="colorValue"
                    children={(field) => (
                        <div className="h-10 w-40 rounded-lg" style={{ backgroundColor: field.state.value }} />
                    )}
                />
            </div>
            </form.AppForm>
        </form>
    );
};

export default ColorPicker;