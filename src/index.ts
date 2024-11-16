(async () => {
    const token = import.meta.env.VITE_GROQ_API_TOKEN;

    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
                {
                    role: 'user',
                    content: 'Explain the importance of fast language models'
                }
            ],
        }),
    }).then(r => r.json());

    console.log(r)
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}
