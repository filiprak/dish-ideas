(async () => {
    const token = import.meta.env.GROQ_API_TOKEN;
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(r => r.json());

    console.log(r)
})();
