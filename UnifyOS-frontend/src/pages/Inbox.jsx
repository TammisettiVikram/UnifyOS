import React, { useState, useEffect } from 'react';
import {
    Search, Send, User, Mail,
    MessageSquare, Phone, MoreVertical
} from 'lucide-react';

const Inbox = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    // Mock data representing the "Single Source of Communication"
    const [chats] = useState([
        {
            id: 1,
            name: "John Doe",
            lastMessage: "I'd like to book a session for Tuesday.",
            type: "SMS",
            status: "Unread",
            history: [
                { sender: 'system', text: 'Welcome message sent automatically.', time: '10:00 AM' },
                { sender: 'customer', text: "I'd like to book a session for Tuesday.", time: '10:05 AM' }
            ]
        },
        {
            id: 2,
            name: "Sarah Smith",
            lastMessage: "Form submitted: Intake Agreement",
            type: "Email",
            status: "Replied",
            history: [
                { sender: 'system', text: 'Booking confirmation sent.', time: 'Yesterday' },
                { sender: 'system', text: 'Intake form sent.', time: 'Yesterday' },
                { sender: 'customer', text: 'Form submitted: Intake Agreement', time: '9:00 AM' }
            ]
        }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        // Rule 9: When staff replies -> automation pauses
        console.log(`Sending message: ${message}. Automation paused for this contact.`);
        setMessage('');
    };

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100">
            {/* Sidebar: Conversation List */}
            <div className="w-1/3 border-r border-slate-800 flex flex-col">
                <div className="p-4 border-b border-slate-800">
                    <h2 className="text-xl font-bold mb-4">Inbox</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-sky-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 border-b border-slate-900 cursor-pointer transition ${selectedChat?.id === chat.id ? 'bg-slate-900' : 'hover:bg-slate-900/50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold">{chat.name}</span>
                                <span className="text-xs text-slate-500">{chat.type}</span>
                            </div>
                            <p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat View */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">{selectedChat.name}</h3>
                                    <p className="text-xs text-emerald-500">Online • Automation Active</p>
                                </div>
                            </div>
                            <MoreVertical className="text-slate-500 cursor-pointer" />
                        </div>

                        {/* Message History */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedChat.history.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'system' ? 'bg-slate-800 text-slate-400 italic text-sm border border-slate-700' :
                                            msg.sender === 'customer' ? 'bg-slate-800 text-white' : 'bg-sky-600 text-white'
                                        }`}>
                                        {msg.sender === 'system' && <span className="block text-[10px] uppercase font-bold mb-1">System Auto-Reply</span>}
                                        {msg.text}
                                        <span className="block text-[10px] mt-1 opacity-50 text-right">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reply Box */}
                        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                            <div className="flex gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={`Reply via ${selectedChat.type}...`}
                                    className="flex-1 bg-transparent px-2 focus:outline-none"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-sky-600 p-2 rounded-lg hover:bg-sky-500 transition"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2 text-center">
                                Replying will manually pause automation for this contact.
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                        <MessageSquare size={48} className="mb-4 opacity-20" />
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;