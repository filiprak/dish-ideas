class Api {
    private token = import.meta.env.VITE_GROQ_API_TOKEN;

    private async callCompletions() {
        return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
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
    }
}
