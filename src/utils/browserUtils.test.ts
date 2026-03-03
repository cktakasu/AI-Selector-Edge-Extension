import { describe, expect, it, vi, afterEach } from 'vitest';
import { isChromeExtension, openInNewTab } from './browserUtils';

describe('browserUtils', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        Reflect.deleteProperty(globalThis, 'chrome');
    });

    it('isChromeExtension が chrome API 完全存在時に true を返す', () => {
        const chromeMock = {
            runtime: { lastError: undefined },
            tabs: { create: vi.fn((_opts, cb) => cb && cb()) }
        } as unknown as typeof chrome;
        Object.defineProperty(globalThis, 'chrome', { value: chromeMock, configurable: true });
        expect(isChromeExtension()).toBe(true);
    });

    it('isChromeExtension が chrome API 不足時に false を返す', () => {
        Object.defineProperty(globalThis, 'chrome', { value: {}, configurable: true });
        expect(isChromeExtension()).toBe(false);
    });

    it('openInNewTab が拡張機能環境で chrome.tabs.create を呼び出す', () => {
        const createMock = vi.fn((_opts, cb) => cb && cb());
        const chromeMock = {
            runtime: { lastError: undefined },
            tabs: { create: createMock }
        } as unknown as typeof chrome;
        Object.defineProperty(globalThis, 'chrome', { value: chromeMock, configurable: true });

        openInNewTab('https://example.com');
        expect(createMock).toHaveBeenCalledWith({ url: 'https://example.com' }, expect.any(Function));
    });

    it('openInNewTab がWebブラウザ環境で window.open にフォールバックする', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

        openInNewTab('https://example.com');
        expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });

    it('openInNewTab に空の文字が渡された場合は何もしない', () => {
        const createMock = vi.fn();
        const chromeMock = {
            runtime: { lastError: undefined },
            tabs: { create: createMock }
        } as unknown as typeof chrome;
        Object.defineProperty(globalThis, 'chrome', { value: chromeMock, configurable: true });

        openInNewTab('');
        expect(createMock).not.toHaveBeenCalled();
    });
});
