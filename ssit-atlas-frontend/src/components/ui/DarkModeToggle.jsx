import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { toggleDarkMode, getCurrentTheme, initializeDarkMode } from '../../utils/darkMode';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Initialize dark mode on mount
        const currentlyDark = initializeDarkMode();
        setIsDark(currentlyDark);
    }, []);

    const handleToggle = () => {
        const newDarkState = toggleDarkMode();
        setIsDark(newDarkState);
    };

    return (
        <button
            onClick={handleToggle}
            className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle dark mode"
        >
            <div className="relative w-6 h-6">
                {/* Sun icon */}
                <Sun
                    className={`absolute inset-0 transition-all duration-500 ${isDark
                            ? 'opacity-0 rotate-180 scale-0'
                            : 'opacity-100 rotate-0 scale-100'
                        }`}
                    size={24}
                />
                {/* Moon icon */}
                <Moon
                    className={`absolute inset-0 transition-all duration-500 ${isDark
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-180 scale-0'
                        }`}
                    size={24}
                />
            </div>
        </button>
    );
};

export default DarkModeToggle;
