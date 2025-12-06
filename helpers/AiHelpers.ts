import { updateConversation } from "@/lib/chat";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage } from "ai";
import { revalidatePath } from "next/cache";
import Replicate from "replicate"


// updating conversation title
export const updateConversationTitle = async (
  conver_id: string,
  messages: UIMessage[]
) => {
  if (!conver_id) throw Error("Conversation is required!");
  const content = messages
    .filter((m) => m.role === "user")
    .flatMap((m) => m.parts.filter((p) => p.type === "text").map((p) => p.text))
    .join(" ");
  try {
    const result =  streamText({
      system: `Your job is to generate a clear, concise, and relevant conversation title based on the full chat context provided. 
Focus on capturing the main idea of the conversation in a short and meaningful title. 
Do not include unnecessary words, explanations, or extra content—return only the best possible title.
`,
      model: openai("gpt-4.1"),
      messages: [
        {
          role: "user",
          content: `context about user conversation is ${content}`,
        },
      ],
    });

    result.consumeStream();
    const text=await result.text
    // console.log("conversation-Title: ", text);
     await updateConversation(conver_id, {
      title: text,
      updatedAt: new Date(),
    });

      revalidatePath(`/chat/`)
  } catch (error) {
    console.log("Error at preparing the conversation title");
    throw error;
  }
};

// generate image ai on replicate
export const generateImage=async(prompt:string, output_format="jpg"):Promise<String>=>{
  try {
    if(!prompt) throw new Error("prompt is required")
    // initializing replicate
    const replicate=new Replicate({
        auth:process.env.REPLICATE_API_TOKEN
    })

    const input={
        prompt,
        output_format,
    }

    const output = await replicate.run("google/gemini-2.5-flash-image", { input });
    const image_url=(output as any).url()
console.log("image created at ai helper func", image_url)
    return image_url.href
  } catch (error) {
    console.log("Error at Generating Image on replicate", error)
    throw error
  }
}
