"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RotateCcw, Home } from "lucide-react"
import { Sunflower } from "./sunflower"

interface DisgustCleanActivityProps {
  onHome: () => void
}

interface MessSpot {
  id: number
  x: number
  y: number
  size: number
  type: "mud" | "splash" | "cloud"
  cleaned: boolean
}

const generateMessSpots = (): MessSpot[] => {
  const spots: MessSpot[] = []
  const types: ("mud" | "splash" | "cloud")[] = ["mud", "splash", "cloud"]

  for (let i = 0; i < 12; i++) {
    spots.push({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 30 + Math.random() * 40,
      type: types[Math.floor(Math.random() * types.length)],
      cleaned: false,
    })
  }
  return spots
}

export default function DisgustCleanActivity({ onHome }: DisgustCleanActivityProps) {
  const [messSpots, setMessSpots] = useState<MessSpot[]>([])
  const [cleanedCount, setCleanedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showSparkle, setShowSparkle] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    setMessSpots(generateMessSpots())
  }, [])

  const handleClean = (spotId: number, e: React.MouseEvent | React.TouchEvent) => {
    const spot = messSpots.find((s) => s.id === spotId)
    if (!spot || spot.cleaned) return

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top

    setShowSparkle({ x, y })
    setTimeout(() => setShowSparkle(null), 500)

    const newSpots = messSpots.map((s) => (s.id === spotId ? { ...s, cleaned: true } : s))
    setMessSpots(newSpots)

    const newCount = cleanedCount + 1
    setCleanedCount(newCount)

    if (newCount >= messSpots.length) {
      setTimeout(() => setIsComplete(true), 500)
    }
  }

  const resetGame = () => {
    setMessSpots(generateMessSpots())
    setCleanedCount(0)
    setIsComplete(false)
  }

  const getMessEmoji = (type: string) => {
    switch (type) {
      case "mud":
        return "🟤"
      case "splash":
        return "💧"
      case "cloud":
        return "☁️"
      default:
        return "🟤"
    }
  }

  return (
    <div className="h-screen w-full bg-[#A0D8E6] p-3 md:p-4 overflow-hidden">
      {/* User profile badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
          <Sunflower size={28} />
        </div>
        <span className="bg-white px-3 py-1.5 rounded-full text-[#2D3436] font-semibold text-base shadow-sm">
          Борис
        </span>
      </div>

      <button
        onClick={onHome}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-white/80 transition-colors text-xl"
        title="Додому"
      >
        🏠
      </button>

      <div className="max-w-3xl mx-auto flex flex-col items-center pt-14">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-1">Прибираємо разом!</h1>
        <p className="text-sm text-[#555] text-center mb-3">Торкнися плям, щоб їх прибрати</p>

        <div className="relative w-56 h-56 md:w-64 md:h-64 bg-white rounded-2xl shadow-xl mb-3 overflow-hidden">
          {/* Clean background that appears as spots are cleaned */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#A8E6CF] to-[#88D8B0] transition-opacity duration-500"
            style={{ opacity: cleanedCount / messSpots.length }}
          />

          {/* Beautiful scene underneath */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: cleanedCount / messSpots.length }}
          >
            <div className="text-center">
              <span className="text-5xl">🌻</span>
              <span className="text-5xl">🌼</span>
              <span className="text-5xl">🌷</span>
            </div>
          </div>

          {/* Mess spots */}
          {messSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={(e) => handleClean(spot.id, e)}
              onTouchStart={(e) => handleClean(spot.id, e)}
              className={`absolute transition-all duration-300 ${
                spot.cleaned ? "opacity-0 scale-0" : "opacity-90 hover:scale-110 cursor-pointer animate-pulse"
              }`}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                fontSize: `${spot.size}px`,
                transform: "translate(-50%, -50%)",
              }}
              disabled={spot.cleaned}
            >
              {getMessEmoji(spot.type)}
            </button>
          ))}

          {/* Sparkle effect */}
          {showSparkle && (
            <div
              className="absolute pointer-events-none animate-ping"
              style={{ left: showSparkle.x, top: showSparkle.y }}
            >
              <span className="text-2xl">✨</span>
            </div>
          )}

          {isComplete && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center animate-in fade-in duration-500">
              <span className="text-5xl mb-2">🌟</span>
              <p className="text-xl font-bold text-[#2D3436] mb-1">Чудово!</p>
              <p className="text-sm text-[#555] mb-4">Все чисто і гарно!</p>

              <div className="flex gap-4">
                <button
                  onClick={resetGame}
                  className="w-12 h-12 rounded-full bg-[#A8E6CF] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Ще раз"
                >
                  <RotateCcw className="w-6 h-6 text-[#2D3436]" />
                </button>
                <button
                  onClick={onHome}
                  className="w-12 h-12 rounded-full bg-[#87CEEB] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Додому"
                >
                  <Home className="w-6 h-6 text-[#2D3436]" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-3 w-full max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#555] font-medium text-sm">Прогрес:</span>
            <span className="text-[#2D3436] font-bold text-sm">
              {cleanedCount} / {messSpots.length}
            </span>
          </div>
          <div className="w-full h-3 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A8E6CF] to-[#88D8B0] transition-all duration-300 rounded-full"
              style={{ width: `${(cleanedCount / messSpots.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}



