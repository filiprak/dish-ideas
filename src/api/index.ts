import { ref } from 'vue';
import z, { ZodSchema, ZodObject, ZodRawShape } from 'zod';

function toAIJsonSchema<T extends ZodRawShape>(schema: ZodObject<T>): object {
    const carry: any = {};
    for (const k in schema.shape) {
        const prop = schema.shape[k]!;
        const type = String(prop._def.typeName).replace('Zod', '').toLowerCase();

        if (prop.description) {
            carry[k] = `${type}: ${prop.description}`;
        } else {
            if (type == 'object') {
                carry[k] = toAIJsonSchema(prop as ZodObject<any>);
            } else {
                carry[k] = `${type}`;
            }
        }

    }
    return carry;
}

function extractJson<O>(str: string, schema: ZodSchema<O>) {
    const jsonRegex = /({.*})/gs;
    const matches = str.match(jsonRegex) || '';
    const json = JSON.parse(matches[0]);
    return schema.parse(json);
}

class Api {
    private readonly token = import.meta.env.VITE_GROQ_API_TOKEN;
    readonly endpoint_url = 'https://api.groq.com/openai/v1/chat/completions';
    readonly model = 'llama-3.1-70b-versatile';
    readonly last_error = ref<string>();

    private async callCompletions<T extends ZodRawShape>(system: string, prompt: string, schema: ZodObject<T>) {
        this.last_error.value = undefined;

        const payload = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: `${system}\nYou are a data API that exclusively responds in JSON format. The output must strictly adhere to the following JSON schema. Ensure the structure is precisely followed, with no deviations or omissions. For any missing data fields, use null or an empty array ([]) as appropriate. Be concise and avoid adding extra fields or unnecessary explanations in the response. Required response JSON structure: ${JSON.stringify(toAIJsonSchema(schema), null, 4)}`,
                },
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
            response_format: {
                type: 'json_object',
            },
        };
        const result = await fetch(this.endpoint_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify(payload),
        }).then(r => r.json()).catch((err) => { this.last_error.value = `Failed to load data. Please try later. (Error: ${err})` });

        try {
            const text = String(result?.choices?.[0]?.message?.content || '').trim() as string;
            return extractJson(text, schema);
        } catch (err) {
            console.error(err);
            this.last_error.value = `Something went wrong :( Please try again.`;
            return undefined;
        }
    }

    public async getIdeas() {
        const Ideas = z.object({
            breakfast: z.object({
                name: z.string().describe('suggested breakfast dish name'),
                short_description: z.string().describe('suggested breakfast short description'),
            }),
            lunch: z.object({
                name: z.string().describe('suggested lunch dish name'),
                short_description: z.string().describe('suggested lunch short description'),
            }),
            dinner: z.object({
                name: z.string().describe('suggested dinner dish name'),
                short_description: z.string().describe('suggested dinner short description'),
            }),
        });
        return this.callCompletions(
            'You are diet assistant.',
            'Please generate a meal plan for today, including breakfast, lunch, dinner, and two snack options. The meals should be balanced and healthy, with options for a high-protein diet. Include a brief description of each meal and ingredients. If possible, suggest quick recipes or prep tips for each meal. Keep the total daily calories around 2,000.',
            Ideas
        );
    }
}

export const api = new Api();
export default api;
