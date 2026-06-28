'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Interface, { ChatState, makeEmptyChatState } from './Interface';
import { useChatModal } from './ChatContext';

interface Tab {
    id: number;
    label: string;
    state: ChatState;
}

let nextTabId = 2;

function makeTab(id: number, label: string, source: string): Tab {
    return { id, label, state: makeEmptyChatState(source) };
}

export default function ChatModal() {
    const { open, setOpen } = useChatModal();
    const pathname = usePathname();

    const [tabs, setTabs] = useState<Tab[]>(() => [makeTab(1, 'I', '/')]);
    const [activeId, setActiveId] = useState<number>(1);

    // Close on Escape
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    function addTab() {
        const id = nextTabId++;
        const label = toRoman(tabs.length + 1);
        setTabs((prev) => [...prev, makeTab(id, label, pathname)]);
        setActiveId(id);
    }

    function closeTab(id: number) {
        if (tabs.length === 1) return; // keep at least one
        const idx = tabs.findIndex((t) => t.id === id);
        const next = tabs.filter((t) => t.id !== id);
        setTabs(next);
        if (activeId === id) {
            // activate neighbour
            setActiveId(next[Math.min(idx, next.length - 1)].id);
        }
    }

    function updateTabState(id: number, state: ChatState) {
        setTabs((prev) => prev.map((t) => t.id === id ? { ...t, state } : t));
    }

    const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-[#0b0a08]/80 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Panteon Interface"
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex h-full flex-col border-l border-[#b1844f]/25 bg-[#0b0a08]">

                    {/* header */}
                    <div className="flex shrink-0 items-center justify-between border-b border-[#b1844f]/20 px-7 py-4">
                        <div className="flex items-baseline gap-3">
                            <span className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.08em] text-[#d6b274]">
                                Panteon
                            </span>
                            <span className="font-[family-name:var(--font-plex)] text-[8px] uppercase tracking-[0.4em] text-[#81745e]">
                                {pathname === '/' ? 'Home' : pathname.replace(/^\//, '').replace(/\//g, ' · ')}
                            </span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            className="font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-[#81745e] hover:text-[#a4774c] transition-colors"
                        >
                            Close
                        </button>
                    </div>

                    {/* tab bar */}
                    <div className="flex shrink-0 items-center border-b border-[#b1844f]/15 px-4">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`group relative flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors ${tab.id === activeId
                                    ? 'border-b border-[#b1844f]/60 text-[#c9a96e]'
                                    : 'text-[#81745e]/50 hover:text-[#81745e]'
                                    }`}
                                onClick={() => setActiveId(tab.id)}
                            >
                                <span className="font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.15em]">
                                    {tab.label}
                                </span>
                                {/* first message preview */}
                                {tab.state.messages.length > 0 && (
                                    <span className="max-w-[80px] truncate font-[family-name:var(--font-cormorant)] text-[11px] italic opacity-60">
                                        {tab.state.messages[0].content}
                                    </span>
                                )}
                                {tabs.length > 1 && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                                        aria-label={`Close tab ${tab.label}`}
                                        className="ml-1 opacity-0 group-hover:opacity-60 hover:!opacity-100 text-[#81745e] transition-opacity text-[10px] leading-none"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* new tab */}
                        <button
                            onClick={addTab}
                            aria-label="New chat"
                            className="ml-1 flex h-6 w-6 items-center justify-center text-[#81745e]/40 hover:text-[#a4774c] transition-colors text-base leading-none"
                        >
                            +
                        </button>
                    </div>

                    {/* active interface */}
                    <div className="flex-1 overflow-hidden">
                        <Interface
                            key={activeTab.id}
                            source={pathname}
                            state={activeTab.state}
                            onChange={(next) => updateTabState(activeTab.id, next)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function toRoman(n: number): string {
    const map: [number, string][] = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
    ];
    let result = '';
    for (const [val, sym] of map) {
        while (n >= val) { result += sym; n -= val; }
    }
    return result;
}
