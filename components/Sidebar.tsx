import React from 'react';
import { AssistantMode } from '../types';

interface SidebarProps {
  currentMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
  onClearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange, onClearHistory }) => {
  const modes = [
    { id: AssistantMode.Q_AND_A, label: 'Knowledge Base', icon: '🧠', desc: 'Factual Answers' },
    { id: AssistantMode.SUMMARIZER, label: 'Summarizer', icon: '📝', desc: 'Distill Content' },
    { id: AssistantMode.CREATIVE, label: 'Creative Studio', icon: '🎨', desc: 'Stories & Poems' },
  ];

  return (
    <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          PromptMaster
        </h1>
        <p className="text-xs text-slate-400 mt-1">AI Assistant Project</p>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              currentMode === mode.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl">{mode.icon}</span>
            <div>
              <div className="font-medium text-sm">{mode.label}</div>
              <div className="text-[10px] opacity-70">{mode.desc}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={onClearHistory}
          className="w-full py-2 text-xs font-medium text-red-400 hover:bg-red-900/20 rounded border border-red-900/50 transition-colors"
        >
          Clear Conversation
        </button>
        
        <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500">
          <p>Powered by Google Gemini</p>
          <p>v1.0.0 • React • TypeScript</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;