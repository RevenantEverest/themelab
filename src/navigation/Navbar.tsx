import React, { useEffect, useState } from 'react';
import { useRouter, Link, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';

import { useThemeStore } from '@/store/theme';
import { useScrollPosition } from '@/hooks';

import { FaBars } from 'react-icons/fa6';
import ThemeChanger from '@/components/ThemeChanger/ThemeChanger';
import GitHubStars from '@/components/Common/GitHubStars';
import MobileNavbar from './MobileNavbar';

import ThemeLabLogo from '@/assets/themelab_bubbleless.svg';

function Navbar() {

    const router = useRouter();
    const location = useLocation();
    const setTheme = useThemeStore((state) => state.setTheme);

    const scrollPosition = useScrollPosition();
    const [solidBackground, setSolidBackground] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const solidPos = {
            home: 100,
            other: 400
        };

        if(location.pathname === "/") {
            if(scrollPosition > solidPos.home) {
                setSolidBackground(true);
            }

            if(scrollPosition < solidPos.home) {
                setSolidBackground(false);
            }
        }
        else {
            if(scrollPosition > solidPos.other) {
                setSolidBackground(true);
            }

            if(scrollPosition < solidPos.other) {
                setSolidBackground(false);
            }
        }
    }, [scrollPosition, location]);

    useEffect(() => {
        setSolidBackground(isMobileOpen);
    }, [isMobileOpen]);

    const renderRoutes = () => {
        const InternalRoutes = Object.keys(router.routesByPath).map((key, index) => {
            const title = key.split("/")[1];

            return(
                <Link 
                    to={key}
                    key={`navbar-route-${title}-${index}`} 
                    className="hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-center py-1"
                >
                    <p className="font-semibold">
                        {
                            title === "" ? "Home" :
                            title.charAt(0).toUpperCase() + title.slice(1)
                        }
                    </p>
                </Link>
            );
        });

        return(
            <React.Fragment>
                {InternalRoutes}
                <a 
                    href={"https://google.com"} target="_blank" rel="noopener noreferrer"
                    className="hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-center py-1"
                >
                    <p className="font-semibold">Docs</p>
                </a>
            </React.Fragment>
        );
    };

    return(
        <div className="w-full fixed z-50">
            <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                {
                    solidBackground &&
                    <motion.div 
                        className="fixed w-[140vw] top-0 left-0"
                        initial={{ skewX: -50, x: "120vw" }}
                        animate={{ 
                            skewX: 0, 
                            x: "-20vw",
                            transition: { duration: .3 } 
                        }}
                        exit={{
                            skewX: 50,
                            x: "120vw",
                            transition: { duration: .3 }
                        }}
                    >
                        <div className="h-full w-full bg-background absolute py-11 z-40 border-b-2 border-muted/40 duration-150" />
                    </motion.div>
                }
                </AnimatePresence>
                <div className="flex items-center justify-center py-4 w-11/12 md:w-8/12 z-10">
                    <Link to="/" className="flex-1 flex justify-start items-center gap-1">
                        <img className="w-10" src={ThemeLabLogo} alt="logo" />
                        <h1 className="font-bold text-lg">ThemeLab</h1>
                        <div className="bg-primary px-2 py-.5 rounded-md mt-1">
                            <p className="text-sm font-semibold">v2.0.0-alpha</p>
                        </div>
                    </Link>
                    <div className="flex-1 hidden md:flex items-center justify-center">
                        {renderRoutes()}
                    </div>
                    <div className="flex-1 hidden md:flex items-center justify-end gap-5">
                        <ThemeChanger setTheme={setTheme} />
                        <GitHubStars owner="RevenantEverest" repo="themelab" />
                    </div>
                    <div className="flex items-center justify-end md:hidden">
                        <div className="ml-4 mr-4 flex md:hidden justify-center content-center items-center" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                            <FaBars className="text-2xl text-text" />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence key="navbar-ap" mode="wait">
                {
                    isMobileOpen && 
                    <MobileNavbar 
                        isOpen={isMobileOpen} 
                        setIsOpen={setIsMobileOpen}
                    />
                }
            </AnimatePresence>
        </div>
    );
};

export default Navbar;