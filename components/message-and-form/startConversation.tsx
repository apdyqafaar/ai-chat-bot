"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function StartConversation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="max-w-xl mx-auto mt-20 rounded-2xl px-6 py-10 
                 flex flex-col justify-center items-center space-y-4 
                 bg-gradient-to-br from-background via-muted/30 to-background 
                 shadow-lg shadow-primary/10 backdrop-blur-sm"
    >
      <motion.div
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="p-4 rounded-full bg-primary/10"
      >
        <Bot className="h-10 w-10 text-primary" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-foreground text-center"
      >
        Start Conversation
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-center text-sm max-w-sm"
      >
        Ask me anything — I’m here to help you with your ideas, code, or questions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent mt-3"
      />
    </motion.div>
  );
}
