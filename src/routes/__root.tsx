import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

import { ThemeValidator } from '@/components/ThemeChanger';
import { ColorBar } from '@/components/ColorBar';
import Navbar from '@/navigation/Navbar';
import Footer from '@/navigation/Footer';

export const Route = createRootRoute({
    component: Root
});

function Root() {
    return(
        <div className="bg-background min-h-[100dvh] overflow-x-hidden">
            <ThemeValidator />
            <ColorBar />
            <Navbar />
            <Outlet />
            <Footer />

            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        border: "none",
                        background: "transparent",
                        boxShadow: "none",
                        maxWidth: "98%"
                    }
                }}    
            />
        </div>
    );
};