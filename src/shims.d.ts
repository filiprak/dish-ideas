/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VERSION: string
    readonly VITE_GROQ_API_TOKEN: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module "*.vue" {}
declare module "vue3-markdown-it" {}
