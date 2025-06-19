"use client"

import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '@/hooks';

import { BREAKPOINTS } from '@/constants';

interface WaveDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    bgColor: string
};

function WaveDivider({ className, bgColor }: WaveDividerProps) {

    const [backgroundImage, setBackgroundImage] = useState('');
    const dimensions = useWindowDimensions();

    useEffect(() => {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.28 2.17" preserveAspectRatio="none">
                <path fill='${bgColor}' d="M0 1c3.17.8 7.29-.38 10.04-.55 2.75-.17 9.25 1.47 12.67 1.3 3.43-.17 4.65-.84 7.05-.87 2.4-.02 5.52.88 5.52.88V0H0z" />
            </svg>
        `;

        setBackgroundImage(`url("data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}")`);
    }, [bgColor]);

    return (
        <div
            className={`relative min-w-[220dvw] md:w-full h-32 first:-left-48 md:first:left-0 ${className}`}
            style={{ 
                backgroundImage, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                WebkitBackgroundSize: (dimensions.width < BREAKPOINTS.MD) ? "140% 133px" : ""
            }}
        />
    );
};

export default WaveDivider;