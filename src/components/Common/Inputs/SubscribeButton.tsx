"use client"

import { useFormContext } from '@/hooks/context/formContext';
import { Button } from '@/components/ui/button';
import React from 'react';

interface SubscribeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    label: string
};

function SubscribeButton({ label, className }: SubscribeButtonProps) {
    const form = useFormContext();
    return (
        <form.Subscribe selector={(state) => ([state.canSubmit, state.isSubmitting])}>
            {([canSubmit, isSubmitting]) => (
                <Button disabled={isSubmitting || !canSubmit} className={className}>{label}</Button>
            )}
        </form.Subscribe>
    )
};

export default SubscribeButton;