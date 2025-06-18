import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { ToastSuccess } from '@/components/Common';

function usePasteFromClipboard(): { isPasted: boolean, paste: (message?: string) => Promise<string | null> } {
    const [pasted, setPasted] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        timeout = setTimeout(() => {
            setPasted(false);
        }, 1500);

        return () => {
            if(timeout) {
                clearTimeout(timeout);
            }
        }
    }, [pasted]);

    const pasteFromClipboard = async (message?: string): Promise<string | null> => {

        if("clipboard" in navigator) {
            const text = await navigator.clipboard.readText();
            setPasted(true);
            toast((t) => (
                <ToastSuccess toast={t} message={message ?? "Snippet Pasted!"} />
            ));

            return text;
        }

        return null;
    };

    return {
        isPasted: pasted,
        paste: pasteFromClipboard 
    }
};

export default usePasteFromClipboard;