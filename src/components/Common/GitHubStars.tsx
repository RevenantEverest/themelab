import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

import { URLS } from '@/constants';

interface GithubStarsProps {
    owner: string,
    repo: string
};

const GitHubStars = ({ owner, repo }: GithubStarsProps) => {
    const [stars, setStars] = useState<number>(0);

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                    method: "get",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data: { stargazers_count: number } = await response.json();
                console.log("Stargazers => ", data.stargazers_count);
                setStars(data.stargazers_count);
            } catch (err: unknown) {
                console.error(err || 'Failed to fetch data');
            }
        };

        fetchStars();
    }, [owner, repo]);

    return (
        <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger>
                <a href={URLS.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-1 hover:bg-secondary/10 hover:cursor-pointer py-2 px-2 rounded-md">
                        <FaGithub className="text-2xl" />
                        <p className="font-semibold text-md -mt-.5">{stars.toLocaleString()}</p>
                    </div>
                </a>
            </TooltipTrigger>
            <TooltipContent>
                <p>Github Stars</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
};

export default GitHubStars;