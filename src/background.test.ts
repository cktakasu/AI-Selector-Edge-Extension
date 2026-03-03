import { describe, expect, it, vi, beforeEach } from 'vitest';
import { setupContextMenus, handleContextMenuClick } from './background';
import { links } from './data/links';

describe('background.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup minimal chrome mock
        const chromeMock = {
            runtime: {
                lastError: undefined,
                onInstalled: { addListener: vi.fn() }
            },
            contextMenus: {
                create: vi.fn((_opts, callback) => {
                    if (callback) callback();
                }),
                onClicked: { addListener: vi.fn() }
            },
            tabs: {
                create: vi.fn()
            }
        };

        Object.defineProperty(globalThis, 'chrome', {
            value: chromeMock,
            configurable: true,
            writable: true
        });
    });

    it('setupContextMenus が親メニューと検索URLを持つサービスのサブメニューを作成する', () => {
        setupContextMenus();

        // 親メニュー作成の確認
        expect(globalThis.chrome.contextMenus.create).toHaveBeenCalledWith(
            expect.objectContaining({ id: 'ai-selector-parent' }),
            expect.any(Function)
        );

        // searchUrlを持つ各サブメニュー作成の確認
        const searchLinksCount = links.filter(l => l.searchUrl).length;
        expect(globalThis.chrome.contextMenus.create).toHaveBeenCalledTimes(searchLinksCount + 1);
    });

    it('handleContextMenuClick で選択テキストが正しくURLエンコードされてタブが開かれる', () => {
        const targetLink = links.find(l => l.searchUrl && l.id === 'chatgpt');
        expect(targetLink).toBeDefined();

        const mockInfo = {
            menuItemId: 'chatgpt',
            selectionText: 'テスト テキスト' // 空白が含まれる
        } as chrome.contextMenus.OnClickData;

        handleContextMenuClick(mockInfo);

        const expectedUrl = `${targetLink!.searchUrl}${encodeURIComponent('テスト テキスト')}`;
        expect(globalThis.chrome.tabs.create).toHaveBeenCalledWith({ url: expectedUrl });
    });

    it('handleContextMenuClick で selectionText がない場合は何もしない', () => {
        const mockInfo = {
            menuItemId: 'chatgpt'
        } as chrome.contextMenus.OnClickData;

        handleContextMenuClick(mockInfo);

        // undefined や 空文字 の場合は何も実行されない
        expect(globalThis.chrome.tabs.create).not.toHaveBeenCalled();
    });
});
