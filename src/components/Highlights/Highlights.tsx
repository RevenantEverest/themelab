import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { FaSmileBeam, FaCheckCircle } from 'react-icons/fa';
import { FaBlenderPhone } from 'react-icons/fa6';

function Highlights() {
    
    return(
        <div className="flex flex-col gap-12">
            <div className="text-center flex flex-col gap-3">
                <h1 className="font-bold text-5xl">Why ThemeLab?</h1>
                <p className="text-muted">Visualize your custom theme on a real site.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <Card className="flex-1 flex items-center justify-center">
                    <CardHeader className="flex w-full items-center justify-center">
                        <FaSmileBeam className="text-6xl" />
                    </CardHeader>
                    <CardTitle>
                        <h2 className="text-2xl font-semibold">Instant Changes</h2>
                    </CardTitle>
                    <CardContent>
                        <p className="text-muted">See your changes instantly! Quickly prototype themes and export to your site.</p>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex items-center justify-center">
                    <CardHeader className="flex w-full items-center justify-center">
                        <FaCheckCircle className="text-6xl" />
                    </CardHeader>
                    <CardTitle>
                        <h2 className="text-2xl font-semibold">Spend Less Time</h2>
                    </CardTitle>
                    <CardContent>
                        <p className="text-muted">Don't waste time updating theme colors locally to see changes, pick your colors and get on with developing features!</p>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex items-center justify-center">
                    <CardHeader className="flex w-full items-center justify-center">
                        <FaBlenderPhone className="text-6xl" />
                    </CardHeader>
                    <CardTitle>
                        <h2 className="text-2xl font-semibold">Third Reason</h2>
                    </CardTitle>
                    <CardContent>
                        <p className="text-muted">I'm a developer, not a branding specialist. I don't know what else to put here.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Highlights;