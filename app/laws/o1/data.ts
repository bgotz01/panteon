export type Example = {
    name: string;
    category: string;
    axis: { from: string; to: string };
    beforeTitle?: string;
    afterTitle?: string;
    beforeDetail: string;
    afterDetail: string;
    beforeTags: string[];
    afterTags: string[];
};

export type GreeceRomeRow = { axis: string; greek: string; roman: string };
export type GreeceRomeGroup = { greekLabel: string; romanLabel: string; rows: GreeceRomeRow[] };

export const is: string[] = [
    'A law of evolution, not oscillation.',
    'A structural pattern — each new cycle inverts the dominant characteristic of the previous one.',
    'A forward movement. The prior cycle defines the axis. The next cycle moves to the other end.',
];

export const isNot: string[] = [
    'A pendulum. The next cycle does not swing back to something that existed before.',
    'A reversion. The opposite does not need to have existed previously — it is often genuinely new.',
    'A prediction of the full shape of what comes next — only the axis it moves along.',
];

export const GREECE_ROME = 'Greece → Rome';

export const greeceRomeInversions: GreeceRomeGroup[] = [
    {
        greekLabel: 'Ideas',
        romanLabel: 'Systems',
        rows: [
            { axis: 'Intellectual output', greek: 'Philosophy', roman: 'Law' },
            { axis: 'Primary drive', greek: 'Discovery', roman: 'Administration' },
            { axis: 'Celebrated figure', greek: 'Thinkers', roman: 'Builders' },
            { axis: 'Currency of prestige', greek: 'Knowledge', roman: 'Institutions' },
        ],
    },
    {
        greekLabel: 'Idealism',
        romanLabel: 'Pragmatism',
        rows: [
            { axis: 'Architectural goal', greek: 'Beauty', roman: 'Utility' },
            { axis: 'Method of inquiry', greek: 'Theory', roman: 'Practice' },
            { axis: 'Mode of reasoning', greek: 'Abstract', roman: 'Concrete' },
            { axis: 'Ultimate measure', greek: 'Truth', roman: 'Results' },
        ],
    },
    {
        greekLabel: 'Individual',
        romanLabel: 'Institution',
        rows: [
            { axis: 'Military unit of identity', greek: 'Hero', roman: 'Legion' },
            { axis: 'Political unit', greek: 'City-State', roman: 'Empire' },
            { axis: 'Highest personal aspiration', greek: 'Personal Glory', roman: 'Collective Duty' },
            { axis: 'Organising dynamic', greek: 'Competition', roman: 'Unity' },
        ],
    },
    {
        greekLabel: 'Freedom',
        romanLabel: 'Order',
        rows: [
            { axis: 'Political mechanism', greek: 'Debate', roman: 'Command' },
            { axis: 'Governing structure', greek: 'Democracy', roman: 'Hierarchy' },
            { axis: 'Civic value', greek: 'Independence', roman: 'Discipline' },
            { axis: 'Organising principle', greek: 'Autonomy', roman: 'Standardisation' },
        ],
    },
];

export const allExamples: Example[] = [
    {
        name: 'Hip-Hop → Eminem',
        category: 'Pop Culture',
        axis: { from: 'Black voice', to: 'White outsider' },
        beforeTitle: 'Hip-Hop',
        afterTitle: 'Eminem',
        beforeDetail: 'Hip-hop was born as a Black art form — rooted in the streets of New York and Compton, expressing the experience of communities ignored by mainstream culture. Authenticity meant lived experience, and that experience was Black.',
        afterDetail: 'Eminem arrived as a white kid from Detroit who out-rapped nearly everyone — and the genre that celebrated Black authenticity above all else crowned him its greatest. The culture that defined itself against whiteness produced its most dominant figure in a white man.',
        beforeTags: ['Black voice', 'lived experience', 'community'],
        afterTags: ['white outsider', 'technical mastery', 'dominance'],
    },
    {
        name: 'Golf → Tiger Woods',
        category: 'Pop Culture',
        axis: { from: 'white exclusivity', to: 'mixed-race outsider' },
        beforeTitle: 'Golf',
        afterTitle: 'Tiger Woods',
        beforeDetail: 'Golf was the sport of white wealth — country clubs, restricted membership, a game built around exclusion. Augusta National did not admit Black members until 1990. The culture of the sport was quiet, controlled, and homogeneous.',
        afterDetail: "Tiger Woods became the most dominant golfer in history and the most recognisable athlete on earth — a Black man who didn't just enter the sport but redefined it. He brought crowds, energy, and a global audience that golf had never seen.",
        beforeTags: ['white exclusivity', 'country clubs', 'old wealth'],
        afterTags: ['mixed-race outsider', 'global icon', 'athletic dominance'],
    },
    {
        name: 'Dennis Rodman',
        category: 'Personal',
        axis: { from: 'invisible', to: 'spectacle' },
        beforeDetail: 'Painfully shy as a young man — teammates said he could barely make eye contact and kept almost entirely to himself.',
        afterDetail: 'The most visually outrageous player in NBA history — wild hair, tattoos, piercings, celebrity relationships.',
        beforeTags: ['withdrawn', 'silent', 'unseen'],
        afterTags: ['spectacle', 'provocation', 'presence'],
    },
    {
        name: 'Blockbuster → Netflix',
        category: 'Industry',
        axis: { from: 'scheduled', to: 'on-demand' },
        beforeTitle: 'Blockbuster',
        afterTitle: 'Netflix',
        beforeDetail: 'Video rental built around physical stores, late fees, and the ritual of browsing shelves. You watched what was available, when it was available — the store and the schedule were the product.',
        afterDetail: 'A subscription service that delivered any film, any time, with no late fees and no shelves. The store disappeared entirely; the catalog became infinite and the viewer set the schedule.',
        beforeTags: ['physical stores', 'scheduled viewing', 'limited inventory'],
        afterTags: ['digital delivery', 'on-demand viewing', 'infinite catalog'],
    },
    {
        name: 'Hotels → Airbnb',
        category: 'Industry',
        axis: { from: 'standardization', to: 'uniqueness' },
        beforeTitle: 'Hotels',
        afterTitle: 'Airbnb',
        beforeDetail: 'Hospitality built on consistency — every room predictable, every property purpose-built, owned and operated by corporations. The promise was sameness: you knew exactly what you were getting.',
        afterDetail: 'A marketplace of individual homes hosted by their owners — every listing different, no two stays alike. The promise became the opposite: a unique place, a local experience, something a hotel could never offer.',
        beforeTags: ['standard rooms', 'corporate ownership', 'purpose-built'],
        afterTags: ['unique homes', 'individual hosts', 'existing inventory'],
    },
    {
        name: 'Hollywood → YouTube',
        category: 'Industry',
        axis: { from: 'gatekeepers', to: 'creators' },
        beforeTitle: 'Hollywood',
        afterTitle: 'YouTube',
        beforeDetail: 'A small number of studios controlled what got made, what got distributed, and who got seen. Large budgets, long production cycles, and industry gatekeepers decided what the world watched.',
        afterDetail: 'Anyone with a camera could publish to a global audience the same day. Millions of creators, minimal budgets, no gatekeepers. The studio became irrelevant to reach.',
        beforeTags: ['few creators', 'large budgets', 'gatekeepers'],
        afterTags: ['millions of creators', 'low budgets', 'open access'],
    },
    {
        name: 'Taxi Industry → Uber',
        category: 'Industry',
        axis: { from: 'restricted supply', to: 'open supply' },
        beforeTitle: 'Taxi Industry',
        afterTitle: 'Uber',
        beforeDetail: 'A licensed, regulated industry — medallions, dispatch centres, fixed pricing, and a deliberately restricted number of drivers. Supply was controlled by design.',
        afterDetail: 'Any driver with a car and a phone could join the platform. Supply became elastic, pricing dynamic, and the medallion system collapsed overnight.',
        beforeTags: ['licensed drivers', 'dispatch centers', 'fixed supply'],
        afterTags: ['any driver', 'mobile platform', 'elastic supply'],
    },
    {
        name: 'Paganism → Judaism',
        category: 'Religion',
        axis: { from: 'many gods', to: 'one god' },
        beforeTitle: 'Paganism',
        afterTitle: 'Judaism',
        beforeDetail: 'Gods were plural, local, and embodied — each tied to a place, a season, a force of nature.',
        afterDetail: 'One universal, formless god — transcendent, without location, bound to a people through covenant rather than geography.',
        beforeTags: ['plural', 'local', 'nature-bound'],
        afterTags: ['one god', 'covenant', 'law'],
    },
    {
        name: 'Judaism → Christianity',
        category: 'Religion',
        axis: { from: 'one people', to: 'all people' },
        beforeTitle: 'Judaism',
        afterTitle: 'Christianity',
        beforeDetail: 'Salvation belonged to a chosen nation — defined by lineage, law, and strict boundaries of belonging.',
        afterDetail: 'Salvation opened to every person regardless of origin — faith alone, no bloodline required.',
        beforeTags: ['chosen people', 'lineage', 'law'],
        afterTags: ['universal', 'grace', 'faith'],
    },
    {
        name: 'Christianity → Islam',
        category: 'Religion',
        axis: { from: 'God becomes man', to: 'man submits to God' },
        beforeTitle: 'Christianity',
        afterTitle: 'Islam',
        beforeDetail: 'Christianity centers on incarnation — God enters history as man, suffers, dies, and redeems through grace.',
        afterDetail: 'Islam restores absolute transcendence — God does not become man; man submits to God through revelation, law, and disciplined practice.',
        beforeTags: ['personal relationship', 'God incarnation', 'inner transformation'],
        afterTags: ['submission', 'prophethood', 'external practice'],
    },
    {
        name: 'Portuguese → Spanish',
        category: 'Empires',
        axis: { from: 'trade routes', to: 'territory' },
        beforeTitle: 'Portuguese',
        afterTitle: 'Spanish',
        beforeDetail: 'Power built through sea routes, trading posts, and commercial monopoly. Presence was coastal, networked, mercantile.',
        afterDetail: 'Power built through territorial conquest, extraction of resources, and forced religious conversion. Presence was inland and total.',
        beforeTags: ['sea routes', 'trade posts', 'commerce'],
        afterTags: ['conquest', 'extraction', 'conversion'],
    },
    {
        name: 'Spanish → British',
        category: 'Empires',
        axis: { from: 'extraction', to: 'industry' },
        beforeTitle: 'Spanish',
        afterTitle: 'British',
        beforeDetail: 'Wealth came from extracting what already existed — gold, silver, land, labour. The empire consumed its territories.',
        afterDetail: 'Wealth came from industrial production and institutional systems — law, trade, administration. The empire organised its territories.',
        beforeTags: ['extraction', 'raw resources', 'direct rule'],
        afterTags: ['industry', 'institutions', 'indirect rule'],
    },
    {
        name: 'British → American',
        category: 'Empires',
        axis: { from: 'territorial control', to: 'systemic influence' },
        beforeTitle: 'British',
        afterTitle: 'American',
        beforeDetail: 'Empire required physical occupation — troops, governors, flags, and formal colonial administration across every territory.',
        afterDetail: 'Dominance without occupation — through dollar dependency, military alliances, cultural export, and control of global institutions.',
        beforeTags: ['occupation', 'colonies', 'military sea dominance'],
        afterTags: ['dollar', 'culture', 'military air dominance'],
    },
];
