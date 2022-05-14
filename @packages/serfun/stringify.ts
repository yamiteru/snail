export function stringify(data: unknown, def: string) {
    try { return JSON.stringify(data); }
    catch { return def; }
}
