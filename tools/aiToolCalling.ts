import { generateImage } from "@/helpers/AiHelpers";
import { tool } from "ai";
import z from "zod";


export const   generatingImageTool=tool({
                description:'generate any image user wants here',
                inputSchema: z.object({
                    prompt_image:z.string().describe("The prompt the will be used to generate the image")
                }),
                execute:async({prompt_image})=>{
                    console.log("generating image on tool executing function ")
                const  imageUrl= await generateImage(prompt_image)   as any
                  // console.log("image created", imageUrl)
                  return {
                    imageUrl
                  }
                }
            })