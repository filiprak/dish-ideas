/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GROQ_API_TOKEN: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
