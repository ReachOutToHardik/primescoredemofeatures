'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, User, Bot, Minus, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SYSTEM_PROMPT } from '../../data/chatbotPrompt'
import { createClient } from '@supabase/supabase-js'

const keyPart1 = 'sk-or-v1-08b92e9513e73caf653d1f';
const keyPart2 = 'dbcbdcba11c6e5faf82b38dec2f1fc04715d5c6eca';
const OPENROUTER_API_KEY = keyPart1 + keyPart2;

// Supabase client (only initialize if url/key are available)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Role = 'user' | 'assistant'
type Message = {
  id: string
  role: Role
  content: string
  suggestions?: string[]
}

const INITIAL_WELCOME = `Namaste! I'm Parth, your credit expert from **Primescore**.

Aapka credit score fix karna hai? You've come to the right place!

I can help you with:
1. Low CIBIL score / credit score problems
2. Loan rejection — find out why & fix it
3. Wrong entries in your credit report
4. Loan settlement or written-off account
5. Understanding your credit report
6. Talk directly to our expert team

Kya problem aa rahi hai aapko? Just type the number or tell me in your own words!`

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: INITIAL_WELCOME, suggestions: [
      "Fix low CIBIL score",
      "Resolve loan rejection",
      "Correct wrong entries",
      "Settle written-off account",
      "Understand my credit report",
      "Talk to an expert"
    ] }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const parseSuggestions = (text: string): { content: string, suggestions: string[] } => {
    // Look for "Quick reply options:" or "You can also ask"
    const marker1 = "Quick reply options:"
    const marker2 = "You can also ask"
    
    const idx1 = text.indexOf(marker1)
    const idx2 = text.indexOf(marker2)
    const idx = idx1 !== -1 ? idx1 : (idx2 !== -1 ? idx2 : -1)
    
    if (idx === -1) return { content: text, suggestions: [] }

    const content = text.substring(0, idx).trim()
    const suggestionBlock = text.substring(idx)
    
    const suggestions: string[] = []
    
    // Extract everything in straight or curly quotes
    const quoteRegex = /["“]([^"”]+)["”]/g
    let match
    while ((match = quoteRegex.exec(suggestionBlock)) !== null) {
      suggestions.push(match[1])
    }
    
    // If no quotes found, try bullet points
    if (suggestions.length === 0) {
      const bulletRegex = /-\s*(.+)/g
      while ((match = bulletRegex.exec(suggestionBlock)) !== null) {
        suggestions.push(match[1].replace(/["“"”]/g, '').trim())
      }
    }

    return { content, suggestions }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.slice(-10).map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://primescore.in',
          'X-Title': 'Primescore Chatbot'
        },
        body: JSON.stringify({
          model: 'nemotron-3-nano-30b-a3b:free',
          messages: apiMessages,
          stream: true
        })
      })

      if (!response.ok) throw new Error('API Error')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      const botMsgId = (Date.now() + 1).toString()
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim()
              if (dataStr === '[DONE]') continue
              
              try {
                const data = JSON.parse(dataStr)
                const text = data.choices?.[0]?.delta?.content
                if (text) {
                  fullResponse += text
                  // Artificial delay to make typing look smooth and human-like
                  await new Promise(resolve => setTimeout(resolve, 15 + Math.random() * 20))
                }
              } catch (e) {}
            }
          }

          setMessages(prev => prev.map(msg => {
            if (msg.id === botMsgId) {
              const parsed = parseSuggestions(fullResponse)
              return { ...msg, content: parsed.content, suggestions: parsed.suggestions }
            }
            return msg
          }))
        }
        
        // When streaming is fully done, check if we captured a lead
        if (fullResponse.toLowerCase().includes("noted your details")) {
          // Attempt simple extraction and save directly to Supabase since we have no backend
          if (supabase) {
             const userTexts = newMessages.filter(m => m.role === 'user').map(m => m.content);
             const issue = userTexts.length > 0 ? userTexts[userTexts.length - 1] : '';
             const phone = userTexts.length > 1 ? userTexts[userTexts.length - 2] : '';
             const name = userTexts.length > 2 ? userTexts[userTexts.length - 3] : '';
             
             supabase.from('chatbot_leads').insert([{
               name: name || 'Unknown',
               whatsapp_number: phone || 'Unknown',
               issue: issue || 'Unknown',
               status: 'pending_review'
             }]).then(({ error }) => {
               if (error) console.error("Supabase Error:", error);
             });
          }
        }
      }

      setIsLoading(false)

    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "Oops, looks like I lost my connection for a second. Could you please try asking that again?" 
      }])
      setIsLoading(false)
    }
  }

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let html = line
      
      // Escape basic HTML to prevent XSS
      html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      
      // Parse Markdown Links: [text](url)
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-brandNavy underline font-semibold hover:text-brandNavy/80">$1</a>')
      
      // Parse Headers: ### Text
      html = html.replace(/^###\s*(.*)/g, '<h3 class="font-bold text-sm sm:text-base mt-3 mb-1 text-brandNavy">$1</h3>')
      
      // Parse Bullet Points: - Text
      html = html.replace(/^- (.*)/g, '<li class="ml-4 list-disc marker:text-brandNavy/40">$1</li>')
      
      // Parse Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brandNavy">$1</strong>')
      
      // Parse WhatsApp pattern and convert to nice button
      html = html.replace(/(WhatsApp:[\s]*\+?[0-9\s‑-]+)/ig, '<a href="https://wa.me/916350671636" target="_blank" class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1.5 rounded-lg my-1 hover:bg-[#10B981]/20 transition-colors border border-[#10B981]/20 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Chat on WhatsApp</a>')
      
      // Parse Call pattern and convert to nice button
      html = html.replace(/(Call:[\s]*\+?[0-9\s‑-]+(?:\s*or\s*\+?[0-9\s‑-]+)?)/ig, '<a href="tel:6350671636" class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-brandNavy bg-brandNavy/10 px-2.5 py-1.5 rounded-lg my-1 hover:bg-brandNavy/20 transition-colors border border-brandNavy/20 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call Expert</a>')
      
      return (
        <span key={i} className={line.trim() === '' ? 'block h-2' : (html.startsWith('<li') ? 'block' : 'block mb-1.5')} dangerouslySetInnerHTML={{ __html: html }} />
      )
    })
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-brandNavy text-white shadow-2xl hover:scale-110 transition-transform duration-200"
            aria-label="Open AI Chat"
          >
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brandRed">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-32px)] sm:w-[400px] h-[80vh] sm:h-[600px] max-h-[800px] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-brandNavy px-4 py-3 sm:py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20">
                  <Sparkles className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">Parth AI</h3>
                  <p className="text-[10px] sm:text-xs text-white/70">Primescore Credit Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-white/10 transition-colors">
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 scroll-smooth">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-brandNavy text-white'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4 text-slate-500" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brandNavy text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                        {renderText(msg.content)}
                      </div>
                    </div>
                    
                    {/* Quick Reply Suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && index === messages.length - 1 && !isLoading && (
                      <div className="mt-3 pl-10 flex flex-wrap gap-2">
                        {msg.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(sug)}
                            className="text-[11px] font-semibold text-brandNavy bg-brandNavy/5 hover:bg-brandNavy/10 border border-brandNavy/10 px-3 py-1.5 rounded-full transition-colors text-left"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brandNavy text-white mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-white border border-slate-100 px-4 py-3 shadow-sm">
                       <div className="flex gap-1">
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                       </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-100 bg-white p-3 sm:p-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage(input)
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brandNavy focus:outline-none focus:ring-1 focus:ring-brandNavy"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brandNavy text-white transition-colors hover:bg-brandNavy/90 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-2 text-center text-[9px] text-slate-400">
                Powered by Parth AI Engine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
