export interface Link {
    id: string
    name: string
    url: string
    icon?: string
    isNew?: boolean
}

export const links: Link[] = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        url: 'https://chat.openai.com',
        icon: 'chatgpt.svg'
    },
    {
        id: 'claude',
        name: 'Claude',
        url: 'https://claude.ai',
        icon: 'claude.svg',
        isNew: true
    },
    {
        id: 'gemini',
        name: 'Gemini',
        url: 'https://gemini.google.com',
        icon: 'gemini.svg'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        url: 'https://www.perplexity.ai',
        icon: 'perplexity.svg'
    },
    {
        id: 'genspark',
        name: 'Genspark',
        url: 'https://www.genspark.ai',
        icon: 'genspark.svg',
        isNew: true
    },
    {
        id: 'kimi',
        name: 'Kimi',
        url: 'https://kimi.moonshot.cn',
        icon: 'kimi.svg'
    },
    {
        id: 'manus',
        name: 'Manus',
        url: 'https://manus.ai',
        icon: 'manus.svg',
        isNew: true
    }
]

