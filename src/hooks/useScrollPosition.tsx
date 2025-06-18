import { useEffect, useState } from 'react';

function useScrollPosition(): number {
    const [position, setPosition] = useState<number>(0);

    useEffect(() => {
        const updatePosition = () => {
            setPosition(window.scrollY);
        };

        window.addEventListener("scroll", updatePosition);
        updatePosition();

        return () => {
            window.removeEventListener("scroll", updatePosition);
        };
    });

    return position;
};

export default useScrollPosition;