import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hi! I'm your SpeedCheck assistant. How can I help you optimize your internet today?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsBotTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse = "I'm not sure about that, but you can try running a new speed test to check your current performance!";
      
      const lowerInput = userMessage.text.toLowerCase();
      if (lowerInput.includes('slow') || lowerInput.includes('problem')) {
        botResponse = "I'm sorry your internet is slow. Try restarting your router or switching to a 5GHz WiFi band for better speeds.";
      } else if (lowerInput.includes('ping') || lowerInput.includes('latency')) {
        botResponse = "High ping can be caused by distance from the server. Try selecting a closer server using the 'Change Server' button.";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        botResponse = "Hello! I can help with speed test results, troubleshooting WiFi, or explaining what Mbps means.";
      } else if (lowerInput.includes('mbps') || lowerInput.includes('speed')) {
        botResponse = "Mbps stands for Megabits per second. It measures how much data travels through your connection every second.";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="glass-card gradient-border w-[320px] sm:w-[380px] h-[450px] mb-4 flex flex-col shadow-2xl animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#0a0e1a]">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <div className="font-bold text-sm">Aria AI Assistant</div>
                <div className="text-[10px] opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#0a0e1a] hover:opacity-60">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0e1a]/50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                  ? 'bg-[#00d4ff] text-[#0a0e1a] rounded-tr-none' 
                  : 'bg-white/10 text-white border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00d4ff]/50"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-[#0a0e1a]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-7-9-7V9l-7 7 7 7v-5z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] flex items-center justify-center shadow-lg hover:scale-110 transition-all group"
      >
        {isOpen ? (
           <svg className="w-6 h-6 text-[#0a0e1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        ) : (
          <div className="relative">
            <svg className="w-8 h-8 text-[#0a0e1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0e1a]" />
          </div>
        )}
      </button>
    </div>
  );
}
