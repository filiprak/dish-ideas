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
                    content: 'Format response in markdown syntax. In following structure: recipe name, ingredients, instructions'
                },
                {
                    role: 'user',
                    content: 'Give an idea for meal recipe for today'
                },
            ],
        });

        const text = (result?.choices?.[0]?.message?.content || '') as string;

        return text;
    }
}

export const api = new Api();
export default api;
