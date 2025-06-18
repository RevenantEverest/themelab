import type { Toast, ToastPosition } from 'react-hot-toast';
import type { ReactNode } from 'react';

import { FaCircleXmark } from 'react-icons/fa6';
import { Card } from '@/components/ui/card';

export interface ToastErrorProps {
    toast: Toast,
    position?: ToastPosition,
    duration?: number,
    message: string | ReactNode
};

function ToastError({ toast, position="top-right", duration=3000, message }: ToastErrorProps) {

    toast.duration = duration;
    toast.position = position;

    const renderMessage = () => {
        if(typeof message === "string") {
            return(
                <p className="text-text">{message}</p>
            );
        }

        return message;
    };

    return(
        <Card className="bg-card p-4 shadow-lg">
            <div className="flex gap-2 w-full items-center">
                <FaCircleXmark className="text-red-500" />
                {renderMessage()}
            </div>
        </Card>
    );
};

export default ToastError;