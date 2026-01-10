"use client"

import { useState } from "react"
import type { Emotion } from "@/app/page"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Send, Volume2, Home } from "lucide-react"
import { UserProfileDropdown } from "./user-profile-dropdown"

interface EmotionReflectionProps {
  emotion: Emotion
  onSubmit: (message: string) => void
  onBack: () => void
  onHome: () => void
  onNavigate: (page: "account" | "parental-settings") => void
}

const emotionQuestions: Record<Emotion, string> = {
  joy: "Чому тобі так весело сьогодні?",
  sadness: "Чому тобі сумно сьогодні?",
  anger: "Чому ти злишся сьогодні?",
  fear: "Чого ти боїшся сьогодні?",
  disgust: "Що тобі не подобається сьогодні?",
}

export default function EmotionReflection({ emotion, onSubmit, onHome, onNavigate }: EmotionReflectionProps) {
  const [message, setMessage] = useState(
    emotion === "anger" ? "Мене злить, що моє місто постійно руйнують і я відчуваю безнадію..." : "",
  )
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const speakQuestion = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(emotionQuestions[emotion])
      utterance.lang = "uk-UA"
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#A0D8E6] p-6 md:p-8 lg:p-12">
      <div className="absolute top-6 left-6">
        <UserProfileDropdown onNavigate={onNavigate} />
      </div>

      <button
        onClick={onHome}
        className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        title="Додому"
      >
        <Home className="w-6 h-6 text-[#2D3436]" />
      </button>

      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="w-full bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center">{emotionQuestions[emotion]}</h1>
            {/* Speaker button - reads question aloud */}
            <button
              onClick={speakQuestion}
              className="w-10 h-10 rounded-full bg-[#A0D8E6] hover:bg-[#8FCBD9] flex items-center justify-center transition-colors flex-shrink-0"
              title="Прослухати питання"
            >
              <Volume2 className="w-5 h-5 text-[#2D3436]" />
            </button>
            {/* Voice record button - at end of question */}
            <button
              onClick={toggleRecording}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                ${isRecording ? "bg-red-400 animate-pulse" : "bg-[#5B8DEF] hover:bg-[#4A7CD9]"}
              `}
              title="Записати відповідь"
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Text input */}
          <div className="relative mb-6">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напиши або розкажи, як ти почуваєшся..."
              className="w-full min-h-[180px] text-lg p-5 pr-16 rounded-2xl border-2 border-[#E0E0E0] focus:border-[#5B8DEF] resize-none bg-[#FAFAFA]"
            />
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#5B8DEF] hover:bg-[#4A7CD9] text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Recording indicator */}
          {isRecording && (
            <p className="text-center text-red-500 font-medium animate-pulse">
              Записую... натисни мікрофон, щоб зупинити
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
