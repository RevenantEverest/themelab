import React from 'react';
import { motion } from 'motion/react';
import { useRouter, Link } from '@tanstack/react-router';

import { useThemeStore } from '@/store/theme';

import ThemeChanger from '@/components/ThemeChanger/ThemeChanger';

interface MobileNavbarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

function MobileNavbar({ isOpen, setIsOpen }: MobileNavbarProps) {

    const router = useRouter();

    const setTheme = useThemeStore((state) => state.setTheme);

    const { initial, animate, exit, transition } = {
        initial: { y: "-100vh" },
        animate: { y: 0 },
        exit: { y: "-100vh" },
        transition: { duration: .3 }
    };

    const renderRoutes = () => {
        const InternalRoutes = Object.keys(router.routesByPath).map((key, index) => {
            const title = key.split("/")[1];

            return(
                <div
                    className="py-4"
                    key={`mobile-navbar-route-${title}-${index}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Link 
                        to={key}
                        className="hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-lg"
                    >
                        <p className="font-semibold">
                            {
                                title === "" ? "Home" :
                                title.charAt(0).toUpperCase() + title.slice(1)
                            }
                        </p>
                    </Link>
                </div>
            );
        });

        return(
            <React.Fragment>
                {InternalRoutes}

                <div className="py-4">
                    <a 
                        href={"https://google.com"} target="_blank" rel="noopener noreferrer"
                        className="hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-lg"
                    >
                        <p className="font-semibold">Docs</p>
                    </a>
                </div>
            </React.Fragment>
        );
    };

    return(
        <motion.div 
            key="mobile-nav" 
            className="z-0 absolute bg-background w-screen h-screen" 
            initial={initial} 
            animate={animate} 
            exit={exit} 
            transition={transition}
        >
            <div className="flex flex-col px-5 mt-10">
                {renderRoutes()}
            </div>
            <div className="flex flex-col gap-6 w-3/6 pl-5 pt-10">
                <p className="font-semibold">Saved Themes:</p>
                <ThemeChanger setTheme={setTheme} />
            </div>
        </motion.div>
    );
};

export default MobileNavbar;