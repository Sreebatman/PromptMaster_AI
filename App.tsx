import React, { useState } from 'react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: `Echo: ${input}` };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #1e293b',
        backgroundColor: '#020617',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>PromptMaster AI Assistant</h1>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div style={{ textAlign: 'center', color: '#94a3b8' }}>
              <p style={{ fontSize: '18px', margin: '0' }}>Start a conversation...</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>Type a message and press Send</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: msg.role === 'user' ? '#2563eb' : '#1e293b',
                color: msg.role === 'user' ? '#ffffff' : '#e2e8f0',
                wordWrap: 'break-word'
              }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              color: '#cbd5e1'
            }}>
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        borderTop: '1px solid #1e293b',
        padding: '16px',
        backgroundColor: '#0f172a',
        display: 'flex',
        gap: '12px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'Arial, sans-serif'
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: loading || !input.trim() ? '#475569' : '#2563eb',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
