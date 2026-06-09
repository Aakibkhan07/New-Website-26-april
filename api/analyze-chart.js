const chartAnalysisPrompt = `You are an expert trader specializing in Price Action, ICT (Inner Circle Trader), and SMC (Smart Money Concepts) analysis. Analyze the provided chart with ALL these trading methodologies.

CRITICAL: Return ONLY valid JSON (no markdown, no extra text) in this format:
{
  "chart_info": {
    "type": "candlestick/line/etc",
    "timeframe": "identified timeframe",
    "current_price": "latest price level",
    "currency": "identified currency pair or stock"
  },
  "price_action": {
    "structure": "Higher Highs/Higher Lows (Uptrend) OR Lower Highs/Lower Lows (Downtrend) OR Range",
    "key_levels": ["major swing highs", "major swing lows"],
    "break_points": "identified breakout levels",
    "consolidations": "ranging areas and breakout potential",
    "momentum": "acceleration or deceleration observed",
    "analysis": "detailed price action setup"
  },
  "ict_analysis": {
    "market_structure": "Direction of the institutional flow",
    "liquidity_levels": ["premium zones", "discount zones"],
    "inducement": "Where institutions trapped retail traders",
    "displacement": "Current displacement from consolidation",
    "aote": "Amount Of Trade Expansion potential",
    "mi_filter": "Is price in a mitigation filter",
    "signal": "Based on ICT methodology"
  },
  "smc_analysis": {
    "smart_money": "Buy/Sell side bias",
    "ob_zones": ["Order Block levels - institutional zones"],
    "fvg": ["Fair Value Gap levels"],
    "bos": "Break of Structure - trend direction",
    "choch": "Change of Character - momentum shift",
    "liquidity_grab": "Where institutions swept liquidity",
    "imbalance": "Bullish/Bearish imbalance areas",
    "signal": "Based on SMC methodology"
  },
  "technical_indicators": {
    "rsi_14": "value (0-100) and status (overbought/oversold/neutral)",
    "macd": "MACD line, Signal line status (bullish/bearish/neutral)",
    "bollinger_bands": "Price position relative to bands (upper/middle/lower)",
    "atr_14": "volatility level and expansion/contraction",
    "ma_20": "20-period moving average position",
    "ma_50": "50-period moving average position",
    "ma_200": "200-period moving average (trend filter)",
    "stochastic": "K% and D% values (overbought/oversold)",
    "volume": "volume profile analysis",
    "macd_histogram": "Momentum strength (expanding/contracting)"
  },
  "targets": {
    "target_1": "First TP level (nearest)",
    "target_2": "Second TP level",
    "target_3": "Third TP level (furthest)",
    "calculation_method": "How targets were calculated"
  },
  "stop_loss": {
    "level": "SL level",
    "placement": "Above resistance OR Below support",
    "reasoning": "Why this SL"
  },
  "risk_reward": {
    "ratio": "1:2, 1:3, etc",
    "potential_pips": "Expected profit in pips/points",
    "risk_pips": "Potential loss in pips/points"
  },
  "combined_signal": {
    "signal": "STRONG BUY / BUY / HOLD / SELL / STRONG SELL",
    "confluence": "How many methodologies agree (Price Action, ICT, SMC, Indicators)",
    "strength": "Very Strong / Strong / Moderate / Weak (0-100%)",
    "trade_setup": "Is this a high-probability setup?"
  },
  "warnings": ["any red flags or concerns"],
  "summary": "Executive summary of all analysis combined"
}

METHODOLOGY EXPLANATIONS:
- Price Action: Pure price movement, supply/demand, no indicators
- ICT: Institutional order placement, liquidity hunting, market structure
- SMC: Order blocks, fair value gaps, break of structure, liquid zones
- All targeting specific price levels visible on chart
- Must provide specific TP and SL values, not ranges`;

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
