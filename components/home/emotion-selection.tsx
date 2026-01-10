"use client"

import { useState } from "react"
import type { Emotion } from "@/app/page"
import { UserProfileDropdown } from "./user-profile-dropdown"

interface EmotionSelectionProps {
  onSelect: (emotion: Emotion) => void
  onNavigate: (page: "account" | "parental-settings") => void
}

const emotions: { id: Emotion; label: string; ukrainianLabel: string; imageUrl: string }[] = [
  {
    id: "joy",
    label: "Joy",
    ukrainianLabel: "Радість",
    imageUrl: "/images/happy-tiger.png",
  },
  {
    id: "sadness",
    label: "Sadness",
    ukrainianLabel: "Печаль",
    imageUrl: "/images/sad-tiger.png",
  },
  {
    id: "fear",
    label: "Fear",
    ukrainianLabel: "Страх",
    imageUrl: "/images/fear-tiger.png",
  },
  {
    id: "disgust",
    label: "Disgust",
    ukrainianLabel: "Відраза",
    imageUrl: "/images/disgust-tiger.png",
  },
  {
    id: "anger",
    label: "Anger",
    ukrainianLabel: "Гнів",
    imageUrl: "/images/angry-tiger.png",
  },
]

export default function EmotionSelection({ onSelect, onNavigate }: EmotionSelectionProps) {
  const [tappedEmotion, setTappedEmotion] = useState<Emotion | null>(null)

  const handleTap = (emotion: Emotion) => {
    setTappedEmotion(emotion)
    setTimeout(() => {
      onSelect(emotion)
    }, 400)
  }

  return (
    <div className="h-screen w-full bg-[#A0D8E6] p-4 overflow-hidden">
      <div className="absolute top-4 left-4">
        <UserProfileDropdown onNavigate={onNavigate} />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full pt-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3436] text-center mb-6">
          Як ти себе почуваєш сьогодні?
        </h1>

        {/* Emotion grid - 3 on top, 2 on bottom centered */}
        <div className="flex flex-col items-center gap-4">
          {/* Top row - 3 emotions */}
          <div className="flex gap-4">
            {emotions.slice(0, 3).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleTap(emotion.id)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-3xl bg-white shadow-lg
                  transition-all duration-200 ease-out
                  hover:shadow-xl hover:scale-[1.02]
                  active:scale-95
                  ${tappedEmotion === emotion.id ? "scale-105 ring-4 ring-[#FFD93D]" : ""}
                `}
                style={{ width: "160px" }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={emotion.imageUrl || "/placeholder.svg"}
                    alt={emotion.ukrainianLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold text-[#2D3436]">{emotion.ukrainianLabel}</span>
              </button>
            ))}
          </div>

          {/* Bottom row - 2 emotions centered */}
          <div className="flex gap-4">
            {emotions.slice(3).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleTap(emotion.id)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-3xl bg-white shadow-lg
                  transition-all duration-200 ease-out
                  hover:shadow-xl hover:scale-[1.02]
                  active:scale-95
                  ${tappedEmotion === emotion.id ? "scale-105 ring-4 ring-[#FFD93D]" : ""}
                `}
                style={{ width: "160px" }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={emotion.imageUrl || "/placeholder.svg"}
                    alt={emotion.ukrainianLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold text-[#2D3436]">{emotion.ukrainianLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
