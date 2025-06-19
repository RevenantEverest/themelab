import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa6';

import { WaveDivider, SocialIcon } from '@/components/Common';
import FooterRoutes from '@/components/Navigation/FooterRoutes';

import ThemeLabLogo from '@/assets/themelab.svg';

import { useThemeStore } from '@/store/theme';
import { URLS } from '@/constants';

export interface FooterMenu {
    title: string,
    url: string
};

const FOOTER_MENU: FooterMenu[] = [
    {
        title: 'Privacy Policy',
        url: '/policies/privacy-policy'
    },
    {
        title: 'Refund Policy',
        url: '/policies/refund-policy'
    },
    {
        title: 'Shipping Policy',
        url: '/policies/shipping-policy'
    },
    {
        title: 'Terms of Service',
        url: '/policies/terms-of-service'
    },
];

function Footer() {

    const theme = useThemeStore((state) => state.currentTheme);

    return(
        <div className="relative z-20">
            <footer className="bg-card-light py-10 flex flex-col gap-10 items-center justify-center">
                <WaveDivider className="absolute z-40 w-full -top-10" bgColor={theme.colors.background} />
                <div className="flex flex-col md:flex-row items-center justify-center md:w-6/12 gap-20 md:gap-0 pb-40">
                    <div className="flex-1 flex justify-center md:justify-start">
                        <img className="!relative !w-5/12" src={ThemeLabLogo} alt="theme lab logo" />
                    </div>
                    <div className="flex flex-1 flex-col gap-6 items-center md:items-end -mt-1">
                        <h1 className="font-obo font-semibold text-xl text-center md:text-left">Follow Me</h1>
                        <div className="flex justify-center md:justify-end gap-6 w-full">
                            <SocialIcon icon={FaLinkedin} tooltip="LinkedIn" to={URLS.LINKEDIN} size="3xl" />
                            <SocialIcon icon={FaGlobe} tooltip="Personal Site" to={URLS.PERSONAL_SITE} size="3xl" />
                            <SocialIcon icon={FaGithub} tooltip="GitHub" to={URLS.GITHUB_REPO} size="3xl" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10 text-xs font-semibold">
                    <p className="order-2 md:order-1 text-center md:text-left">Copyright © {new Date().getFullYear()} Theme Lab</p>
                    <div className="order-1 md:order-2">
                        <FooterRoutes menu={FOOTER_MENU} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;