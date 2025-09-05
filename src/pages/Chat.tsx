import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sendChatMessage } from '@/lib/gemini';
import { getWebsiteInfo } from '@/lib/firebase-utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m RS AI, your RwandaScratch assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState<any>(null);

  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      const info = await getWebsiteInfo();
      setWebsiteInfo(info);
    };
    fetchWebsiteInfo();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(input, websiteInfo);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble responding right now. Please contact us directly at hello@rwandascratch.com',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center p-4 border-b bg-card">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">RS AI Assistant</h1>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        <Card className="flex-1 flex flex-col border-0 shadow-none bg-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="sr-only">Chat Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col py-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[calc(100vh-200px)]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about RwandaScratch..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}