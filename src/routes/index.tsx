import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Highlights } from '@/components/Highlights';
import { Pricing } from '@/components/Pricing';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute("/")({
    component: Index
});

function Index() {
    return(
        <div className="flex flex-col gap-40 md:gap-52 px-5 md:px-56 mb-40">
            <div className="flex items-center justify-center mt-30 md:mt-40">
                <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full items-center">
                    <div className="flex-1 flex flex-col gap-4 md:gap-10 text-center md:text-left order-2 md:order-1">
                        <h1 className="font-bold text-4xl md:text-7xl leading-12 md:leading-19">
                            Visualize Your
                            <br />
                            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Colors</span> & 
                            <span className="ml-4 text-accent">Themes</span>
                            <br />
                            On a <span className="relative mr-10">Real <span className="text-sm md:text-lg absolute top-1 md:top-5 -right-8">(Fake)</span></span>Site
                        </h1>
                        <p className="text-muted text-md md:text-lg ml-1">This is some muted text to add as a subheader.</p>
                        <div className="flex gap-5 justify-center md:justify-start pt-2">
                            <Button>
                                Learn More
                            </Button>
                            <Button variant="outline">
                                Other Button
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 w-8/12 md:w-full relative right-10 order-1 md:order-2">
                        <Card className="py-0 h-6 md:h-20" />
                        <Card className="py-0 h-6 md:h-20 relative bg-card-light left-20" />
                        <Card className="py-0 h-6 md:h-20" />
                        <Card className="py-0 h-6 md:h-20 relative bg-card-light left-20" />
                    </div>
                </div>
            </div>
            <Highlights />
            <Pricing />
        </div>
    );
};