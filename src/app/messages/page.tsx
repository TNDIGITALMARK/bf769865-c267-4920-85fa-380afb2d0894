"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Send,
  Search,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  MoreHorizontal
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for sharing those photos!",
    timestamp: "2 min",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: "2", 
    name: "Mike Chen",
    avatar: "/placeholder.svg",
    lastMessage: "See you at the meeting tomorrow",
    timestamp: "1h",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "3",
    name: "Emma Wilson", 
    avatar: "/placeholder.svg",
    lastMessage: "The project looks amazing! 🎉",
    timestamp: "3h",
    unreadCount: 1,
    isOnline: false
  },
  {
    id: "4",
    name: "David Brown",
    avatar: "/placeholder.svg", 
    lastMessage: "Let's catch up soon",
    timestamp: "1d",
    unreadCount: 0,
    isOnline: false
  },
  {
    id: "5",
    name: "Lisa Zhang",
    avatar: "/placeholder.svg",
    lastMessage: "Happy birthday! 🎂",
    timestamp: "2d", 
    unreadCount: 0,
    isOnline: true
  }
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How's your day going?",
    timestamp: "10:30 AM",
    isFromUser: false
  },
  {
    id: "2", 
    text: "Pretty good! Just working on some new projects. How about you?",
    timestamp: "10:32 AM",
    isFromUser: true
  },
  {
    id: "3",
    text: "Same here! Actually wanted to ask about those photos you mentioned",
    timestamp: "10:33 AM", 
    isFromUser: false
  },
  {
    id: "4",
    text: "Of course! Let me share them with you right now",
    timestamp: "10:35 AM",
    isFromUser: true
  },
  {
    id: "5",
    text: "Thanks for sharing those photos!",
    timestamp: "10:40 AM",
    isFromUser: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromUser: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Ronim</h1>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Conversations List */}
        <div className="w-80 border-r bg-white dark:bg-gray-900 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search conversations" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.name}</p>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium">{selectedConversation.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedConversation.isOnline ? "Active now" : "Last seen recently"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                    message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {!message.isFromUser && (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback className="text-xs">
                          {selectedConversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isFromUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder={`Message ${selectedConversation.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}