/**
 * Checks if the current execution environment has access to chrome extension APIs.
 * @returns {boolean} True if running inside a Chrome extension with tabs API access.
 */
export const isChromeExtension = (): boolean => {
    return typeof chrome !== 'undefined' && !!chrome.tabs && !!chrome.tabs.create;
};

/**
 * Opens a URL in a new tab, handling both extension and standard web environments.
 * @param {string} url - The URL to open
 */
export const openInNewTab = (url: string): void => {
    if (!url) return;

    if (isChromeExtension()) {
        try {
            chrome.tabs.create({ url }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Failed to open tab, falling back to window.open:', chrome.runtime.lastError);
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        } catch (error) {
            console.error('Exception opening tab via chrome API:', error);
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
};
