export type ThemeMode = 'light' | 'dark';

/**
 * Gets the stored theme from chrome.storage.local.
 * Defaults to 'light' if no theme is stored or if not in an extension environment.
 */
export const getStoredTheme = (): Promise<ThemeMode> => {
    return new Promise((resolve) => {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(['theme'], (result) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error reading theme from storage:', chrome.runtime.lastError);
                        resolve('light');
                        return;
                    }
                    resolve((result.theme as ThemeMode) || 'light');
                });
            } else {
                const stored = localStorage.getItem('theme') as ThemeMode;
                resolve(stored === 'dark' ? 'dark' : 'light');
            }
        } catch (error) {
            console.error('Failed to get theme:', error);
            resolve('light');
        }
    });
};

/**
 * Stores the selected theme in chrome.storage.local.
 */
export const setStoredTheme = async (mode: ThemeMode): Promise<void> => {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            await chrome.storage.local.set({ theme: mode });
        } else {
            localStorage.setItem('theme', mode);
        }
    } catch (error) {
        console.error('Failed to save theme:', error);
    }
};

/**
 * Applies the theme to the document root by adding/removing the 'dark' class.
 */
export const applyTheme = (mode: ThemeMode): void => {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

/**
 * Initializes the theme by reading from storage and applying it.
 */
export const initTheme = async (): Promise<void> => {
    const mode = await getStoredTheme();
    applyTheme(mode);
};
