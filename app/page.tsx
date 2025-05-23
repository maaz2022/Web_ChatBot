"use client";

import LandingSections from "@/components/LandingSections";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownCircleIcon, MessageCircle, MessageCircleIcon, SendIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const { messages, input, handleInputChange, handleSubmit, error, reload, stop, isLoading } = useChat({api: "/api/gemini", onFinish: () => {
    setIsChatOpen(false);
  }})
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
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingSections />
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
          <button onClick={toggleChat} ref={chatIconRef} className="size-10 rounded-full bg-white shadow-lg flex items-center justify-center"> 
            {!isChatOpen ? (
              <MessageCircle className="w-10 h-10" />
            ) : (
              <ArrowDownCircleIcon className="w-10 h-10" />
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
            <Card className="border-2"> 
              <CardHeader className="flex flex-row items-center justify-between border-b-2 pb-2">
                <CardTitle className="text-2xl font-bold">
                  <h1>Chat</h1>
                </CardTitle>
                <button onClick={toggleChat} className="size-5 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <XIcon className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent>
              <ScrollArea className="h-[400px] pr-4">
              <div className="flex flex-col gap-2 items-center justify-center h-full mt-32">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div key={message.id} className="flex flex-col gap-2 ">
                        <p>{message.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>No messages yet</p>
                  )}
             </div>
              </ScrollArea>
              </CardContent>
              <CardFooter className="border-t-2 pt-2">
                <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center justify-center w-full">
                  <Input value={input} onChange={handleInputChange} placeholder="Message" className="w-full" />
                  <Button type="submit" className="w-10 h-10">
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
