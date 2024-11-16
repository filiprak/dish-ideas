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
        const result = await this.callCompletions({
            messages: [
                {
                    role: 'system',
                    content: 'Give an idea exactly for breakfast, lunch, dinner and meals to eat today. You must always format response in the structure of markdown list.'
                },
            ],
        });

        const text = (result?.choices?.[0]?.message?.content || '') as string;

        return text;
    }
}

export const api = new Api();
export default api;
