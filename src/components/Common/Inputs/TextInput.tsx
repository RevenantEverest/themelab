"use client"

import type { IconType } from 'react-icons';
import type { Theme } from '@/types/theme';

import React from 'react';
import { useFieldContext } from '@/hooks/context/formContext';

import { colors } from '@/utils';

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
    icon?: IconType,
    iconRight?: boolean,
    iconClassName?: string,
    theme: Theme
};


function TextInput({ className="", type="text", label, icon, iconRight, iconClassName="", ...rest }: TextInputProps) {

    const field = useFieldContext<string>(); // @tanstack form 
    const errorMessage = field.state.meta.errors.join(" ");

    const isHighContrast = colors.isHighContrast(rest.theme.colors.cardLight, rest.theme.colors.background);

    const baseInputClassName = `
        block w-full border 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        bg-card-light 
        ${errorMessage ? "border-red-500" : "border-card-light"} 
        text-text 
        rounded-lg 
        p-2.5
        text-sm
        font-semibold
        placeholder:text
        ${(icon && !iconRight) && "pl-10"}
    `;

    const focusInputClassName = `
        focus:border-1
        focus:border-primary
        focus:ring-primary
    `;

    const renderIcon = (inputIcon: IconType) => {
        const Icon = inputIcon;
        const iconContainerClassName = `
            pointer-events-none absolute flex items-center p-3
            ${isHighContrast ? "text-white" : "text-primary"}
            ${iconRight ? "inset-y-0 right-0 pr-3" : "inset-y-0 left-0 pl-3"}
        `;

        return(
            <div className={`${iconContainerClassName}`}>
                <Icon className={`${iconClassName}`} />
            </div>
        );
    };

    const renderErrorMessage = () => {
        return(
            <p className="text-red-500 text-sm">{field.state.meta.errors.join(" ")}</p>
        );
    };

    const renderLabel = () => (
        <div>
            <p className="text-sm font-bold">{label}</p>
        </div>
    );

    return(
        <React.Fragment>
            {label && renderLabel()}
            <div className={`relative w-full ${label && "mt-1.5"}`}>
                {icon && renderIcon(icon)}
                <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange((e.target as HTMLInputElement).value)}
                    className={`${baseInputClassName} ${focusInputClassName} ${className} appearance-none`}
                    type={type}
                    {...rest}
                />
            </div>
            {errorMessage && renderErrorMessage()}
        </React.Fragment>
    );
};

export default TextInput;