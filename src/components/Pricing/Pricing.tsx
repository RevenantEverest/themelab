import PricingCard from './PricingCard';

function Pricing() {

    return(
        <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-5xl">Pricing</h1>
                <p className="text-muted">This tool is 100% free. A pricing section is just a common UI component.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5">
                <PricingCard
                    title="Basic"
                    subtitle="The free sample."
                    price={0}
                    features={[
                        "Pick colors",
                        "View site"
                    ]}
                />
                <PricingCard
                    standout
                    title="Premium"
                    subtitle="Typical paid plan."
                    price={10}
                    priceTime="month"
                    features={[
                        "Pick colors",
                        "View site",
                        "Export / save themes",
                        "Pay money"
                    ]}
                /><PricingCard
                    title="Super Awesome Mega Expensive"
                    subtitle="Our most exclusive corporate experience!"
                    price={9871625342}
                    priceTime="hour"
                    features={[
                        "Pick colors",
                        "View site",
                        "Export / save themes",
                        "Pay money",
                        "Increase shareholder value",
                        "Anything you want",
                        "This plan is also per user"
                    ]}
                />
            </div>
        </div>
    );
};

export default Pricing;