import type { FooterMenu } from '@/navigation/Footer';

import { Link } from '@tanstack/react-router';

export interface FooterRoutesProps {
    menu: FooterMenu[]
};

function FooterRoutes({ menu }: FooterRoutesProps) {

    return (
        <nav className="flex flex-col md:flex-row items-center gap-4 text-xs font-semibold" role="navigation">
            {menu.map((item, index) => {
                if (!item.url) return null;

                // if the url is internal, we strip the domain
                const url = item.url;
                const key = item.title + index;
                const isExternal = !url.startsWith('/');

                return isExternal ? (
                    <a href={url} key={key} rel="noopener noreferrer" target="_blank">
                        {item.title}
                    </a>
                ) : (
                    <Link
                        className="!text-text hover:!text-primary"
                        key={key}
                        to={url}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
};

export default FooterRoutes;