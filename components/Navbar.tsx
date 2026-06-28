'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useChatModal } from './ChatContext';

const navLinks = [
    { href: '/laws', label: 'Laws' },
    { href: '/projects', label: 'Projects' },
    {
        href: '/archives',
        label: 'Archives',
        children: [
            { href: '/archives/hermetic-principles', label: 'Hermetic Principles' },
            { href: '/archives/dante', label: "Dante's Inferno" },
            { href: '/archives/iliad-odyssey', label: 'Iliad & Odyssey' },
            { href: '/archives/aeneid', label: 'Aeneid' },
            { href: '/archives/books', label: 'Books' },
        ],
    },
    { href: '/100m', label: '100M' },
    { href: '/models', label: 'Models' },
    { href: '/council/agent', label: 'Agent' },
    { href: '/council', label: 'Council' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { setOpen } = useChatModal();

    function isActive(href: string) {
        if (href === '/council') return pathname === '/council';
        return pathname === href || pathname.startsWith(href + '/');
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-30 border-b-2 border-[#b1844f]/35 bg-[#0b0a08]/90 backdrop-blur-sm">
            <div className="flex items-center justify-between px-10 py-4">
                {/* logo */}
                <Link href="/" className="flex items-baseline gap-4 group">
                    <span className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.08em] text-[#d6b274] group-hover:text-[#eadfca] transition-colors">
                        PANTEON
                    </span>
                </Link>

                {/* links + chat trigger */}
                <div className="flex items-center gap-1">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.href} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.35em] transition-colors ${isActive(link.href)
                                            ? 'text-[#d6b274]'
                                            : 'text-[#81745e] hover:text-[#a4774c]'
                                        }`}
                                >
                                    {link.label}
                                </Link>

                                {/* dropdown */}
                                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                                    <div className="border border-[#b1844f]/25 bg-[#0b0a08]/95 backdrop-blur-sm py-1 min-w-[200px]">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`block px-5 py-2.5 font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${pathname === child.href || pathname.startsWith(child.href + '/')
                                                        ? 'text-[#d6b274]'
                                                        : 'text-[#81745e] hover:text-[#a4774c] hover:bg-[#b1844f]/5'
                                                    }`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.35em] transition-colors ${isActive(link.href)
                                        ? 'text-[#d6b274]'
                                        : 'text-[#81745e] hover:text-[#a4774c]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}

                    {/* divider */}
                    <span className="mx-2 h-3 w-px bg-[#b1844f]/25" />

                    {/* chat trigger */}
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Open Panteon interface"
                        className="flex items-center gap-2 border border-[#b1844f]/30 px-4 py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.35em] text-[#a4774c] transition-colors hover:border-[#b1844f]/60 hover:text-[#d6b274]"
                    >
                        Interface
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                            <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                            <circle cx="4" cy="4" r="1.2" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
