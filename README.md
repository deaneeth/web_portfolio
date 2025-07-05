# Dineth's Portfolio - Interactive AI Easter Egg

A world-class personal portfolio featuring an AI-powered easter egg that reveals fun facts about Dineth.

## 🤖 AI Easter Egg Setup

### Netlify Environment Variables

To enable the AI-powered fun facts feature, you need to set up your Groq API key:

1. Go to your Netlify project dashboard
2. Navigate to **Site Settings** > **Environment Variables**
3. Add a new environment variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (get it from [Groq Console](https://console.groq.com/))

### API Key Safety

⚠️ **Important Security Notes:**
- Never expose the Groq API key in frontend code
- The API key is only used in the Netlify serverless function
- Never commit API keys to version control
- The frontend only communicates with the Netlify function, not directly with Groq

### How It Works

1. **Trigger**: Users click the animated sparkle icon in the About section
2. **Modal**: A futuristic modal opens with ARIA (AI assistant) branding
3. **AI Facts**: The system calls a Netlify function that securely communicates with Groq API
4. **Fallback**: If the API is unavailable, predefined fun facts are shown
5. **Interactive**: Users can ask custom questions or get random facts

### Features

- 🎨 **Premium Animations**: Framer Motion powered transitions and micro-interactions
- 🔊 **Sound Effects**: Subtle notification sounds using Web Audio API
- ♿ **Accessibility**: Full keyboard navigation, screen reader support, focus management
- 📱 **Mobile Optimized**: Touch-friendly interactions and responsive design
- 🎯 **Smart Fallbacks**: Works even when API is unavailable
- 🧠 **Memory**: Tracks shown facts to avoid repetition in the same session

### File Structure

```
netlify/functions/
  └── groq-funfact.js          # Serverless function for Groq API calls

components/easter-egg/
  └── curiosity-trigger.tsx    # Main easter egg component

components/sections/
  └── about-section.tsx        # Updated About section with easter egg
```

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Customization

To modify the AI behavior, update the system prompt in `netlify/functions/groq-funfact.js`. The AI is restricted to only share information about Dineth that's explicitly provided in the prompt.

---

**Note**: This easter egg demonstrates advanced React patterns, secure API integration, and premium UX design principles while maintaining the site's futuristic aesthetic.