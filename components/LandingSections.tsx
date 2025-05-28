import React, { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { HeartPulse, UserCheck, MessageCircle, Mail, User, ClipboardCopy, CheckCircle } from "lucide-react";

interface LandingSectionsProps {
  setIsChatOpen: (open: boolean) => void;
}

const LandingSections: React.FC<LandingSectionsProps> = ({ setIsChatOpen }) => {
  const [copied, setCopied] = React.useState(false);
  const email = "contactmuhammadmaaz@gmail.com";
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <HeartPulse className="absolute opacity-10 text-blue-300 w-[400px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
          <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
            Your Medical AI Assistant
          </h1>
          <p className="relative z-10 text-lg md:text-2xl text-blue-800 max-w-2xl mx-auto mb-6">
            Ask anything about medicine, healthcare, or medical technology.<br />
            <span className="text-blue-600 font-semibold">Scroll down and click the chat icon to start your conversation!</span>
          </p>
          <Button
            size="lg"
            className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg flex items-center gap-2"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-6 h-6 mr-2" /> Start Chatting
          </Button>
        </section>

        {/* About Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-8 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center">Why a Medical Chatbot?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow">
                <UserCheck className="w-10 h-10 text-blue-600 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-700">Get answers to your medical questions, 24/7, from a bot trained on medical knowledge.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow">
                <HeartPulse className="w-10 h-10 text-blue-600 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-gray-700">Your questions are confidential. No appointments, no waiting rooms, just instant help.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow">
                <MessageCircle className="w-10 h-10 text-blue-600 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-700">Open the chat, ask your question, and get a clear, helpful answer in seconds.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="w-full py-16 md:py-24 bg-blue-50 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-blue-100/60 to-blue-200/40 pointer-events-none" />
          <div className="container px-4 md:px-8 mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">How to Use</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 transition-transform hover:scale-105">
                <span className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold mb-3 shadow"><MessageCircle className="w-7 h-7" /></span>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Reveal the Chat Icon</h4>
                <p className="text-blue-900 text-base">Scroll the page a bit to see the chat icon in the bottom right corner.</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 transition-transform hover:scale-105">
                <span className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold mb-3 shadow"><HeartPulse className="w-7 h-7" /></span>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Open the Chat</h4>
                <p className="text-blue-900 text-base">Click the chat icon to open the chat window.</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 transition-transform hover:scale-105">
                <span className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold mb-3 shadow"><UserCheck className="w-7 h-7" /></span>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Ask Your Question</h4>
                <p className="text-blue-900 text-base">Type your medical question and get instant, expert answers!</p>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow flex items-center gap-2"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="w-5 h-5 mr-1" /> Start Chatting
              </Button>
            </div>
          </div>
        </section>

        {/* Contact & Credits Section */}
        <section id="contact" className="w-full py-16 md:py-24 bg-white flex items-center justify-center">
          <div className="max-w-lg w-full mx-auto bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-200">
            {/* Avatar/Profile */}
            <div className="bg-white shadow-lg border-4 border-blue-200 rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <span className="text-blue-700 text-4xl font-extrabold">M</span>
            </div>
            <h2 className="text-3xl font-extrabold text-blue-800 mb-1 text-center">Contact & Credits</h2>
            <div className="text-blue-600 text-lg font-semibold mb-2">Let's Connect!</div>
            <p className="text-gray-700 text-base text-center mb-6 max-w-md">
              This chatbot is built by <span className="font-semibold text-blue-700">Muhammad Maaz</span>.<br />
              For custom chatbots or business inquiries, reach out!
            </p>
            <div className="w-full flex flex-col gap-4 items-center mb-6">
              <div className="flex items-center gap-3 w-full justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Email:</span>
                <span className="select-all text-blue-900 font-mono">{email}</span>
                <Button size="icon" variant="ghost" onClick={handleCopy} className="ml-1">
                  {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <ClipboardCopy className="w-5 h-5 text-blue-600" />}
                </Button>
              </div>
              <div className="flex items-center gap-3 w-full justify-center">
                <User className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Portfolio:</span>
                <a href="https://muhammadmaazportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 text-blue-900 font-mono">muhammadmaazportfolio.vercel.app</a>
              </div>
              {/* <div className="flex items-center gap-3 w-full justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Business Email:</span>
                <a href="mailto:maaznazeer098@gmail.com" className="underline hover:text-blue-600 text-blue-900 font-mono">maaznazeer098@gmail.com</a>
              </div> */}
            </div>
            <div className="w-full flex items-center justify-center my-4">
              <div className="h-px w-2/3 bg-blue-200 rounded-full" />
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg mt-2">
              <a href="mailto:contactmuhammadmaaz@gmail.com">Email Me</a>
            </Button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col justify-center gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-blue-50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Medical AI Chatbot by Muhammad Maaz. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingSections;
