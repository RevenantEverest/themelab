import { FaGithub, FaDiscord } from 'react-icons/fa';
import { motion } from 'motion/react';
import { URLS } from '@/constants';

function Footer() {

    return(
        <div className="flex flex-col relative">
            <div className="absolute bg-card top-0 h-5 w-full blur-md" />
            <div className="flex bg-card justify-center py-5 px-4 md:px-50 z-20">
                <div className="flex flex-1 z-10 items-center">
                    <div className="flex-1 justify-start">
                        <p className="text-sm">Copyright © {new Date().getFullYear()} ThemeLab</p>
                    </div>
                    <div className="flex-1 flex gap-3 text-2xl justify-end">
                        <motion.div
                            className="hover:cursor-pointer"
                            whileHover={{ y: "-.5vh" }}
                        >
                            <a href={"https://discord.com"} target="_blank" rel="noopener noreferrer">
                                <FaDiscord />
                            </a>
                        </motion.div>
                        <motion.div
                            className="hover:cursor-pointer"
                            whileHover={{ y: "-.5vh" }}
                        >
                            <a href={URLS.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;