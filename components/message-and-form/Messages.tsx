"use client";

// import { UIMessage } from "@/lib/chat";
import StartConversation from "./startConversation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SessionWithUser } from "@/types/session";
import { Bot, Heart, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { useEffect, useRef, useState } from "react";
import { UIMessage } from "ai";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyImageUrl, downloadImage } from "@/helpers/uiHelpers";
import { Copy } from "lucide-react";

interface MessagesProps {
  messages: UIMessage[];
  session: SessionWithUser;
  status: "streaming" | "error" | "ready" | "submitted";
}

const Messages = ({ messages, session, status }: MessagesProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isLovedMessage, setIsLovedMessage] = useState<string[]>([]);
  const [isCoppied, setIsCoppied] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className=" min-h-full max-w-3xl mx-auto w-full py-10 scrolle--">
      {messages.length === 0 ? (
        <StartConversation />
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex space-x-2 max-w-2xl ${
                message.role === "user" && "flex-row-reverse space-x-reverse"
              }`}
            >
              <Avatar className="h-9 w-9 shrink-0 flex">
                {message.role === "user" ? (
                  <>
                    <AvatarImage src={session.user.name || " "} />
                    <AvatarFallback className="bg-primary/70 w-full h-full text-sm ">
                      <User className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-primary/70 w-full h-full text-sm ">
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                )}
              </Avatar>

              {/* content */}
              <div
                className={`px-3 py-2 rounded-2xl my-4 ${
                  message.role === "user" ? "bg-primary/70 text-white" : ""
                }`}
              >
                <div className="text-sm leading-relaxed font-normal">
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return message.role === "assistant" ? (
                          <Streamdown
                            isAnimating={status === "streaming"}
                            key={i}
                          >
                            {part.text}
                          </Streamdown>
                        ) : (
                          <span key={i + Math.floor(Math.random() * 2)}>
                            {part.text}
                          </span>
                        );
                      case "tool-generatingImage":
                        const imagePart = part as any;
                        console.log("part image", part);
                        const imageSrc =
                          (imagePart.imageUrl )as string ||
                          (imagePart?.output?.imageUrl )as string;
                        if (!imageSrc || imageSrc.trim() === "") {
                          return (
                            <div
                              key={i}
                              className="my-3 w-[400px] h-[400px] rounded-md bg-muted animate-pulse"
                            />
                          );
                        }
                        if (imagePart) {
                          return (
                            <div key={i} className="my-3">
                              <img
                                src={imageSrc}
                                alt="Generated-image"
                                className="rounded-md max-w-full"
                                width={400}
                                height={400}
                              />
                              <div className="flex items-center mt-2 space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className=" flex items-center gap-2 border-0 bg-accent"
                                  onClick={() => downloadImage(imageSrc)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Heart
                                  className={`w-4 h-4 ${
                                    isLovedMessage.includes(message.id) &&
                                    "text-rose-600"
                                  }`}
                                  onClick={() =>
                                    setIsLovedMessage((prve) => [
                                      ...prve,
                                      message.id,
                                    ])
                                  }
                                />
                                <span
                                  className={`inline-flex items-center transition-all duration-300 ease-in-out transform ${
                                    isCoppied
                                      ? "opacity-100 translate-y-0"
                                      : "opacity-70"
                                  }`}
                                >
                                  {isCoppied ? (
                                    <span className="px-1 text-xs">Copied</span>
                                  ) : (
                                    <Copy
                                      className="w-4 h-4 opacity-100 transition-opacity duration-300 ease-in-out"
                                      onClick={() =>
                                        copyImageUrl(imageSrc, setIsCoppied)
                                      }
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        }

                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
