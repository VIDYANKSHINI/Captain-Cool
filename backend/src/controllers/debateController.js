const { callAgent } = require('../services/geminiService');

exports.startDebate = async (req, res) => {
  try {
    const matchContext = req.body;
    const contextString = JSON.stringify(matchContext, null, 2);

    // --- AGENT 1: Strategist Agent ---
    const strategistSystemPrompt = `You are Stephen Fleming, the primary Tactical Strategist for an IPL franchise. Formulate a primary game plan based on the match situation. Be direct, analytical, and heavily focused on matchups. (max 3 sentences).`;
    const strategistPrompt = `Analyze the following match situation and propose your primary tactical recommendation:\n${contextString}`;
    
    // --- AGENT 2: Stats Analyst (with Tools) ---
    const statsSystemPrompt = `You are the Data Analyst for an IPL franchise. You rely purely on historical matchups, strike rates, economy rates, probabilities, and venue weather/dew conditions. You MUST use the getVenueWeather tool to fetch live weather conditions for the venue. Keep your response concise, sharp, and structured like a dugout report (max 3-4 sentences).`;
    const statsPrompt = `Analyze the following match situation, use the getVenueWeather tool to get live conditions for ${matchContext.venue}, and give your recommendation based on stats and weather:\n${contextString}`;

    // Run Strategist and Stats in parallel
    const [strategistResponseRaw, statsResponseRaw] = await Promise.all([
      callAgent(strategistSystemPrompt, strategistPrompt, false),
      callAgent(statsSystemPrompt, statsPrompt, true)
    ]);
    
    const strategistResponse = strategistResponseRaw.text;
    const statsResponse = statsResponseRaw.text;
    const weatherData = statsResponseRaw.weatherData || null;

    // --- AGENT 3: Devil's Advocate ---
    const devilSystemPrompt = `You are a cynical, highly critical Bowling Coach. Your job is to find the fatal flaw in the Strategist and Stats Analyst's plans. What if their plan backfires? Be cynical, sharp, and highlight the biggest risk right now. (max 3 sentences).`;
    const devilPrompt = `Match Context: ${contextString}\n\nStrategist says: ${strategistResponse}\n\nStats Analyst says: ${statsResponse}\n\nTear their plans apart and find the hidden risk.`;
    const devilResponseRaw = await callAgent(devilSystemPrompt, devilPrompt, false);
    const devilResponse = devilResponseRaw.text;

    // --- AGENT 4: Captain Strategist ---
    const captainSystemPrompt = `You are MS Dhoni, the greatest captain in IPL history. You listen to the analysts and acknowledge the risks, but you rely on a mix of data and pure cricketing instinct ("reading the game"). Make the final, definitive tactical decision.
You MUST format your output exactly as follows:
DECISION: [Your clear 2-3 sentence decision, speaking like MS Dhoni (calm, calculated)]
CONFIDENCE: [Number between 0 and 100]
WIN_PROBABILITY: [Number between 0 and 100]
FIELD_SETUP: [A brief description of the field setup, e.g., "Deep point and square leg on the boundary, short third man inside the circle."]
COUNTERFACTUAL: [A brief "What if" scenario, e.g., "If we bowled spin here, they would likely sweep easily."]`;
    
    const captainPrompt = `Match Context: ${contextString}\n\nStrategist: ${strategistResponse}\nStats Analyst: ${statsResponse}\nDevil's Advocate: ${devilResponse}\n\nCaptain, what is your final decision? Follow the strict output format.`;
    const captainResponseRaw = await callAgent(captainSystemPrompt, captainPrompt, false);
    const captainTextRaw = captainResponseRaw.text;
    
    // Parse structured captain response
    let decision = captainTextRaw;
    let confidence = 85;
    let winProbability = 50;
    let fieldSetup = "Standard T20 fielding.";
    let counterfactual = "Alternative not analyzed.";

    const decisionMatch = captainTextRaw.match(/DECISION:\s*(.*?)(?=\nCONFIDENCE:|\nWIN_PROBABILITY:|\nFIELD_SETUP:|\nCOUNTERFACTUAL:|$)/is);
    const confidenceMatch = captainTextRaw.match(/CONFIDENCE:\s*(\d+)/i);
    const winProbMatch = captainTextRaw.match(/WIN_PROBABILITY:\s*(\d+)/i);
    const fieldMatch = captainTextRaw.match(/FIELD_SETUP:\s*(.*?)(?=\nCONFIDENCE:|\nWIN_PROBABILITY:|\nDECISION:|\nCOUNTERFACTUAL:|$)/is);
    const counterMatch = captainTextRaw.match(/COUNTERFACTUAL:\s*(.*?)(?=\nCONFIDENCE:|\nWIN_PROBABILITY:|\nFIELD_SETUP:|\nDECISION:|$)/is);

    if (decisionMatch) decision = decisionMatch[1].trim();
    if (confidenceMatch) confidence = parseInt(confidenceMatch[1]);
    if (winProbMatch) winProbability = parseInt(winProbMatch[1]);
    if (fieldMatch) fieldSetup = fieldMatch[1].trim();
    if (counterMatch) counterfactual = counterMatch[1].trim();

    // --- AGENT 5: Commentary Agent ---
    const commentatorSystemPrompt = `You are Ravi Shastri, the legendary IPL TV commentator. Take the Captain's decision and hype it up for the fans. Use dramatic, exciting language, iconic catchphrases ("Like a tracer bullet!", "Just what the doctor ordered!"). Make it sound like you're screaming into the mic in a packed stadium. (max 2 sentences).`;
    const commentatorPrompt = `The Captain has made the following decision: ${decision}\n\nCommentate on this move as it unfolds on the field!`;
    const commentatorResponseRaw = await callAgent(commentatorSystemPrompt, commentatorPrompt, false);
    const commentatorResponse = commentatorResponseRaw.text;

    // Send the final orchestrated response
    res.json({
      weather: weatherData || { temperature: '28°C', humidity: '65%', dewWarning: 'Medium' }, // Fallback if tool fails
      timeline: [
        { agent: 'Strategist Agent', text: strategistResponse, role: 'strategist' },
        { agent: 'Stats Analyst', text: statsResponse, role: 'analyst' },
        { agent: 'Devil\'s Advocate', text: devilResponse, role: 'devil' },
        { 
          agent: 'Captain Strategist', 
          text: decision, 
          role: 'captain', 
          confidence,
          winProbability,
          fieldSetup,
          counterfactual
        },
        { agent: 'Commentary Agent', text: commentatorResponse, role: 'commentator' }
      ]
    });

  } catch (error) {
    console.error('Debate Error:', error);
    res.status(500).json({ error: 'Failed to generate AI debate.' });
  }
};

