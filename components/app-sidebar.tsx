import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { BotIcon,  } from "lucide-react"
import { Suspense } from "react"
import ConversationLInks from "./message-and-form/conversationLInks"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-4 flex flex-col border-b mb-4">
      <BotIcon className="text-primary"/>
      <span className="text-muted-foreground text-xs">Best llm for chating, coding, image generating</span>
      
      </SidebarHeader>


     <Suspense >
      <ConversationLInks/>
     </Suspense>


       <SidebarFooter className="border-t px-4 py-3">
  <div className="flex items-center justify-between text-xs text-muted-foreground">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span>AI Online</span>
    </div>
    <span>v2.1.0</span>
  </div>
</SidebarFooter>

    </Sidebar>
  )
}


