import React from 'react';
import { AssistantMode, PromptStyle } from '../types';
import { PROMPT_CONFIGS } from '../constants';

interface StyleSelectorProps {
  mode: AssistantMode;
  currentStyle: PromptStyle;
  onStyleChange: (style: PromptStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ mode, currentStyle, onStyleChange }) => {
  const configs = PROMPT_CONFIGS[mode];
  
  // Need to cast keys to string array to map, then cast back to PromptStyle
  const styles = Object.keys(configs) as PromptStyle[];

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {mode === 'Q_AND_A' && 'Knowledge Base'}
            {mode === 'SUMMARIZER' && 'Content Summarizer'}
            {mode === 'CREATIVE' && 'Creative Studio'}
          </h2>
          <p className="text-sm text-slate-400">Configure how the AI responds</p>
        </div>

        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg self-start sm:self-center">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => onStyleChange(style)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentStyle === style
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {configs[style]?.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Prompt Description - Educational Aspect */}
      <div className="mt-3 bg-slate-800/50 border border-slate-700/50 rounded p-2 flex items-start gap-2">
        <span className="text-blue-400 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </span>
        <p className="text-xs text-slate-300">
          <span className="font-semibold text-slate-200">Prompt Strategy:</span> {configs[currentStyle]?.description}
        </p>
      </div>
    </div>
  );
};

export default StyleSelector;