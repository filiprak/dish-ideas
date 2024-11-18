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
    const jsonRegex = /({.*?})/gs;
    const matches = str.match(jsonRegex);

    if (!matches || !matches[0]) {
        return null;
    }
    try {
        const json = JSON.parse(matches[0]);
        return schema.safeParse(json);
    } catch (e) {
        return null;
    }
}

class Api {
    private token = import.meta.env.VITE_GROQ_API_TOKEN;
    readonly endpoint_url = 'https://api.groq.com/openai/v1/chat/completions';
    readonly model = 'llama-3.1-70b-versatile';
    readonly last_error = ref<string>();

    private async callCompletions<T extends ZodRawShape>(prompt: string, schema: ZodObject<T>) {
        this.last_error.value = undefined;

        const payload = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: `${prompt}\nYou are a data API that responds in JSON. The JSON schema must include ${JSON.stringify(toAIJsonSchema(schema), null, 4)}`,
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

        const text = String(result?.choices?.[0]?.message?.content || '').trim() as string;
        const parsed = extractJson(text, schema);

        if (!parsed || parsed.error) {
            this.last_error.value = `Failed to parse AI json data: ${parsed?.error.message || 'Unknown error'}`;
        }

        return parsed?.data;
    }

    public async getIdeas() {
        const Ideas = z.object({
            ideas: z.array(z.string()).describe('array of strings - list of dishes suggestions.')
        })
        return this.callCompletions('Give an idea exactly for breakfast, lunch, dinner and meals to eat today.', Ideas);
    }
}

export const api = new Api();
export default api;
