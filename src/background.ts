import { links } from './data/links'

/**
 * Handles the creation of the parent context menu item and submenus for each AI link.
 */
export const setupContextMenus = (): void => {
    chrome.contextMenus.create({
        id: 'ai-selector-parent',
        title: 'AI Selector で検索',
        contexts: ['selection']
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to create parent context menu:', chrome.runtime.lastError);
            return;
        }

        links.forEach((link) => {
            if (link.searchUrl) {
                chrome.contextMenus.create({
                    id: link.id,
                    parentId: 'ai-selector-parent',
                    title: link.name,
                    contexts: ['selection']
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.warn(`Failed to create submenu for ${link.name}:`, chrome.runtime.lastError);
                    }
                });
            }
        });
    });
};

/**
 * Handles clicks on the context menu items.
 * @param info - Information about the clicked menu item.
 */
export const handleContextMenuClick = (info: chrome.contextMenus.OnClickData): void => {
    const linkId = info.menuItemId as string;
    const selectionText = info.selectionText;

    if (!selectionText) return;

    const link = links.find(l => l.id === linkId);
    if (link && link.searchUrl) {
        const fullUrl = `${link.searchUrl}${encodeURIComponent(selectionText)}`;
        try {
            chrome.tabs.create({ url: fullUrl });
        } catch (error) {
            console.error('Failed to open tab for AI search:', error);
        }
    }
};

// Initialize listeners if Chrome APIs are available
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.contextMenus) {
    chrome.runtime.onInstalled.addListener(setupContextMenus);
    chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
}
