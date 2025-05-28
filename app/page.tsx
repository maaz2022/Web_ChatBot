"use client";

import LandingSections from "@/components/LandingSections";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownCircleIcon, MessageCircle, MessageCircleIcon, RefreshCcwIcon, SendIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReactNode, ComponentProps } from "react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, error, reload, stop, isLoading } = useChat({
    api: "/api/gemini"
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <LandingSections setIsChatOpen={setIsChatOpen} />
      <AnimatePresence>
        {showChatIcon && (
        <motion.div
          key="chat-icon"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button onClick={toggleChat} ref={chatIconRef} className="size-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-100 transition">
            {!isChatOpen ? (
              <MessageCircle className="w-10 h-10 text-blue-600" />
            ) : (
              <ArrowDownCircleIcon className="w-10 h-10 text-blue-600" />
            )}
          </button>
        </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            key="chat-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2 shadow-xl bg-white/90 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between border-b-2 pb-2 bg-blue-100/60">
                <CardTitle className="text-2xl font-bold text-blue-700">
                  <h1>Chat</h1>
                </CardTitle>
                <button onClick={toggleChat} className="size-5 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-100 transition">
                  <XIcon className="w-5 h-5 text-red-500" />
                </button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="flex flex-col gap-2 px-2 py-4">
                    {messages.length === 0 && (
                      <p className="text-center text-gray-400">No messages yet</p>
                    )}
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 text-base shadow-md whitespace-pre-line break-words
                            ${message.role === "user"
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-200 text-gray-900 rounded-bl-none"}
                          `}
                        >
                          <ReactMarkdown
                            children={message.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code: ({inline, children, ...props}: ComponentProps<"code"> & {inline?: boolean}) =>
                                inline ? (
                                  <code className="bg-blue-100 text-blue-700 px-1 rounded" {...props}>{children}</code>
                                ) : (
                                  <pre className="bg-gray-900 text-white p-2 rounded overflow-x-auto"><code>{children}</code></pre>
                                ),
                              ul: ({children}) => (
                                <ul className="list-disc pl-5 space-y-1">{children}</ul>
                              ),
                              ol: ({children}) => (
                                <ol className="list-decimal pl-5 space-y-1">{children}</ol>
                              )
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex w-full justify-start">
                        <div className="max-w-[80%] rounded-2xl px-4 py-2 text-base shadow-md bg-gray-200 text-gray-900 rounded-bl-none flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t-2 pt-2 bg-blue-50/60">
                <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center justify-center w-full">
                  <Input value={input} onChange={handleInputChange} placeholder="Message" className="w-full bg-white/80" autoFocus />
                  <Button type="submit" className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendIcon className="w-5 h-5" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
