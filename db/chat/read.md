# 💬 Chat System Logic (Conversations + Messages)

This module handles the complete **chat logic** — including user conversations and messages — built using **Drizzle ORM** and **Next.js server actions**.  
It ensures that conversations, messages, and user interactions are stored, fetched, and managed efficiently.

---

## ⚙️ Overview

The system allows:
- Creating and managing user conversations  
- Saving and retrieving messages (text or image)  
- Validating user ownership  
- Deleting conversations safely  
- Automatically keeping conversation timestamps up-to-date  

This design ensures a reliable and scalable chat experience for both human and AI conversations.

---

## 🧠 Core Concepts

### 🗂 Conversation
Represents a single chat session.  
Each conversation belongs to one user and contains multiple messages.  

### 💬 Message
Represents a single chat message — either **text** or **image** — associated with a specific conversation and user.

---

## 🔧 Function Reference

### 🆕 `createConversation(user_id, title?)`
Creates a new conversation for a user.

**Logic Flow:**
1. Accepts a user ID and optional title.
2. Inserts a new conversation.
3. Returns the newly created conversation’s ID.
4. Sets a default title if none is provided (`"New conversation"`).

---

### 📋 `getUserConversations(user_id)`
Fetches all conversations that belong to a given user.

**Logic Flow:**
1. Selects all conversations where `userId` = the given user.
2. Orders results by `createdAt` in descending order.
3. Returns the list of conversations.

---

### 🔍 `getConversationById({ conver_id, user_id })`
Retrieves one specific conversation for the user.

**Logic Flow:**
1. Selects the conversation by ID and `userId`.
2. Ensures the conversation belongs to the user.
3. Returns `null` if not found or unauthorized.
4. Returns the conversation object otherwise.

---

### 💾 `saveChat({ conver_id, messages })`
Saves new messages to a conversation.

**Logic Flow:**
1. Validates that the conversation exists.
2. Loads existing messages for that conversation.
3. Filters out messages that already exist in the database.
4. Maps each new message into a database-friendly format:
   - Text messages → store `content`
   - Image messages → store `imageUrl`
5. Inserts only the new messages.
6. Updates the parent conversation’s `updatedAt` timestamp.

**Features:**
- Prevents duplicate message insertion.
- Automatically associates each message with the correct user and conversation.
- Supports multiple message types.

---

### 📥 `loadMessages(conver_id)`
Retrieves all messages from a conversation.

**Logic Flow:**
1. Fetches all messages linked to the given conversation ID.
2. Orders them by `createdAt` (oldest → newest).
3. Transforms each message into a UI-friendly format:
   ```ts
   {
     id: string,
     role: "user" | "assistant",
     parts: [
       { type: "text", text?: string },
       { type: "image", imageUrl?: string }
     ]
   }
