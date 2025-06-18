import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './context/formContext';
import TextField from '@/components/Common/Inputs/TextInput';
import SubscribeField from '@/components/Common/Inputs/SubscribeButton';

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField
    },
    formComponents: {
        SubscribeField
    },
    fieldContext,
    formContext
});