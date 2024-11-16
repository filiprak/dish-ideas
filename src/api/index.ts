class Api {
    private token = import.meta.env.VITE_GROQ_API_TOKEN;

    private async callCompletions(payload: object) {
        return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                ...payload,
            }),
        }).then(r => r.json());
    }

    public async recipe() {
        return this.callCompletions({
            messages: [
                {
                    role: 'user',
                    content: 'Explain the importance of fast language models'
                }
            ],
        })
    }
}
