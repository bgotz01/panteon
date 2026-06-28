export const MODELS = [
    { id: 'deepseek/deepseek-v4-flash', label: 'DeepSeek V4 Flash', cost: '$0.09 / $0.18', inputCost: 0.09, outputCost: 0.18, context: '1M', speed: '21 t/s', speedNum: 21, latency: '870ms', latencyMs: 870 },
    { id: 'minimax/minimax-m3', label: 'MiniMax M3', cost: '$0.30 / $1.20', inputCost: 0.30, outputCost: 1.20, context: '1M', speed: '44 t/s', speedNum: 44, latency: '2202ms', latencyMs: 2202 },
    { id: 'xiaomi/mimo-v2.5', label: 'Xiaomi MiMo-V2.5', cost: '$0.14 / $0.28', inputCost: 0.14, outputCost: 0.28, context: '1M', speed: '38 t/s', speedNum: 38, latency: '2128ms', latencyMs: 2128 },
    { id: 'tencent/hy3-preview', label: 'Tencent Hy3 Preview', cost: '$0.07 / $0.26', inputCost: 0.07, outputCost: 0.26, context: '262K', speed: '54 t/s', speedNum: 54, latency: '4281ms', latencyMs: 4281 },
    { id: 'anthropic/claude-opus-4', label: 'Claude Opus 4', cost: '$5.00 / $25.00', inputCost: 5.00, outputCost: 25.00, context: '1M', speed: '156 t/s', speedNum: 156, latency: '997ms', latencyMs: 997 },
    { id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro', cost: '$0.44 / $0.87', inputCost: 0.44, outputCost: 0.87, context: '1M', speed: '66 t/s', speedNum: 66, latency: '1256ms', latencyMs: 1256 },
    { id: 'openrouter/owl-alpha', label: 'Owl Alpha', cost: 'Free', inputCost: 0, outputCost: 0, context: '1M', speed: '16 t/s', speedNum: 16, latency: '4120ms', latencyMs: 4120 },
    { id: 'anthropic/claude-sonnet-4', label: 'Claude Sonnet 4', cost: '$3.00 / $15.00', inputCost: 3.00, outputCost: 15.00, context: '1M', speed: '44 t/s', speedNum: 44, latency: '2046ms', latencyMs: 2046 },
    { id: 'anthropic/claude-opus-4.8', label: 'Claude Opus 4.8', cost: '$5.00 / $25.00', inputCost: 5.00, outputCost: 25.00, context: '1M', speed: '43 t/s', speedNum: 43, latency: '1398ms', latencyMs: 1398 },
    { id: 'deepseek/deepseek-v3.2', label: 'DeepSeek V3.2', cost: '$0.23 / $0.34', inputCost: 0.23, outputCost: 0.34, context: '131K', speed: '25 t/s', speedNum: 25, latency: '1549ms', latencyMs: 1549 },
    { id: 'z-ai/glm-5.1', label: 'Z.ai GLM 5.1', cost: '$0.98 / $3.08', inputCost: 0.98, outputCost: 3.08, context: '203K', speed: '45 t/s', speedNum: 45, latency: '3788ms', latencyMs: 3788 },
    { id: 'google/gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite', cost: '$0.25 / $1.50', inputCost: 0.25, outputCost: 1.50, context: '1M', speed: '97 t/s', speedNum: 97, latency: '1074ms', latencyMs: 1074 },
    { id: 'google/gemini-3.5-flash', label: 'Gemini 3.5 Flash', cost: '$1.50 / $9.00', inputCost: 1.50, outputCost: 9.00, context: '1M', speed: '141 t/s', speedNum: 141, latency: '1731ms', latencyMs: 1731 },
    { id: 'z-ai/glm-5.2', label: 'Z.ai GLM 5.2', cost: '$0.95 / $3.00', inputCost: 1.20, outputCost: 4.10, context: '1M', speed: '42 t/s', speedNum: 42, latency: '1236ms', latencyMs: 1236 },
    { id: 'google/gemma-4-26b-a4b-it', label: 'Gemma 4 26B A4B', cost: '$0.06 / $0.33', inputCost: 0.06, outputCost: 0.33, context: '262K', speed: '12 t/s', speedNum: 12, latency: '1616ms', latencyMs: 1616 },
    { id: 'qwen/qwen3.7-plus', label: 'Qwen3.7 Plus', cost: '$0.32 / $1.28', inputCost: 0.32, outputCost: 1.28, context: '1M', speed: '11 t/s', speedNum: 11, latency: '1190ms', latencyMs: 1190 },
    { id: 'qwen/qwen3.7-max', label: 'Qwen3.7 Max', cost: '$1.25 / $3.75', inputCost: 1.25, outputCost: 3.75, context: '1M', speed: '50 t/s', speedNum: 50, latency: '1260ms', latencyMs: 1260 },
] as const;

export type Model = typeof MODELS[number];
export const DEFAULT_MODEL = MODELS[0].id;

export function blendedCost(m: { inputCost: number; outputCost: number }): number {
    return (m.inputCost + m.outputCost) / 2;
}

export const MAX_BLENDED_COST = Math.max(...MODELS.map(blendedCost));

export function costPct(m: { inputCost: number; outputCost: number }): number {
    const b = blendedCost(m);
    if (MAX_BLENDED_COST === 0) return 0;
    return Math.round((b / MAX_BLENDED_COST) * 100);
}
