'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';
import { hasSupabaseEnv, supabase, type Message, type Outfit } from '@/lib/supabase';
import OutfitCard from '@/components/outfit-card';

interface ChatInterfaceProps {
  conversationId?: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  // Fetch outfits for suggestions
  useEffect(() => {
    if (!hasSupabaseEnv) {
      return;
    }

    const fetchOutfits = async () => {
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .limit(4);
      
      if (!error && data) {
        setOutfits(data);
      }
    };

    fetchOutfits();
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages if conversation exists
  useEffect(() => {
    if (!hasSupabaseEnv) {
      return;
    }

    if (currentConversationId) {
      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', currentConversationId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          setMessages(data);
        }
      };

      fetchMessages();
    }
  }, [currentConversationId]);

  const handleSendMessage = async () => {
    if (!hasSupabaseEnv) {
      console.error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      return;
    }

    if (!inputValue.trim()) return;

    // Create conversation if it doesn't exist
    if (!currentConversationId) {
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          customer_id: `cust_${Date.now()}`,
          customer_name: 'Anonymous User',
          customer_email: 'user@stylemind.local',
          status: 'active',
        })
        .select()
        .single();

      if (convError || !convData) {
        console.error('Error creating conversation:', convError);
        return;
      }

      setCurrentConversationId(convData.id);
    }

    // Add user message
    const userMessage = inputValue;
    setInputValue('');

    // Insert user message
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: currentConversationId || convData?.id,
        sender: 'customer',
        content: userMessage,
        message_type: 'text',
      });

    if (msgError) {
      console.error('Error sending message:', msgError);
      return;
    }

    // Simulate AI response
    setLoading(true);
    
    // Simple outfit recommendation logic
    let recommendedOutfit = outfits[Math.floor(Math.random() * outfits.length)];
    
    // Better matching logic based on keywords
    if (userMessage.toLowerCase().includes('business') || userMessage.toLowerCase().includes('meeting')) {
      recommendedOutfit = outfits.find(o => o.occasion === 'Work') || outfits[0];
    } else if (userMessage.toLowerCase().includes('evening') || userMessage.toLowerCase().includes('event')) {
      recommendedOutfit = outfits.find(o => o.occasion === 'Evening') || outfits[1];
    } else if (userMessage.toLowerCase().includes('casual') || userMessage.toLowerCase().includes('weekend')) {
      recommendedOutfit = outfits.find(o => o.occasion === 'Casual') || outfits[2];
    }

    // Add AI response with outfit recommendation
    setTimeout(async () => {
      const aiResponse = `I recommend our "${recommendedOutfit.name}" outfit! This ${recommendedOutfit.occasion.toLowerCase()}-perfect collection features coordinated pieces that work beautifully together. The style emphasizes ${recommendedOutfit.style_tags.join(', ')} aesthetics.`;

      const { error: responseError } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversationId,
          sender: 'agent',
          content: aiResponse,
          message_type: 'outfit_recommendation',
          outfit_data: {
            outfit_id: recommendedOutfit.id,
            outfit_name: recommendedOutfit.name,
            confidence: 0.92,
          },
        });

      if (!responseError) {
        // Fetch updated messages
        const { data } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', currentConversationId)
          .order('created_at', { ascending: true });

        if (data) {
          setMessages(data);
        }
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-6 bg-white sticky top-16 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <MessageSquare className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">StyleMind Chat</h1>
            <p className="text-sm text-gray-500">Get personalized outfit recommendations</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {!hasSupabaseEnv && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
              Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.
            </div>
          )}

          {messages.length === 0 && !loading && (
            <div className="text-center py-16">
              <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Style Journey</h2>
              <p className="text-gray-500 mb-6">Ask me anything about fashion and get personalized outfit recommendations</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                {[
                  "I need an outfit for a business meeting",
                  "What's trendy for a casual weekend?",
                  "Recommend an evening outfit",
                  "Help me with professional attire",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(suggestion)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-lg p-4 ${
                  message.sender === 'customer'
                    ? 'bg-black text-white rounded-br-none'
                    : 'bg-gray-100 text-black rounded-bl-none'
                }`}
              >
                <p className="mb-3">{message.content}</p>

                {/* Outfit Card if message contains outfit recommendation */}
                {message.outfit_data && (
                  <div className="mt-4">
                    {outfits
                      .filter((o) => o.id === message.outfit_data?.outfit_id)
                      .map((outfit) => (
                        <OutfitCard key={outfit.id} outfit={outfit} />
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-black rounded-lg rounded-bl-none p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6 bg-white sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tell me what kind of outfit you need..."
            className="flex-1 border-gray-300 focus:border-black focus:ring-0"
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !inputValue.trim()}
            className="bg-black text-white hover:bg-gray-800 px-6"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
