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
        <div className="min-h-screen bg-[var(--bg-body)] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[320px] bg-[var(--bg-popup)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-8 space-y-8 animate-pop-in">

                <header className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] leading-none">
                        設定
                    </h1>
                    <p className="text-[11px] font-medium text-[var(--text-muted)] tracking-wider uppercase mt-1">
                        AI Selector
                    </p>
                </header>

                <div className="space-y-3">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-sm font-medium text-[var(--text-primary)]">テーマの切り替え</span>
                    </div>

                    <div className="flex p-1 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)] shadow-inner">
                        <button
                            onClick={() => handleThemeChange('light')}
                            className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all duration-300 ${theme === 'light'
                                    ? 'bg-[var(--bg-popup)] text-[var(--text-primary)] shadow-sm border border-[var(--border-subtle)] scale-100'
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent scale-95 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Light
                        </button>
                        <button
                            onClick={() => handleThemeChange('dark')}
                            className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-lg transition-all duration-300 ${theme === 'dark'
                                    ? 'bg-[var(--bg-popup)] text-[var(--text-primary)] shadow-sm border border-[var(--border-subtle)] scale-100'
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent scale-95 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Dark
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

