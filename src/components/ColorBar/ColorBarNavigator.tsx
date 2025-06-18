import type { ColorBarState } from './ColorBar';

interface ColorBarNavigatorProps {
    paths: ColorBarState[],
    currentPath: ColorBarState,
    setPath: (path: ColorBarState) => void
};

function ColorBarNavigator({ paths, currentPath, setPath }: ColorBarNavigatorProps) {

    const renderPaths = () => {
        return paths.map((path, index) => {
            const isActive = path === currentPath;

            return(
                <div 
                    key={`colorBar-nav-${path}-${index}`}
                    className={`${isActive && "rounded-lg bg-primary"} py-1 px-3`}
                    onClick={() => setPath(path)}
                >
                    <p 
                        className={`
                            ${!isActive && "hover:text-primary"}
                            font-semibold duration-150 hover:cursor-pointer text-sm`}
                    >
                        {path}
                    </p>
                </div>
            );
        });
    };
    
    return(
        <div className="flex items-center justify-center gap-5">
            {renderPaths()}
        </div>
    );
};

export default ColorBarNavigator;