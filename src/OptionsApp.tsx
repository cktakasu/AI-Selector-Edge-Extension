import { useEffect, useState } from 'react'
import { getStoredTheme, setStoredTheme, applyTheme, ThemeMode } from './utils/themeUtils'

export function OptionsApp() {
    const [theme, setTheme] = useState<ThemeMode>('light')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getStoredTheme().then((storedTheme) => {
            setTheme(storedTheme)
            setIsLoading(false)
        })
    }, [])

    const handleThemeChange = async (newTheme: ThemeMode) => {
        setTheme(newTheme)
        await setStoredTheme(newTheme)
        applyTheme(newTheme)
    }

    if (isLoading) return null

    return (
        <div className="min-h-screen p-8 flex flex-col items-center">
            <div className="max-w-md w-full bg-[var(--bg-popup)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-8 space-y-8 animate-pop-in">
                <header className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                        AI Selector 設定
                    </h1>
                    <p className="text-sm text-[var(--text-muted)]">
                        拡張機能の外観と動作をカスタマイズします
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        外観
                    </h2>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[var(--text-primary)]">
                            テーマモード
                        </label>
                        <div className="flex p-1 bg-[var(--bg-card-hover)] rounded-xl border border-[var(--border-subtle)]">
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${theme === 'light'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <span role="img" aria-label="Light mode">☀️</span>
                                ライト
                            </button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${theme === 'dark'
                                        ? 'bg-gray-800 text-white shadow-sm'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <span role="img" aria-label="Dark mode">🌙</span>
                                ダーク
                            </button>
                        </div>
                    </div>
                </section>

                <footer className="pt-4 border-t border-[var(--border-subtle)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)]">
                        設定は自動的に保存されます
                    </p>
                </footer>
            </div>
        </div>
    )
}
