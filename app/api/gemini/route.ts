import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message } from "ai/react";
import { streamText } from "ai";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runtime = "edge";

const generateId = () => {
  return Math.random().toString(36).slice(2, 15);
};

const buildGoogleGenerativeAIStream = async (messages: Message[]): Promise<Message[]> => [
    {
        id: generateId(),
        role: "user",
        content: initialMessage.content,
    },
    ...messages.map((message) => ({
        id: generateId(),
        role: message.role,
        content: message.content,
    })),
];

export async function POST(req: Request) {
    const { messages } = await req.json();
    const stream = await streamText({
        model: google("gemini-1.5-flash"),
        messages: await buildGoogleGenerativeAIStream(messages),
        temperature: 0.7,
    });
    return stream?.toDataStreamResponse();
}