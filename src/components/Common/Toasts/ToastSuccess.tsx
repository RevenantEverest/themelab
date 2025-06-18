import type { ReactNode } from 'react';
import type { Toast, ToastPosition } from 'react-hot-toast';

import { FaCircleCheck } from 'react-icons/fa6';
import { Card } from '@/components/ui/card';

export interface ToastSuccessProps {
    toast: Toast,
    position?: ToastPosition,
    duration?: number,
    message: ReactNode
};

function ToastSuccess({ toast, position="top-right", duration=3000, message }: ToastSuccessProps) {

    toast.duration = duration;
    toast.position = position;

    return(
        <Card className="bg-card shadow-lg w-full px-4">
            <div className="flex gap-2 w-full items-center">
                <FaCircleCheck className="text-primary" />
                {typeof message === "string" ? <p className="text-text">{message}</p> : message}
            </div>
        </Card>
    );
};

export default ToastSuccess;