import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import StyleSelector from './components/StyleSelector';
import { AssistantMode, Message, PromptStyle } from './types';
import { generateResponse } from './services/geminiService';
import { INITIAL_GREETING, PROMPT_CONFIGS } from './constants';

const App: React.FC = () => {
  // --- State Management ---
  const [currentMode, setCurrentMode] = useState<AssistantMode>(AssistantMode.Q_AND_A);
  
  // State for styles specific to each mode to remember user preference
  const [styles, setStyles] = useState<Record<AssistantMode, PromptStyle>>({
    [AssistantMode.Q_AND_A]: PromptStyle.CONCISE,
    [AssistantMode.SUMMARIZER]: PromptStyle.BULLET_POINTS,
    [AssistantMode.CREATIVE]: PromptStyle.STORY,
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Set initial greeting when switching modes if history is empty for that mode
  useEffect(() => {
    const hasMessagesForMode = messages.some(m => m.mode === currentMode);
    if (!hasMessagesForMode) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: INITIAL_GREETING[currentMode],
          timestamp: Date.now(),
          mode: currentMode
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);

  // --- Handlers ---

  const handleModeChange = (mode: AssistantMode) => {
    setCurrentMode(mode);
    setInput(''); // Clear input on mode switch
  };

  const handleStyleChange = (style: PromptStyle) => {
    setStyles(prev => ({ ...prev, [currentMode]: style }));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear the conversation history?")) {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: INITIAL_GREETING[currentMode],
        timestamp: Date.now(),
        mode: currentMode
      }]);
    }
  };

  const handleFeedback = (id: string, isHelpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, feedback: isHelpful ? 'helpful' : 'unhelpful' } : msg
    ));
    // In a real app, we would send this to an analytics backend here.
    console.log(`Feedback for message ${id}: ${isHelpful ? 'Helpful' : 'Unhelpful'}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const currentStyle = styles[currentMode];

    // 1. Add User Message
    const userMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: input,
      timestamp: Date.now(),
      mode: currentMode,
      style: currentStyle
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // 2. Call AI Service
    const aiResponseText = await generateResponse(userMsg.content, currentMode, currentStyle);

    // 3. Add AI Response
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponseText,
      timestamp: Date.now(),
      mode: currentMode,
      style: currentStyle
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  // Filter messages to show only relevant history (optional: remove filter to show full linear history)
  // For this project, showing linear history even across mode switches can be confusing, 
  // so let's filter by current mode or show all but indicating mode changes.
  // Strategy: Just show messages relevant to current Mode to keep context clean.
  const visibleMessages = messages.filter(m => m.mode === currentMode);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Sidebar - Mobile hidden by default in real responsive apps, but simplified here */}
      <div className="hidden md:block h-full">
        <Sidebar 
          currentMode={currentMode} 
          onModeChange={handleModeChange}
          onClearHistory={handleClearHistory}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Mobile Header (simplified) */}
        <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <span className="font-bold text-blue-400">PromptMaster</span>
          <div className="flex gap-2">
            <button onClick={() => handleModeChange(AssistantMode.Q_AND_A)} className={`p-2 rounded ${currentMode === AssistantMode.Q_AND_A ? 'bg-blue-600' : 'bg-slate-800'}`}>🧠</button>
            <button onClick={() => handleModeChange(AssistantMode.SUMMARIZER)} className={`p-2 rounded ${currentMode === AssistantMode.SUMMARIZER ? 'bg-blue-600' : 'bg-slate-800'}`}>📝</button>
            <button onClick={() => handleModeChange(AssistantMode.CREATIVE)} className={`p-2 rounded ${currentMode === AssistantMode.CREATIVE ? 'bg-blue-600' : 'bg-slate-800'}`}>🎨</button>
          </div>
        </div>

        {/* Style Configuration Header */}
        <StyleSelector 
          mode={currentMode} 
          currentStyle={styles[currentMode]} 
          onStyleChange={handleStyleChange}
        />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto">
            {visibleMessages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                onFeedback={handleFeedback} 
              />
            ))}
            
            {isLoading && (
              <div className="flex justify-start w-full mb-6">
                 <div className="px-5 py-3 bg-slate-800 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-slate-900 border-t border-slate-800 p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={
                  currentMode === AssistantMode.SUMMARIZER 
                  ? "Paste your text here to summarize..." 
                  : "Type your message..."
                }
                className="w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-14 max-h-48 overflow-y-auto"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
            <p className="text-center text-[10px] text-slate-600 mt-2">
              AI can make mistakes. Please double-check important information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;