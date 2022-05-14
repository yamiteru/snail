declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URL: string;
            PORT: string;
            KEY: string;
            CERT: string;
            SECRET: string;
        }
    }
}

export { }
