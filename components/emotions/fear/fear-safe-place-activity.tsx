"use client"

import React, { useState } from "react"
import { RotateCcw, Home } from "lucide-react"
import { Sunflower } from "../../shared/sunflower"

interface FearSafePlaceActivityProps {
  onHome: () => void
}

interface SafePerson {
  id: string
  emoji: string
  name: string
  selected: boolean
}

const safetyFigures: Omit<SafePerson, "selected">[] = [
  { id: "parent", emoji: "👨‍👩‍👧", name: "Батьки" },
  { id: "grandparent", emoji: "👵", name: "Бабуся/Дідусь" },
  { id: "teacher", emoji: "👩‍🏫", name: "Вчитель" },
  { id: "friend", emoji: "👧", name: "Друг" },
  { id: "pet", emoji: "🐕", name: "Домашній улюбленець" },
  { id: "blanket", emoji: "🧸", name: "Улюблена іграшка" },
]

export default function FearSafePlaceActivity({ onHome }: FearSafePlaceActivityProps) {
  const [figures, setFigures] = useState<SafePerson[]>(safetyFigures.map((f) => ({ ...f, selected: false })))
  const [isComplete, setIsComplete] = useState(false)

  const handleSelect = (id: string) => {
    const newFigures = figures.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    setFigures(newFigures)

    const selectedCount = newFigures.filter((f) => f.selected).length
    if (selectedCount >= 3 && !isComplete) {
      setTimeout(() => setIsComplete(true), 500)
    }
  }

  const resetGame = () => {
    setFigures(safetyFigures.map((f) => ({ ...f, selected: false })))
    setIsComplete(false)
  }

  const selectedFigures = figures.filter((f) => f.selected)

  return (
    <div className="h-screen w-full bg-[#A0D8E6] p-3 md:p-4 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* User profile badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
          <Sunflower size={28} />
        </div>
        <span className="bg-white px-3 py-1.5 rounded-full text-[#2D3436] font-semibold text-base shadow-sm">
          Борис
        </span>
      </div>

      <button
        onClick={onHome}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-white/80 transition-colors text-xl z-10"
        title="Додому"
      >
        🏠
      </button>

      <div className="max-w-3xl mx-auto flex flex-col items-center pt-14 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-1">Хто тебе захищає?</h1>
        <p className="text-sm text-[#555] text-center mb-3">Обери тих, хто допомагає тобі почуватися безпечно</p>

        <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white/90 rounded-full shadow-xl mb-3 flex items-center justify-center">
          {/* Center heart */}
          <div className="absolute text-4xl">💛</div>

          {/* Selected figures around the heart */}
          {selectedFigures.map((figure, index) => {
            const angle = (index * 360) / Math.max(selectedFigures.length, 1) - 90
            const radius = 70
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius
            return (
              <div
                key={figure.id}
                className="absolute transition-all duration-500 animate-in fade-in zoom-in"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <span className="text-3xl md:text-4xl drop-shadow-lg">{figure.emoji}</span>
              </div>
            )
          })}

          {/* Instruction if none selected */}
          {selectedFigures.length === 0 && (
            <p className="absolute bottom-6 text-[#888] text-xs text-center px-4">Обери хоча б 3 особи</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-3 w-full max-w-sm">
          <p className="text-center text-[#555] mb-2 font-medium text-sm">Хто допомагає тобі почуватися безпечно?</p>

          <div className="grid grid-cols-3 gap-2">
            {figures.map((figure) => (
              <button
                key={figure.id}
                onClick={() => handleSelect(figure.id)}
                className={`p-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-1 ${
                  figure.selected
                    ? "bg-[#C8B6E2] ring-2 ring-[#5B8DEF] scale-105"
                    : "bg-[#F5F5F5] hover:bg-[#E8E0F0] hover:scale-105"
                }`}
              >
                <span className="text-2xl">{figure.emoji}</span>
                <span className="text-[10px] text-[#555] text-center leading-tight">{figure.name}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-[#888] mt-2 text-xs">Обрано: {selectedFigures.length} / 3</p>
        </div>

        {/* Completion overlay */}
        {isComplete && (
          <div className="fixed inset-0 bg-[#A0D8E6]/95 flex flex-col items-center justify-center z-50 animate-in fade-in duration-500">
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}

            <div className="flex gap-2 mb-4">
              {selectedFigures.map((f) => (
                <span key={f.id} className="text-4xl">
                  {f.emoji}
                </span>
              ))}
            </div>

            <span className="text-5xl mb-3">💛</span>
            <p className="text-2xl font-bold text-[#2D3436] mb-1">Ти не один!</p>
            <p className="text-base text-[#555] mb-6 text-center px-8">Ці люди завжди поруч і допоможуть тобі</p>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Ще раз"
              >
                <RotateCcw className="w-7 h-7 text-[#5B8DEF]" />
              </button>
              <button
                onClick={onHome}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Додому"
              >
                <Home className="w-7 h-7 text-[#5B8DEF]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
