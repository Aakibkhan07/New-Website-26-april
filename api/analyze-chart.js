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
    const { image, mimeType, systemPrompt } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Using OpenAI API (Claude-compatible through OpenAI)
    // You can also use Anthropic directly if you prefer
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('[v0] No API key configured');
      return res.status(500).json({ 
        error: 'Server not configured. Contact admin.',
        analysis: {
          overview: 'Demo Mode: Server not fully configured. This is a demo analysis.\n\nFor production: Configure ANTHROPIC_API_KEY or OPENAI_API_KEY in environment variables.',
          signal: 'NEUTRAL',
          confidence: 50,
          trend: 'Chart analysis temporarily unavailable.',
          patterns: ['Contact support'],
          support_levels: ['—'],
          resistance_levels: ['—'],
          prediction: 'Please configure API keys for full functionality.',
          targets: ['—'],
          risk: 'This is demo mode only.',
          recommendation: 'Contact admin to enable full analysis.'
        }
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
        max_tokens: 1024,
        system: systemPrompt || 'You are an expert technical analyst.',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType || 'image/png',
                  data: image
                }
              },
              {
                type: 'text',
                text: 'Analyze this trading chart. Return ONLY valid JSON.'
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[v0] Anthropic API error:', response.status, errorData);
      
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.content?.map(c => c.text || '').join('') || '';

    // Parse JSON response
    let analysis = {};
    try {
      // Try to extract JSON from response (might have markdown)
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found');
      }
    } catch (e) {
      console.error('[v0] JSON parse error:', e.message);
      // Return fallback analysis from raw text
      analysis = {
        overview: rawText || 'Could not generate analysis. Try another chart.',
        signal: 'NEUTRAL',
        confidence: 50,
        trend: 'See overview.',
        patterns: ['See overview'],
        support_levels: ['—'],
        resistance_levels: ['—'],
        prediction: rawText || 'See overview.',
        targets: ['—'],
        risk: 'Always use stop loss.',
        recommendation: 'See overview.'
      };
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('[v0] Chart analysis error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to analyze chart',
      analysis: {
        overview: 'Analysis service temporarily unavailable. Please try again.',
        signal: 'NEUTRAL',
        confidence: 30,
        trend: 'Service error.',
        patterns: ['Retry'],
        support_levels: ['—'],
        resistance_levels: ['—'],
        prediction: 'Please try uploading the chart again.',
        targets: ['—'],
        risk: 'Service temporarily down.',
        recommendation: 'Refresh and retry.'
      }
    });
  }
}
