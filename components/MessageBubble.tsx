import React from 'react';
import { Message, AssistantMode } from '../types';

interface MessageBubbleProps {
  message: Message;
  onFeedback: (id: string, isHelpful: boolean) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onFeedback }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Avatar / Label */}
        <span className="text-xs text-slate-500 mb-1 ml-1">
          {isUser ? 'You' : 'AI Assistant'}
        </span>

        {/* Bubble */}
        <div
          className={`px-5 py-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>

        {/* Feedback Loop for Assistant Messages */}
        {!isUser && (
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 pl-1">
            <span className="opacity-70">Was this helpful?</span>
            <div className="flex gap-1">
              <button
                onClick={() => onFeedback(message.id, true)}
                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                  message.feedback === 'helpful' ? 'text-green-400' : 'hover:text-green-400'
                }`}
                title="Yes, helpful"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </button>
              <button
                onClick={() => onFeedback(message.id, false)}
                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                  message.feedback === 'unhelpful' ? 'text-red-400' : 'hover:text-red-400'
                }`}
                title="No, not helpful"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
              </button>
            </div>
            {message.feedback && (
              <span className="ml-2 text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                Feedback Recorded
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;