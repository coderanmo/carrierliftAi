import React, { useState } from 'react';
import { Send, FileText, Paperclip, User, Bot, Trash2, Sparkles, Layout, Info, ChevronRight } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI Workspace Assistant. I can help you analyze documents or chat about technical data.", sender: 'bot' },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeAnalysis, setActiveAnalysis] = useState(null);

    // Simulated streaming response like ChatGPT
    const simulateStreaming = (text, id) => {
        let currentText = "";
        let index = 0;

        // Add an empty message first
        setMessages(prev => [...prev, { id, text: "", sender: 'bot' }]);

        const interval = setInterval(() => {
            currentText += text[index];
            setMessages(prev => prev.map(msg =>
                msg.id === id ? { ...msg, text: currentText } : msg
            ));
            index++;

            if (index >= text.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 30); // Speed of "streaming"
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");

        setIsTyping(true);

        // Simulate bot thinking then streaming
        setTimeout(() => {
            const responseText = "Based on my analysis of the current workspace data, the system is performing optimally. I can help you dive deeper into specific metrics if you provide a document or specific query.";
            simulateStreaming(responseText, Date.now() + 1);
        }, 1000);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            const fileMessage = {
                id: Date.now(),
                text: `Document uploaded: ${file.name}`,
                sender: 'user',
                isFile: true,
                fileName: file.name
            };
            setMessages(prev => [...prev, fileMessage]);

            setIsTyping(true);
            setTimeout(() => {
                const botMsg = "I've analyzed the document. You can see a detailed summary and identified skills in the analysis panel on the left.";
                simulateStreaming(botMsg, Date.now() + 1);

                // Detailed Resume-style Analysis
                setActiveAnalysis({
                    title: `Resume Analysis: ${file.name}`,
                    subtitle: "Senior Software Engineer Profile",
                    content: "The document has been parsed. Below is the extracted professional summary and key competencies found within the resume.",
                    sections: [
                        { label: "Experience", value: "8+ Years in Fullstack Development (React, Node.js, AWS)" },
                        { label: "Education", value: "Master of Science in Computer Science, Stanford University" },
                        { label: "Core Skills", value: "TypeScript, Python, GraphQL, Docker, Kubernetes, CI/CD" },
                        { label: "Analysis Score", value: "94/100 (Strong match for current role)" }
                    ],
                    tags: ["Extracted", "Resume", "High Priority"],
                    timestamp: new Date()
                });
            }, 1000);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-dark-bg p-4 md:p-6 lg:p-8 pb-20 mb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">AI Analysis Workspace</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Chat, analyze, and extract insights from your documents.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setMessages([{ id: 1, text: "Chat history cleared. How can I help you?", sender: 'bot' }]);
                                setActiveAnalysis(null);
                            }}
                            className="px-4 py-2 text-sm font-semibold flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            <Trash2 size={16} />
                            Reset Session
                        </button>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px] min-h-[700px]">

                    {/* Left Column: ChatGPT-like Analysis Panel */}
                    <div className="lg:col-span-7 flex flex-col h-full min-h-0">
                        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-0">
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layout size={18} className="text-indigo-600" />
                                    <span className="font-heading font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-xs">AI Extraction Result</span>
                                </div>
                                {activeAnalysis && (
                                    <span className="text-[10px] text-slate-400 font-mono">
                                        {activeAnalysis.timestamp.toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                                {activeAnalysis ? (
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-tighter mb-1">{activeAnalysis.subtitle}</p>
                                            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white leading-tight">
                                                {activeAnalysis.title}
                                            </h2>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {activeAnalysis.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-100 dark:border-indigo-800/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border border-slate-100 dark:border-slate-800/50 leading-relaxed text-slate-700 dark:text-slate-300 text-lg">
                                            {activeAnalysis.content}
                                        </div>

                                        <div className="space-y-3">
                                            {activeAnalysis.sections.map((section, idx) => (
                                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm gap-2">
                                                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{section.label}</span>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 text-right">{section.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                            <FileText size={32} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-heading font-medium text-slate-500">Awaiting Insight</p>
                                            <p className="text-sm text-slate-400">Upload a resume to generate a professional analysis.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: ChatGPT-like Messaging Area */}
                    <div className="lg:col-span-5 flex flex-col h-full min-h-0">
                        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-0">
                            {/* Chat Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 dark:bg-indigo-700 text-white z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Bot size={20} />
                                    </div>
                                    <div>
                                        <h2 className="font-heading font-semibold text-base leading-tight">ChatGPT Analysis</h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                            <span className="text-[10px] text-indigo-100 uppercase tracking-tighter">AI Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-dark-bg/50 space-y-6 no-scrollbar min-h-0">
                                <div className="space-y-6">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-4 max-w-[95%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                    }`}>
                                                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                                </div>

                                                <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                                    <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${message.sender === 'user'
                                                        ? 'bg-indigo-50 dark:bg-indigo-900/40 text-slate-800 dark:text-slate-100'
                                                        : 'text-slate-700 dark:text-slate-200'
                                                        }`}>
                                                        {message.isFile ? (
                                                            <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                                                <FileText size={20} className="text-indigo-600" />
                                                                <div>
                                                                    <p className="font-bold text-xs text-slate-800 dark:text-slate-100">{message.fileName}</p>
                                                                    <p className="text-[10px] text-slate-400">PDF Document</p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="whitespace-pre-wrap">{message.text}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start px-2">
                                            <div className="flex gap-1.5 h-6 items-center">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500/50 transition-all">
                                    <input
                                        type="file"
                                        id="pdf-upload"
                                        onChange={handleFileUpload}
                                        accept=".pdf"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="pdf-upload"
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                                    >
                                        <Paperclip size={20} />
                                    </label>

                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => (e.key === 'Enter' && !e.shiftKey) ? (e.preventDefault(), handleSendMessage()) : null}
                                        placeholder="Message ChatGPT..."
                                        className="flex-1 max-h-32 min-h-[44px] py-3 px-1 bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 text-[14px] resize-none"
                                        rows={1}
                                    />

                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className={`p-2.5 rounded-xl transition-all ${inputValue.trim()
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                                            : 'text-slate-300 dark:text-slate-700'
                                            }`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-center mt-3 text-slate-400 font-medium">ChatGPT can make mistakes. Check important info.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;