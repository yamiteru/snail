export const route = process.argv[2];
export const args = process.argv.slice(3);
export const HOME = process.env.HOME as string;
export const ROOT = `${HOME}/.snail`;

export const MAIN_CONFIG = `${ROOT}/config.json`;
