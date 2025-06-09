import type { NextApiRequest, NextApiResponse } from 'next';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    const { input } = req.body;

    if (!input) return res.status(400).json({ error: 'Missing input' });

    try {
        const hfRes = await fetch(HUGGINGFACE_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: `<s>[INST] You are a medical AI assistant. Please analyze the following symptoms and provide a helpful response: ${input} [/INST]</s>`,
                // parameters: {
                //     max_new_tokens: 500,
                //     temperature: 0.7,
                //     top_p: 0.9,
                //     return_full_text: false,
                //     repetition_penalty: 1.2,
                // },
            }),
        });

        const contentType = hfRes.headers.get('content-type') || '';

        let data: any;
        if (contentType.includes('application/json')) {
            data = await hfRes.json();
        } else {
            const text = await hfRes.text();
            console.error('Unexpected response:', text);
            return res.status(hfRes.status).json({
                error: `Unexpected response from Hugging Face API: ${text.substring(0, 200)}`
            });
        }

        if (data.error) {
            console.error('Model Error:', data.error);
            return res.status(500).json({ error: data.error });
        }


        let text: string = '';

        if (Array.isArray(data) && data[0]?.generated_text) {
            text = data[0].generated_text;
        } else if (data.generated_text) {
            text = data.generated_text;
        }

        res.status(200).json({ response: text });
    } catch (err: any) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
