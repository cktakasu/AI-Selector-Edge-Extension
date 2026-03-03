export interface Link {
    id: string
    name: string
    description: string
    url: string
    category: 'LLM' | 'Image' | 'Audio' | 'Video' | 'Productivity' | 'Dev'
    icon?: string
    brandColor?: string // ホバー時のグローエフェクト等に使用するメインカラー
    searchUrl?: string // コンテキストメニュー等で使用する検索/プロンプト用URL
    invertDark?: boolean // ダークモード時にアイコンの色を反転(白く)するかどうか
    updatedAt?: string // ISO date string (YYYY-MM-DD)
}

export const links: Link[] = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'AI assistant by Anthropic, focused on being helpful, harmless, and honest.',
        url: 'https://claude.ai',
        category: 'LLM',
        icon: 'claude.svg',
        brandColor: '#d97757',
        updatedAt: '2026-02-17'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        description: 'Advanced conversational AI by OpenAI, capable of understanding and generating human-like text.',
        url: 'https://chat.openai.com',
        category: 'LLM',
        icon: 'chatgpt.svg',
        brandColor: '#10a37f',
        searchUrl: 'https://chat.openai.com/?q=',
        updatedAt: '2026-01-14'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        description: 'Google\'s most capable AI model, built for a variety of tasks and integrated into Google Workspace.',
        url: 'https://gemini.google.com',
        category: 'LLM',
        icon: 'gemini.svg',
        brandColor: '#4285f4',
        updatedAt: '2026-02-19'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        description: 'AI-powered search engine and chatbot that provides accurate and verified answers.',
        url: 'https://www.perplexity.ai',
        category: 'LLM',
        icon: 'perplexity.svg',
        brandColor: '#20808d',
        searchUrl: 'https://www.perplexity.ai/search?q=',
        updatedAt: '2026-02-18',
        invertDark: true
    },
    {
        id: 'genspark',
        name: 'Genspark',
        description: 'AI agents that help you search, shop, and learn more efficiently.',
        url: 'https://www.genspark.ai/agents?type=ai_chat',
        category: 'Productivity',
        icon: 'genspark.svg',
        brandColor: '#f97316',
        searchUrl: 'https://www.genspark.ai/search?query=',
        invertDark: true
    },
    {
        id: 'manus',
        name: 'Manus',
        description: 'Next-generation AI research assistant for deep dives and complex information synthesis.',
        url: 'https://manus.ai',
        category: 'Dev',
        icon: 'manus.svg',
        brandColor: '#4f46e5',
        updatedAt: '2026-02-17',
        invertDark: true
    },
    {
        id: 'felo',
        name: 'Felo',
        description: 'Free AI search engine and chat to get answers and create content.',
        url: 'https://felo.ai',
        category: 'Productivity',
        icon: 'felo.png',
        brandColor: '#6366f1',
        searchUrl: 'https://felo.ai/search?q='
    },
    {
        id: 'grok',
        name: 'Grok',
        description: 'AI model developed by xAI, designed to answer questions with a bit of wit and has a rebellious streak.',
        url: 'https://grok.com/',
        category: 'LLM',
        icon: 'grok.png',
        brandColor: '#1d9bf0',
        searchUrl: 'https://grok.com/?q=',
        updatedAt: '2026-02-18',
        invertDark: true
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        description: 'Advanced AI models for reasoning, coding, and mathematical problem-solving.',
        url: 'https://chat.deepseek.com/',
        category: 'LLM',
        icon: 'deepseek.png',
        brandColor: '#4d6bfe',
        searchUrl: 'https://chat.deepseek.com/?q='
    },
    {
        id: 'kimi',
        name: 'Kimi',
        description: 'AI assistant by Moonshot AI, capable of processing long context and assisting with research.',
        url: 'https://kimi.moonshot.cn',
        category: 'LLM',
        icon: 'kimi.svg',
        brandColor: '#6c5ce7',
        searchUrl: 'https://kimi.moonshot.cn/?q=',
        updatedAt: '2026-02-17',
        invertDark: true
    }
]

