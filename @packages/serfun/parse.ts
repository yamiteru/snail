export function parse(data: string, def: unknown) {
    try { return JSON.parse(data); }
    catch { return def; }
}
