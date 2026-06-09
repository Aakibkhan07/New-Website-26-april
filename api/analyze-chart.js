const chartAnalysisPrompt = `You are an expert technical analysis professional specializing in trading charts. Analyze the provided trading chart image and provide a comprehensive technical analysis.

Return your analysis in this exact JSON format:
{
  "chartType": "candlestick/line/ohlc/etc",
  "timeframe": "estimated timeframe",
  "currentPrice": "current price level if visible",
  "trend": {
    "direction": "Uptrend/Downtrend/Sideways",
    "strength": "Strong/Moderate/Weak",
    "description": "detailed description"
  },
  "support_levels": ["level1", "level2", "level3"],
  "resistance_levels": ["level1", "level2", "level3"],
  "patterns": ["Hammer", "Doji", "Engulfing", "etc - list detected patterns"],
  "indicators": {
    "rsi": "RSI value and interpretation",
    "macd": "MACD status",
    "movingAverages": "MA alignment and interpretation"
  },
  "signal": "BUY/SELL/HOLD",
  "confidence": "80-95%",
  "prediction": "Next likely price level based on technical analysis",
  "targets": {
    "shortTerm": "price target for next 1-3 days",
    "mediumTerm": "price target for next 1-2 weeks"
  },
  "stopLoss": "recommended stop loss level",
  "riskReward": "risk-reward ratio explanation",
  "overview": "comprehensive analysis summary with key observations"
}

Be precise, professional, and provide specific price levels where visible.`;

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
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('[v0] OpenAI API key not configured');
      return res.status(500).json({ 
        error: 'API key not configured',
        analysis: {
          overview: 'Chart analysis service not configured. Please contact support.',
          signal: 'NEUTRAL',
          confidence: '0%'
        }
      });
    }

    // Call OpenAI GPT-4 Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: chartAnalysisPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[v0] OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const rawText = data.choices[0].message.content;

    // Parse JSON response
    let analysis = {};
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error('[v0] JSON parse error:', e.message);
      analysis = {
        overview: rawText || 'Analysis generated but in text format.',
        signal: 'NEUTRAL',
        confidence: '50%'
      };
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('[v0] Chart analysis error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to analyze chart',
      analysis: {
        overview: 'Chart analysis failed. Please try again or upload a clearer chart image.',
        signal: 'ERROR',
        confidence: '0%'
      }
    });
  }
}
