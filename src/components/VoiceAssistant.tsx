import { useState, useEffect } from 'react';

// NOTE: For the live website, the user can set their own API key here
// or via the browser console: localStorage.setItem('openai_api_key', 'your-key-here')
// API Keys for AI Brain
const OPENAI_API_KEY = ""; 
const GEMINI_API_KEY = ""; // Replace with your Gemini API key

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Ensure voices are loaded (needed for Chrome/Safari)
    window.speechSynthesis.getVoices();
    const handleVoicesChanged = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setStatus('Listening...');
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setStatus('Error: ' + event.error);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a premium female voice (Google US English Female is very clear)
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') && v.name.includes('Female')) || 
      (v.name.includes('Samantha') || v.name.includes('Victoria')) ||
      (v.lang === 'en-US' && v.name.includes('Female'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Set voice characteristics for "Aria"
    utterance.pitch = 1.1; // Slightly higher pitch for a friendly female tone
    utterance.rate = 1.0;  // Natural speaking speed
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setResponse(text);
  };

  const getGeminiResponse = async (prompt: string) => {
    setStatus('Thinking...');
    
    const userKey = localStorage.getItem('gemini_api_key') || GEMINI_API_KEY;

    if (!userKey) {
      const chatGPTKey = localStorage.getItem('openai_api_key') || OPENAI_API_KEY;
      if (chatGPTKey) return getChatGPTResponse(prompt);
      return localLogic(prompt);
    }

    // Comprehensive Context about the App
    const systemContext = `
      Your name is Aria. You are the expert AI for "SpeedCheck WiFi Speed Test".
      
      APP CAPABILITIES:
      1. Measures Download Speed (Mbps), Upload Speed (Mbps), and Ping (ms).
      2. Uses real-world data transfer via Speedtest.net and LibreSpeed servers.
      3. Features a history section saving the last 5 results locally.
      4. Auto-detects user ISP (like ACT, Jio, Airtel, Excitel) and IP address.
      5. Supports 50+ languages.
      6. Can scan for nearby servers based on GPS location.
      
      TECHNICAL SPECS:
      - Best for 4K Streaming: >50 Mbps.
      - Best for Gaming: Ping <20ms, Jitter <5ms.
      - Troubleshooting: Suggest router restart, check 5GHz band, or move closer to router.
      
      INSTRUCTIONS:
      Introduce yourself as Aria. Be helpful, professional, and very concise (under 40 words).
      If the user wants to start a test, tell them to say "Check my wifi speed".
      
      USER QUESTION: ${prompt}
    `;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemContext }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.7 }
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini Error:', error);
      return localLogic(prompt);
    }
  };

  const getChatGPTResponse = async (prompt: string) => {
    // Existing ChatGPT implementation as fallback
    const userKey = localStorage.getItem('openai_api_key') || OPENAI_API_KEY;
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are Aria. Keep answers very short." },
            { role: "user", content: prompt }
          ],
          max_tokens: 60
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch { return localLogic(prompt); }
  };

  const localLogic = (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('check my wifi speed') || cmd.includes('start test') || cmd.includes('check speed')) {
      return "Understood. Aria is starting the speed test for you now.";
    }

    if (cmd.includes('name') || cmd.includes('who are you') || cmd.includes('what is your name')) {
      return "I am Aria, your personal SpeedCheck AI assistant.";
    }

    if (cmd.includes('hello') || cmd.includes('hi') || cmd.includes('hey')) {
      return "Hello there! I'm Aria. You can ask me to check your wifi speed or give you networking tips.";
    }

    if (cmd.includes('slow') || cmd.includes('problem') || cmd.includes('fix')) {
      return "For slow speeds, Aria recommends restarting your router and ensuring you are on the 5GHz band.";
    }

    if (cmd.includes('ping') || cmd.includes('latency')) {
      return "Ping is your network's response time. Ideally, it should be under 20 milliseconds for gaming.";
    }

    if (cmd.includes('mbps') || cmd.includes('download') || cmd.includes('upload')) {
      return "Mbps means Megabits per second. It's how we measure your download and upload transfer rates.";
    }

    if (cmd.includes('joke')) {
      return "Why did the computer catch a cold? Because it had too many windows open!";
    }

    if (cmd.includes('streaming') || cmd.includes('4k') || cmd.includes('netflix')) {
      return "For 4K streaming, Aria recommends at least 50 Mbps. For HD, 25 Mbps is usually sufficient.";
    }

    // Dynamic response to prevent repetition
    return `I heard you say: "${command}". I am Aria, and I can help you with speed tests, ping info, or troubleshooting tips.`;
  };

  const handleVoiceCommand = async (command: string) => {
    if (!command.trim()) return;
    
    setStatus('Analyzing...');
    const cmd = command.toLowerCase();

    // Check if the user wants to start a speed test
    if (cmd.includes('check my wifi speed') || 
        cmd.includes('start test') || 
        cmd.includes('test my speed') ||
        cmd.includes('run speed test') ||
        cmd.includes('check speed')) {
      
      setStatus('Starting Test...');
      speak("Starting your speed test now. Please wait.");
      
      setTimeout(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const startButton = buttons.find(b => 
          b.textContent?.toUpperCase().includes('START TEST') || 
          b.getAttribute('aria-label')?.toUpperCase().includes('START')
        );
        
        if (startButton) {
          (startButton as HTMLButtonElement).click();
        }
      }, 1000);
      
      setStatus('Idle');
      return;
    }

    // Use Gemini as the primary AI Brain
    const reply = await getGeminiResponse(command);
    
    // Clear old response before starting new one to prevent stuck text
    setResponse('');
    setStatus('Idle');
    
    // Slight delay to ensure React state updates before starting speech
    setTimeout(() => {
      speak(reply);
    }, 100);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      if (!recognition) {
        speak("I'm sorry, voice recognition is not supported in this browser.");
        return;
      }
      import('../utils/audio').then(({ playSound }) => playSound.aria());
      recognition.start();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Voice Status Bubble */}
      {(isListening || response || isSpeaking) && (
        <div className="glass-card gradient-border p-4 mb-4 w-[300px] shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : status === 'Thinking...' ? 'bg-blue-500 animate-bounce' : 'bg-[#00ff88]'}`} />
               <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{status}</span>
            </div>
            {!isListening && !isSpeaking && (
              <button onClick={() => setResponse('')} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {response && (
            <p className="text-sm text-white leading-relaxed italic mb-3">"{response}"</p>
          )}
          {!isListening && !isSpeaking && !response && (
            <div className="space-y-2">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Try asking AI:</p>
              <div className="flex flex-wrap gap-2">
                {['Check my WiFi speed', 'WiFi tips', 'What is Mbps?', 'Gaming speed'].map(tip => (
                  <button 
                    key={tip}
                    onClick={() => handleVoiceCommand(tip.toLowerCase())}
                    className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[#00d4ff] text-slate-300 transition-all"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mic Button */}
      <button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 relative group ${
          isListening 
          ? 'bg-red-500 shadow-red-500/50 scale-110' 
          : isSpeaking 
            ? 'bg-[#00ff88] shadow-[#00ff88]/50'
            : status === 'Thinking...'
              ? 'bg-blue-500 shadow-blue-500/50'
              : 'bg-gradient-to-r from-[#00d4ff] to-[#00ff88] shadow-[#00d4ff]/30 hover:scale-110'
        }`}
        aria-label="Aria Voice Assistant"
      >
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
            <div className="absolute -inset-2 rounded-full border-2 border-red-500/30 animate-pulse" />
          </>
        )}

        {isSpeaking && (
           <div className="flex items-end gap-1 h-6">
              <div className="w-1 bg-[#0a0e1a] rounded-full animate-[bounce_0.5s_infinite]" />
              <div className="w-1 bg-[#0a0e1a] rounded-full animate-[bounce_0.8s_infinite]" />
              <div className="w-1 bg-[#0a0e1a] rounded-full animate-[bounce_0.6s_infinite]" />
           </div>
        )}

        {status === 'Thinking...' && !isSpeaking && (
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        )}

        {!isSpeaking && status !== 'Thinking...' && (
          <svg className={`w-8 h-8 ${isListening ? 'text-white' : 'text-[#0a0e1a]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z" />
          </svg>
        )}
        
        <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click to talk to AI
        </div>
      </button>
    </div>
  );
}
