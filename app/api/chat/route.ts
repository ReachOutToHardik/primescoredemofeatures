import { NextRequest } from 'next/server';
import { SYSTEM_PROMPT } from '../../../src/data/chatbotPrompt';

// Using the OpenRouter API Key from environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'nemotron-3-nano-30b-a3b:free';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Prepare messages array by injecting the system prompt
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://primescore.in',
        'X-Title': 'Primescore Chatbot',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API Error:', response.status, errText);
      return new Response(JSON.stringify({ error: 'Failed to communicate with AI provider.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create a readable stream that transforms the OpenRouter SSE format into simple text
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            
            const lines = buffer.split('\n');
            // Keep the last partial line in the buffer
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6).trim();
                if (dataStr === '[DONE]') {
                  // End of stream
                  continue;
                }
                
                try {
                  const data = JSON.parse(dataStr);
                  const text = data.choices?.[0]?.delta?.content;
                  if (text) {
                    controller.enqueue(new TextEncoder().encode(text));
                  }
                } catch (e) {
                  // Ignore parsing errors for partial/malformed chunks
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
