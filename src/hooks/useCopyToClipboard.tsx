import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { ToastSuccess } from '@/components/Common';

function useCopyToClipboard(): { isCopied: boolean, copy: (value: string, message?: string) => void } {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        timeout = setTimeout(() => {
            setCopied(false);
        }, 1500);

        return () => {
            if(timeout) {
                clearTimeout(timeout);
            }
        }
    }, [copied]);

    const copyToClipboard = async (value: string, message?: string) => {

        const codeSnippet = String(value).replace(/\n$/, '');

        if("clipboard" in navigator) {
            await navigator.clipboard.writeText(codeSnippet);
            setCopied(true);
            toast((t) => (
                <ToastSuccess toast={t} message={message ?? "Snippet Copied!"} />
            ));
        }
    };

    return {
        isCopied: copied,
        copy: copyToClipboard 
    }
};

export default useCopyToClipboard;