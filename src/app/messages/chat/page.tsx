'use client';

import { useState, useRef, useEffect } from 'react';
import './Chat.css';
import socket from "../../socket";
import useUserStore from '@/zustand/UserStore';
import APIs from '@/services/APIS';
import { storeChats } from '@/zustand/Chats';


const ChatApp = () => {
    const userState = useUserStore(state => state.user);
    const userGlobal: any = userState;

    const { dataChat, usersChat }: any = storeChats()


    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeChatId, setActiveChatId] = useState(1);
    const messagesEndRef = useRef(null);

    const [chatsTransmitter, setChatsTransmitter] = useState<any>([])

    const fetch = async () => {
        try {
            let response: any = await APIs.getAllChatsForUser(userGlobal.id)
            setChatsTransmitter(response.data)

        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    useEffect(() => {
        fetch()
    }, [])


    const contacts = [
        { id: 1, name: "AI Assistant", status: "online", lastMessage: "Sure, I'd be happy to answer any questions..." },
        { id: 2, name: "John Doe", status: "offline", lastMessage: "See you tomorrow!" },
        { id: 3, name: "Jane Smith", status: "online", lastMessage: "Thanks for the update." },
    ];

    useEffect(() => {
        if (dataChat) {
            setMessages([dataChat])
        }
    }, [])

    const handleSendMessage = (e: any) => {

        e.preventDefault();
        if (newMessage.trim() === '') return;
        setNewMessage('');

        const messageData = {
            userId: userGlobal.id,
            id_employer: usersChat.user_2,
            content: newMessage,
            chat_id: dataChat.chat_id
        };

        socket.emit('sendMessage', messageData);

        // Simular la respuesta del bot

    };

    console.log('dataChat', dataChat)
    console.log('usersChat', usersChat)


    // Escuchar mensajes del servidor
    useEffect(() => {
        const handleMessage = (data: any) => {
            console.log("Mensaje recibido:", data);
            setMessages((prev: any) => [...prev, data]);
        };
        socket.on("newMessage", handleMessage);

        return () => {
            socket.off("newMessage", handleMessage); // Limpieza para evitar múltiples suscripciones
        };
    }, []);

    // // Auto scroll to bottom when new messages arrive
    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    // Manejo de la visibilidad del sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();  // Setear estado inicial

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Chats</h2>
                    <button onClick={() => setSidebarOpen(false)} className="close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="contacts-list">
                    {chatsTransmitter.map((contact: any) => (
                        <div key={contact.id} className={`contact-item ${activeChatId === contact.id ? 'active' : ''}`} onClick={() => setActiveChatId(contact.id)}>
                            <div className="contact-avatar-container">
                                <div className="contact-avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <span className={`status-indicator ${contact.status}`}></span>
                            </div>
                            <div className="contact-info">
                                <div className="contact-header">
                                    {userGlobal?.id == contact?.user_id ?
                                        <div className="content">
                                            <h3>{contact?.user2?.first_name}</h3>
                                            <h3>{contact?.user2?.first_surname}</h3>
                                        </div>
                                        :
                                        <div className="content">
                                            <h3>{contact?.user1?.first_name}</h3>
                                            <h3>{contact?.user1?.first_surname}</h3>
                                        </div>
                                    }
                                    <span className="time">12:30 PM</span>
                                </div>
                                <p className="last-message">{contact.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-area">
                {/* Chat Header */}
                <div className="chat-header">
                    <button onClick={() => setSidebarOpen(true)} className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div className="active-contact">
                        {usersChat.user_id == userGlobal.id ?
                            <div className="contact-avatar" style={{ backgroundImage: `url(${usersChat.user1?.profilePhoto})` }}>

                            </div>
                            :
                            <div className="contact-avatar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        }

                        <div className="contact-details">
                            <div className='container_name'>
                                <h3 className='name'>{usersChat.user1?.first_name}</h3>
                                <h3 className='surname'>{usersChat.user1?.first_surname}</h3>
                            </div>
                            <p className="status">
                                {contacts.find(c => c.id === activeChatId)?.status === 'online' ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="messages-container">
                    <div className="messages">
                        {messages.map((message: any) => (
                            <div key={message.id} className={`message-wrapper ${message.sender == userGlobal.id ? 'user-message' : 'bot-message'}`}>
                                <div className="message">
                                    <p className="message-text">{message.message_text}</p>
                                    <p className="message-time">{message.created_at}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="input-area">
                    <form onSubmit={handleSendMessage} className="message-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatApp



