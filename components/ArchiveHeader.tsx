interface ArchiveHeaderProps {
    eyebrow: string;
    title: string;
    description?: React.ReactNode;
}

export default function ArchiveHeader({ eyebrow, title, description }: ArchiveHeaderProps) {
    return (
        <div className="mt-8 border border-gold-muted/20 bg-surface/80 p-7 text-center">
            <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim">
                {eyebrow}
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-cinzel)] text-4xl tracking-[0.06em] text-parchment">
                {title}
            </h1>
            {description && (
                <p className="mt-4 max-w-3xl mx-auto font-[family-name:var(--font-cormorant)] text-xl leading-9 text-parchment-3">
                    {description}
                </p>
            )}
        </div>
    );
}
