const { GoogleGenAI, Type } = require('@google/genai');
const dotenv = require('dotenv');
const { getVenueWeather } = require('./weatherService');
dotenv.config();

// Initialize the Google Gen AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the weather tool for function calling
const weatherTool = {
  functionDeclarations: [
    {
      name: 'getVenueWeather',
      description: 'Get the current weather and dew conditions for a specific cricket venue.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          venueName: {
            type: Type.STRING,
            description: 'The full name of the stadium and city, e.g., "Wankhede Stadium, Mumbai"',
          },
        },
        required: ['venueName'],
      },
    },
  ],
};

const callAgent = async (systemPrompt, userPrompt, useTools = false) => {
  try {
    const config = {
      systemInstruction: systemPrompt,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    if (useTools) {
      config.tools = [weatherTool];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: config
    });

    // Check if a tool was called
    if (useTools && response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      if (call.name === 'getVenueWeather') {
        const venue = call.args.venueName;
        const weatherData = await getVenueWeather(venue);
        
        // Return the tool response to the model
        const followUpResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: userPrompt }] },
            { role: 'model', parts: [{ functionCall: call }] },
            { role: 'user', parts: [{ functionResponse: { name: call.name, response: weatherData } }] }
          ],
          config: config
        });
        
        return { text: followUpResponse.text, weatherData: weatherData };
      }
    }
    
    return { text: response.text, weatherData: null };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate response from Gemini Agent');
  }
};

module.exports = {
  callAgent
};
