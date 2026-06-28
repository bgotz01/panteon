interface ComparisonTableProps {
    label?: string;
    columns: string[];           // header labels for the value columns (excludes the row-label column)
    rows: {
        category: string;
        values: string[];        // one value per column, in same order as columns
    }[];
}

export default function ComparisonTable({ label, columns, rows }: ComparisonTableProps) {
    const colCount = columns.length + 1; // +1 for the category column
    const gridCols = `1fr repeat(${columns.length}, 1fr)`;

    return (
        <div className="mt-10">
            {label && (
                <div className="font-[family-name:var(--font-plex)] text-[10px] uppercase tracking-[0.5em] text-gold-dim mb-4">
                    {label}
                </div>
            )}

            {/* column headers */}
            <div
                className="grid border border-b-0 border-gold-muted/20 bg-surface/60 px-6 py-3 text-center"
                style={{ gridTemplateColumns: gridCols }}
            >
                <div />
                {columns.map((col) => (
                    <div key={col} className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.06em] text-parchment-2">
                        {col}
                    </div>
                ))}
            </div>

            {/* rows */}
            <div className="border border-gold-muted/20 space-y-px">
                {rows.map((row) => (
                    <div
                        key={row.category}
                        className="grid bg-surface-alt/75 hover:bg-surface-alt transition-colors text-center"
                        style={{ gridTemplateColumns: gridCols }}
                    >
                        <div className="px-6 py-4 border-r border-gold-muted/10 font-[family-name:var(--font-plex)] text-[9px] uppercase tracking-[0.4em] text-gold-dim flex items-center justify-center">
                            {row.category}
                        </div>
                        {row.values.map((val, i) => (
                            <div
                                key={i}
                                className={`px-6 py-4 font-[family-name:var(--font-cormorant)] text-lg text-parchment-3 flex items-center justify-center ${i < row.values.length - 1 ? 'border-r border-gold-muted/10' : ''}`}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
