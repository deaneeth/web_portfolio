// Never expose secret API keys in frontend code! Always call LLM APIs from your backend or serverless function.

const { Configuration, OpenAI } = require('openai');

// Note: This example uses OpenAI format, but you can adapt for Groq API
// Set your GROQ_API_KEY in Netlify Environment Variables: Site Settings > Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'; // Replace with actual Groq endpoint

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userQuestion, previousFacts, discoveryProgress, allSecretsFound } = JSON.parse(event.body || '{}');

    // Enhanced fallback facts with discovery-aware responses
    const getDiscoveryFallbacks = (progress) => {
      const baseFacts = [
        "🎯 Dineth has an 'overdelivery mindset' - he always gives more value than expected!",
        "⚡ His ADHD-powered creativity turns challenges into innovative solutions!",
        "🎨 He's served 5,000+ clients on Fiverr while studying Computer Science!",
        "🚀 Dineth believes 'The future belongs to those who code it' - and he's coding it!",
        "🧠 He combines strategic empathy with technical precision - a rare combo!",
        "💫 As a 'Poet with a Keyboard', he blends creativity with code!",
        "🎓 He's graduating in December 2026 from University of Plymouth, Sri Lanka!",
        "🌟 Dineth specializes in AI/ML while being a creative technologist!"
      ];

      if (progress >= 2) {
        return [
          ...baseFacts,
          "🎵 Music, tech, and innovation create the perfect symphony in his mind!",
          "🔮 He's not just building apps - he's architecting the future, one line of code at a time!",
          "🎭 The intersection of AI and creativity is where Dineth feels most at home!",
          "🌈 His neurodivergent perspective is his secret weapon for innovation!"
        ];
      }

      return baseFacts;
    };

    // If API key is not configured, use fallback immediately
    if (!GROQ_API_KEY) {
      console.log('GROQ_API_KEY not configured, using fallback facts');
      
      const fallbackFacts = getDiscoveryFallbacks(discoveryProgress || 0);
      const availableFacts = fallbackFacts.filter(fact => !previousFacts?.includes(fact));
      const factsToUse = availableFacts.length > 0 ? availableFacts : fallbackFacts;
      const randomFact = factsToUse[Math.floor(Math.random() * factsToUse.length)];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          funFact: randomFact,
          source: 'fallback',
          note: 'ARIA is running on local knowledge right now!',
          discoveryProgress: discoveryProgress || 0
        }),
      };
    }

    // Enhanced system prompt with personality and discovery context
    const getPersonalityPrompt = (progress) => {
      if (progress === 0) return "You're meeting someone curious for the first time. Be welcoming and intriguing.";
      if (progress === 1) return "The user is getting excited about discoveries. Be more energetic and playful.";
      if (progress === 2) return "The user is really engaged now. Be witty and add some digital personality quirks.";
      return "The user has found all secrets! Be amazed and celebratory. This is the ultimate revelation.";
    };

    const systemPrompt = `You are ARIA (Artificial Reasoning & Intelligence Assistant), a playful AI that ONLY knows about Deaneeth. 

PERSONALITY CONTEXT: ${getPersonalityPrompt(discoveryProgress || 0)}
${allSecretsFound ? "SPECIAL MODE: All secrets unlocked! Share the most amazing, ultimate fact about Deaneeth." : ""}

Here are the facts you can use:

PERSONAL INFO:
- Name: Dineth (goes by "Deaneeth")
- Age: 19 years old
- Student at University of Plymouth, Sri Lanka
- Studying Computer Science
- Graduating in December 2026

PROFESSIONAL:
- AI/ML Explorer & Creative Technologist
- Freelanced for 5,000+ clients on Fiverr
- Specializes in presentation design, graphic design, content writing
- Strategic empathy, ADHD-powered creativity, overdelivery mindset
- Future-focused vision, building technology that shapes tomorrow

PERSONALITY & INTERESTS:
- "Builder of Futures, Poet with a Keyboard"
- Loves music, tech, and innovation
- Combines analytical thinking with creative expression
- Neurodivergent thinking leads to innovative solutions
- Always exceeds expectations and goes the extra mile

UNIQUE TRAITS:
- Blends technical expertise with creative vision
- Turns ideas into intelligent reality
- Passionate about the intersection of AI, creativity, and culture
- Believes "The future belongs to those who code it"

INSTRUCTIONS:
- Generate ONE quirky, surprising, creative fun fact about Deaneeth
- Make it personal, specific, and delightful
- Include a relevant emoji at the start
- Keep it under 100 words
- Match the personality context above
- Never invent new information not listed above
- If asked about anything not in this list, reply: "Sorry, my database is 100% Deaneeth! I can only share what I know about him from the info above!"

${previousFacts && previousFacts.length > 0 ? `AVOID repeating these facts: ${previousFacts.join(', ')}` : ''}

${userQuestion ? `User asked: "${userQuestion}"` : 'Generate a random fun fact about Deaneeth.'}`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768', // Replace with actual Groq model name
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userQuestion || 'Tell me a fun fact about Deaneeth!'
          }
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const funFact = data.choices[0]?.message?.content || "🤖 ARIA is processing... Try again!";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        funFact: funFact.trim(),
        source: 'groq-api',
        discoveryProgress: discoveryProgress || 0
      }),
    };

  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Enhanced fallback facts with discovery-aware responses
    const getDiscoveryFallbacks = (progress) => {
      const baseFacts = [
        "🎯 Dineth has an 'overdelivery mindset' - he always gives more value than expected!",
        "⚡ His ADHD-powered creativity turns challenges into innovative solutions!",
        "🎨 He's served 5,000+ clients on Fiverr while studying Computer Science!",
        "🚀 Dineth believes 'The future belongs to those who code it' - and he's coding it!",
        "🧠 He combines strategic empathy with technical precision - a rare combo!",
        "💫 As a 'Poet with a Keyboard', he blends creativity with code!",
        "🎓 He's graduating in December 2026 from University of Plymouth, Sri Lanka!",
        "🌟 Dineth specializes in AI/ML while being a creative technologist!"
      ];

      if (progress >= 2) {
        return [
          ...baseFacts,
          "🎵 Music, tech, and innovation create the perfect symphony in his mind!",
          "🔮 He's not just building apps - he's architecting the future, one line of code at a time!",
          "🎭 The intersection of AI and creativity is where Dineth feels most at home!",
          "🌈 His neurodivergent perspective is his secret weapon for innovation!"
        ];
      }

      return baseFacts;
    };

    const { userQuestion, previousFacts, discoveryProgress } = JSON.parse(event.body || '{}');
    const fallbackFacts = getDiscoveryFallbacks(discoveryProgress || 0);
    const availableFacts = fallbackFacts.filter(fact => !previousFacts?.includes(fact));
    const factsToUse = availableFacts.length > 0 ? availableFacts : fallbackFacts;
    const randomFact = factsToUse[Math.floor(Math.random() * factsToUse.length)];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        funFact: randomFact,
        source: 'fallback',
        note: 'ARIA is thinking too hard right now, but here\'s a fun fact!',
        discoveryProgress: discoveryProgress || 0
      }),
    };
  }
};