"use client"

import { useEffect, useState } from "react"
import { TigerMascot } from "./tiger-mascot"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="min-h-screen w-full bg-[#A0D8E6] flex flex-col items-center justify-center p-8">
      <div className="mb-8 animate-bounce">
        <TigerMascot expression="happy" size="xl" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] text-center mb-4">Дружок</h1>

      <p className="text-xl text-[#555] text-center mb-8">Твій друг для емоцій</p>

      <div className="w-64 h-4 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFD93D] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
