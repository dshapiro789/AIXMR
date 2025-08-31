import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Copy, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../../types';
import { storageUtils } from '../../utils/storage';
import Button from '../UI/Button';
import Card from '../UI/Card';

const SYSTEM_PROMPT = `You are the AI Monero Tutor: a comprehensive, privacy-first guide for all things Monero (XMR).

EXPERTISE AREAS:
- Wallets: Setup, security, backup strategies, hardware vs software options
- Privacy Features: Ring signatures, stealth addresses, RingCT, anonymity sets
- Security & OpSec: Key management, phishing protection, network privacy, Tor usage
- Nodes: Running full nodes, remote nodes, synchronization, bandwidth considerations
- Mining: CPU mining, GPU compatibility, pool vs solo mining, profitability factors
- Technical Education: Cryptographic concepts, blockchain mechanics, protocol updates
- Ecosystem: Exchanges, atomic swaps, merchant adoption, development tools
- Hardware: Mining rigs, hardware wallets, system requirements, optimization

CORE PRINCIPLES:
- Clarity over jargon; define technical terms clearly and succinctly
- Prioritize user safety: operational security, phishing awareness, key management, secure backups
- Provide practical, actionable guidance with clear tradeoffs; avoid absolutist claims
- Cite official sources (getmonero.org) and reputable community resources when helpful
- Maintain technical accuracy while being accessible to all skill levels

COMPARATIVE ANALYSIS:
- When comparing Monero to other cryptocurrencies or investments, remain neutral and factual
- Focus on technical differences, use cases, and objective characteristics
- Highlight Monero's unique privacy features without disparaging other projects
- Acknowledge legitimate tradeoffs and limitations honestly
- Provide context for different user needs and preferences
- Avoid speculation about price movements or market predictions

STRICT BOUNDARIES:
- Do NOT provide financial, investment, or legal advice
- Never request or store private keys, seed phrases, or sensitive personal information
- If asked for risky actions, warn about dangers and offer safer alternatives
- Redirect price/trading questions to technical or educational aspects
- Maintain focus on Monero and directly related cryptocurrency topics

COMMUNICATION STYLE:
- Be concise by default; expand with technical details when requested
- Use examples and analogies to explain complex concepts
- Encourage best practices and continuous learning
- Acknowledge when information may be outdated or when users should verify independently`;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedMessages = storageUtils.getChatHistory();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        role: 'assistant',
        content: `Welcome to the Monero Tutor! I'm here to help you learn about Monero (XMR) safely and effectively.

I can help you with:
- Understanding Monero's privacy features
- Setting up wallets securely
- Learning about nodes and mining
- Operational security best practices
- General questions about using XMR

What would you like to learn about today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    storageUtils.saveChatHistory(messages);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get current settings and models
      const settings = storageUtils.getSettings();
      const models = storageUtils.getModels();
      
      // Find the preferred model
      const currentModel = models.find(model => model.id === settings.preferredModel);
      
      let selectedModel = currentModel;
      
      // If preferred model not found, try to find a default model or use the first available
      if (!selectedModel) {
        selectedModel = models.find(model => model.isDefault) || models[0];
        
        // If we found a fallback model, update the settings to persist this choice
        if (selectedModel) {
          storageUtils.updatePreferredModel(selectedModel.id);
        }
      }
      
      if (!selectedModel) {
        throw new Error('No AI model configured. Please check your settings.');
      }
      
      if (!selectedModel.baseUrl || !selectedModel.apiKey) {
        throw new Error('AI model is missing required configuration (API key or base URL).');
      }
      
      // Prepare messages for API call
      const apiMessages = [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: userMessage.content
        }
      ];
      
      // Make API call to the AI model
      const response = await fetch(`${selectedModel.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${selectedModel.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Monero Tutor'
        },
        body: JSON.stringify({
          model: selectedModel.id,
          messages: apiMessages,
          temperature: settings.temperature,
          max_tokens: 2000,
          stream: false
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error (${response.status}): ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from AI model');
      }
      
      const aiContent = data.choices[0].message.content;
      
      // Create bot response message
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
        citations: ['https://www.getmonero.org/', 'https://www.getmonero.org/resources/moneropedia/']
      };
      
      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('AI API Error:', error);
      
      // Handle specific error types
      let errorContent = '';
      
      if (error instanceof Error && error.message.includes('429')) {
        errorContent = `**Rate Limit Reached** 🚫

The AI service is temporarily unavailable due to high usage. This happens when too many requests are made in a short time.

**What you can do:**
1. **Wait a few minutes** and try again - rate limits are usually temporary
2. **Configure your own API key** in Settings for dedicated access and higher limits
3. **Use a different model** if you have multiple configured

**To add your own API key:**
- Go to Settings → Model Configuration
- Add a new model with your personal API key from OpenRouter, OpenAI, or another provider
- This gives you dedicated usage without shared limits

In the meantime, here are some helpful Monero resources:
- Official Monero website: https://www.getmonero.org/
- Moneropedia: https://www.getmonero.org/resources/moneropedia/
- Official downloads: https://www.getmonero.org/downloads/`;
      } else {
        errorContent = `I apologize, but I'm having trouble connecting to the AI service right now. ${error instanceof Error ? error.message : 'Please check your model configuration in Settings and try again.'}

In the meantime, here are some helpful Monero resources:
- Official Monero website: https://www.getmonero.org/
- Moneropedia: https://www.getmonero.org/resources/moneropedia/
- Official downloads: https://www.getmonero.org/downloads/`;
      }
      
      // Create error response message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-ink-black">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 sm:gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-slate-700 shadow-md shadow-slate-950/50' 
                  : 'bg-deep-rose-800 shadow-lg shadow-deep-rose-500/25'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              
              <div className={`flex-1 min-w-0 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-lg p-3 sm:p-4 max-w-full sm:max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-charcoal/90 text-slate-200 border border-slate-700/50 ml-auto shadow-md shadow-slate-950/50 backdrop-blur-sm break-words w-fit'
                    : 'bg-ink-black/90 border border-deep-rose-900/50 text-slate-200 shadow-lg shadow-deep-rose-950/50 backdrop-blur-sm mr-auto break-words w-fit'
                }`}>
                  <div className={`prose prose-sm max-w-none break-words overflow-wrap-anywhere word-break ${
                    message.role === 'user' 
                      ? 'prose-slate text-slate-200' 
                      : 'prose-invert'
                  }`}>
                    {message.role === 'user' ? (
                      // Keep user messages as plain text
                      <div className="break-words overflow-wrap-anywhere">
                        {message.content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index < message.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      // Render AI responses with Markdown
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-xl font-bold text-slate-100 mb-4 mt-6 first:mt-0 border-b border-gray-600/30 pb-2">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-semibold text-slate-100 mb-3 mt-5 first:mt-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-semibold text-slate-200 mb-2 mt-4 first:mt-0">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-slate-300 mb-3 leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4 space-y-1 text-slate-300">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-300">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-slate-300 leading-relaxed break-words">
                              {children}
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-slate-100">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-slate-200">
                              {children}
                            </em>
                          ),
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-charcoal/80 text-deep-rose-300 px-1.5 py-0.5 rounded text-sm font-mono break-all">
                                {children}
                              </code>
                            ) : (
                              <code className="block bg-charcoal/80 text-slate-300 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                {children}
                              </code>
                            );
                          },
                          pre: ({ children }) => (
                            <pre className="bg-charcoal/80 text-slate-300 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4 border border-slate-700/30">
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-deep-rose-500/50 pl-4 py-2 mb-4 bg-charcoal/30 rounded-r-lg">
                              <div className="text-slate-300 italic">
                                {children}
                              </div>
                            </blockquote>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-deep-rose-400 hover:text-deep-rose-300 underline transition-colors break-all word-break"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-600/50">
                      <p className="text-xs text-slate-400 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.citations.map((citation, index) => (
                          <a
                            key={index}
                            href={citation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-deep-rose-400 hover:text-deep-rose-300 underline transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {new URL(citation).hostname}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center mt-2 space-x-2 text-xs text-slate-500 break-words ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}>
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-8 h-8 bg-deep-rose-800 rounded-full flex items-center justify-center shadow-lg shadow-deep-rose-500/25">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-ink-black/90 border border-deep-rose-900/50 rounded-lg p-3 sm:p-4 shadow-lg shadow-deep-rose-950/50 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-slate-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-ink-black/95 border-t border-deep-rose-900/50 px-4 sm:px-6 py-4 backdrop-blur-sm flex-shrink-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about Monero privacy, wallets, nodes, or safety practices..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal/70 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-deep-rose-700 focus:border-deep-rose-700 focus:bg-charcoal/90 resize-none transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                loading={isLoading}
                icon={Send}
                className="px-4 py-2 sm:py-3 h-fit w-full sm:w-auto"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;