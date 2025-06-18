import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { FaDollarSign, FaCheck } from 'react-icons/fa';
import { Button } from '../ui/button';

interface PricingCardProps {
    title: string,
    subtitle: string,
    price: number,
    features: string[],
    priceTime?: string,
    standout?: boolean
};

function PricingCard({ title, subtitle, price, priceTime, standout, features }: PricingCardProps) {

    const renderFeatures = () => {
        return features.map((feature, index) => (
            <div 
                key={`pricing-card-${title}-${feature}-${index}`}
                className="flex items-center gap-4"
            >
                <FaCheck className="text-2xl text-primary" />
                <p>{feature}</p>
            </div>
        ));
    };

    return(
        <Card className={`flex-1 ${standout && "bg-card-light"}`}>
            <CardTitle className="text-center flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="font-bold text-2xl">{title}</h2>
                    <p className="text-muted">{subtitle}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <FaDollarSign className="text-primary" />
                    <p className="text-lg font-semibold">
                        {price === 0 ? "Free" : (price).toLocaleString()} <span>{priceTime && `/ ${priceTime}`}</span>
                    </p>
                </div>
            </CardTitle>
            <CardContent className="flex flex-col gap-10 h-full">
                <div className="flex-1 flex flex-col gap-8 px-10">
                    {renderFeatures()}
                </div>
                <div className="flex justify-center">
                    <Button size="lg" className="">
                        Purchase
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PricingCard;