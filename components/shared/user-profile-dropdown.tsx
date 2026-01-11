"use client"

import { Sunflower } from "./sunflower"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

interface UserProfileDropdownProps {
  onNavigate: (page: "account" | "parental-settings") => void
}

export function UserProfileDropdown({ onNavigate }: UserProfileDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <Sunflower size={32} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-white border-none shadow-lg rounded-xl p-2">
          <DropdownMenuItem
            onClick={() => onNavigate("account")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#A0D8E6]/20 text-[#2D3436] font-medium"
          >
            <User className="w-5 h-5 text-[#6D4C41]" />
            <span>Обліковий запис</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onNavigate("parental-settings")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#A0D8E6]/20 text-[#2D3436] font-medium"
          >
            <Settings className="w-5 h-5 text-[#6D4C41]" />
            <span>Батьківські налаштування</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-not-allowed opacity-50 text-[#2D3436] font-medium"
          >
            <LogOut className="w-5 h-5 text-[#6D4C41]" />
            <span>Вихід</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="bg-white px-4 py-2 rounded-full text-[#2D3436] font-semibold text-lg shadow-sm">Борис</span>
    </div>
  )
}
