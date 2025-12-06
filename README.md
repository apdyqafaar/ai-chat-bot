# AI Chatbot Project

## Overview

This is a **Next.js AI-powered chatbot** that allows users to chat in real-time with a GPT-5-mini model, manage conversations, and generate realistic images. It supports:

- Real-time conversations with **streaming messages**  
- **Dynamic conversation lists** for each user  
- AI-generated images based on prompts  
- Download and copy functionality for generated images  
- Social authentication using Better Auth  
- Realtime updates using **WebSockets or polling**  
- Fully TypeScript-supported, integrated with **Drizzle ORM** and **Neon DB**  

---

## Features

### Chat Features

- Multi-user chat with **user-specific conversations**  
- Streaming assistant responses  
- Conversation title generation based on chat context  
- Stop/resume streaming messages  
- Optimistic UI updates for smoother experience  

### Image Features

- Generate realistic images from text prompts  
- Supports tool-based image generation  
- Download and copy image URLs  
- Realistic prompts for historical, futuristic, or realistic scenarios  

### Real-time Updates

- Conversation lists update in real-time using **Socket.io** or periodic polling  
- Messages are updated without page refresh  
- Optimistic UI for fast user experience  

### Authentication

- Social login and email/password via Better Auth  
- Session-based access for user-specific conversations  
- CORS-enabled for social login  

### Database

- **Neon DB** with **Drizzle ORM**  
- Stores users, conversations, and messages  
- Supports fetching latest conversation and updating titles dynamically  

---

## Tech Stack

- **Frontend:** Next.js 16+, TypeScript, TailwindCSS  
- **Backend:** Next.js API routes, Node.js, Socket.io (optional)  
- **AI:** OpenAI GPT-5-mini via streaming API  
- **Database:** Neon DB with Drizzle ORM  
- **Auth:** Better Auth (supports social login)  
- **Image Generation:** OpenAI or custom tool API  
- **State Management:** Zustand (for client-side state caching)  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ai-chat-bot.git
cd ai-chat-bot
npm install
# and

NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_neon_db_url
OPENAI_API_KEY=your_openai_api_key
AUTH_SECRET=your_auth_secret
