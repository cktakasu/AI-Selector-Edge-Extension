import type { Link } from '../data/links'

interface TooltipProps {
    link: Link
    visible: boolean
}

const CATEGORY_STYLES: Record<Link['category'], string> = {
    'LLM': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    'Productivity': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Dev': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    'Image': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'Audio': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'Video': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export function Tooltip({ link, visible }: TooltipProps) {
    if (!visible) return null;

    return (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 text-left bg-[var(--bg-popup)] border border-[var(--border-subtle)] shadow-xl rounded-lg pointer-events-none animate-tooltip-in">
            <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[var(--text-primary)] leading-tight">{link.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_STYLES[link.category]}`}>
                    {link.category}
                </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] leading-snug line-clamp-2 m-0">
                {link.description}
            </p>
        </div>
    )
}
