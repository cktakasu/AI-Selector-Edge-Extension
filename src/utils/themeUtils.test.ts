import { describe, it, expect, beforeEach, vi } from 'vitest';
import { applyTheme, getStoredTheme, setStoredTheme } from './themeUtils';

describe('themeUtils', () => {
    beforeEach(() => {
        document.documentElement.className = '';
        vi.clearAllMocks();
        // Mock localStorage
        const store: Record<string, string> = {};
        vi.stubGlobal('localStorage', {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => { store[key] = value; },
        });
        // Mock chrome API
        vi.stubGlobal('chrome', undefined);
    });

    describe('applyTheme', () => {
        it('should add "dark" class when mode is "dark"', () => {
            applyTheme('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });

        it('should remove "dark" class when mode is "light"', () => {
            document.documentElement.classList.add('dark');
            applyTheme('light');
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
    });

    describe('storage operations (localStorage fallback)', () => {
        it('should get "light" by default', async () => {
            const theme = await getStoredTheme();
            expect(theme).toBe('light');
        });

        it('should store and retrieve "dark"', async () => {
            await setStoredTheme('dark');
            const theme = await getStoredTheme();
            expect(theme).toBe('dark');
        });
    });

    describe('storage operations (chrome.storage)', () => {
        beforeEach(() => {
            vi.stubGlobal('chrome', {
                runtime: { lastError: undefined },
                storage: {
                    local: {
                        get: vi.fn((_keys, callback) => callback({ theme: 'dark' })),
                        set: vi.fn((_data, callback) => callback && callback()),
                    },
                },
            });
        });

        it('should get theme from chrome.storage', async () => {
            const theme = await getStoredTheme();
            expect(theme).toBe('dark');
            expect(chrome.storage.local.get).toHaveBeenCalledWith(['theme'], expect.any(Function));
        });

        it('should set theme to chrome.storage', async () => {
            await setStoredTheme('light');
            expect(chrome.storage.local.set).toHaveBeenCalledWith({ theme: 'light' });
        });
    });
});
