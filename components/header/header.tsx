"use server"

import SignOutBtn from "../sign-out-btn"
import { SidebarTrigger } from "../ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "../toggle-theme-mode"


const Header = ({user}:{user:{id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;}}) => {
  return (
    <div className="flex justify-between gap-5 items-center border-b border-border py-2 pr-6">
      <div className="flex items-center  gap-1">
         <SidebarTrigger />
           <h1 className="scroll-m-20\ text-center text-xl font-extrabold tracking-tight text-balance">
      LLM
    </h1>
      </div>
    
    <div className="flex items-center space-x-2">
       <div>
        <ModeToggle/>
       </div>

      <DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar>
  <AvatarImage src={user.image as string} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><SignOutBtn/></DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
    </div>
    </div>
  )
}

export default Header