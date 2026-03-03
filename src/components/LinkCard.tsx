import { useState, memo, useCallback, useMemo } from 'react'
import type { Link } from '../data/links'
import { openInNewTab } from '../utils/browserUtils'
import { isWithinDays } from '../utils/dateUtils'
import { Tooltip } from './Tooltip'

interface LinkCardProps {
    link: Link
    index: number
}

export const LinkCard = memo(function LinkCard({ link, index }: LinkCardProps) {
    const [imgError, setImgError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // 14日以内なら NEW バッジを表示
    const isNew = useMemo(() => isWithinDays(link.updatedAt, 14), [link.updatedAt]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);
    const handleClick = useCallback(() => openInNewTab(link.url), [link.url]);

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            className="relative flex items-center justify-center p-0 bg-transparent border-none shadow-none outline-none rounded-lg group w-[38px] h-[38px] cursor-pointer animate-pop-in opacity-0 fill-mode-forwards glow-hover hover:scale-110 hover:-translate-y-0.5"
            style={{
                animationDelay: `${index * 40}ms`,
                boxShadow: isHovered ? `0 0 12px 2px ${link.brandColor || '#4f46e5'}50` : 'none'
            }}
            aria-label={`Open ${link.name}`}
        >
            {isHovered && <Tooltip link={link} visible={isHovered} />}
            {isNew && (
                <div className="absolute top-[2px] right-[2px] w-1.5 h-1.5 bg-green-500 rounded-full new-badge z-10" aria-hidden="true" />
            )}
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                {!imgError ? (
                    <img
                        src={`/icons/${link.icon}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`w-[24px] h-[24px] object-contain transition-all duration-200 ${link.invertDark ? 'dark:invert' : ''}`}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">
                        {link.name.substring(0, 2)}
                    </span>
                )}
            </div>
        </button>
    )
});
