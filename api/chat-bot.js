export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { systemPrompt, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('[v0] No API key configured for chatbot');
      return res.status(500).json({ 
        reply: 'Kuch problem aa gayi! Admin se contact karo. Server configuration issue.'
      });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 512,
        system: systemPrompt || 'You are a helpful trading assistant.',
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[v0] Anthropic chatbot API error:', response.status, errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.content?.map(c => c.text || '').join('') || 'Kuch problem aa gayi, dobara try karo!';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('[v0] Chatbot error:', error);
    return res.status(500).json({ 
      reply: 'Network issue! ⚠️ Thodi der baad try karo.',
      error: error.message
    });
  }
}
