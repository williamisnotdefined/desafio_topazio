declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            NODE_ENV: string;
        }
    }
}

export {};
