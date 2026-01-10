"use client"

import { useState, useEffect, useCallback } from "react"
import { RotateCcw, Home } from "lucide-react"
import { Sunflower } from "./sunflower"

interface BreathingExerciseProps {
  onHome: () => void
}

type BreathPhase = "inhale" | "hold1" | "exhale" | "hold2"

export default function BreathingExercise({ onHome }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<BreathPhase>("inhale")
  const [progress, setProgress] = useState(0)
  const [countdownNumber, setCountdownNumber] = useState(4)
  const [isComplete, setIsComplete] = useState(false)

  const phaseDuration = 4000

  const getNextPhase = useCallback((currentPhase: BreathPhase): BreathPhase => {
    const phases: BreathPhase[] = ["inhale", "hold1", "exhale", "hold2"]
    const currentIndex = phases.indexOf(currentPhase)
    return phases[(currentIndex + 1) % phases.length]
  }, [])

  useEffect(() => {
    if (isComplete) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const secondsRemaining = Math.ceil(4 - (prev / 100) * 4)
        setCountdownNumber(secondsRemaining > 0 ? secondsRemaining : 1)

        if (prev >= 100) {
          const nextPhase = getNextPhase(phase)
          setPhase(nextPhase)
          if (nextPhase === "inhale") {
            setIsComplete(true)
          }
          return 0
        }
        return prev + 100 / (phaseDuration / 50)
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [phase, getNextPhase, isComplete])

  const getTigerScale = () => {
    const baseScale = 1
    const maxScale = 1.15

    switch (phase) {
      case "inhale":
        return baseScale + (maxScale - baseScale) * (progress / 100)
      case "hold1":
        return maxScale
      case "exhale":
        return maxScale - (maxScale - baseScale) * (progress / 100)
      case "hold2":
        return baseScale
    }
  }

  const resetExercise = () => {
    setPhase("inhale")
    setProgress(0)
    setCountdownNumber(4)
    setIsComplete(false)
  }

  return (
    <div className="min-h-screen w-full bg-[#A0D8E6] p-6 md:p-8 lg:p-12">
      {/* User profile badge */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
          <Sunflower size={32} />
        </div>
        <span className="bg-white px-4 py-2 rounded-full text-[#2D3436] font-semibold text-lg shadow-sm">Борис</span>
      </div>

      <button
        onClick={onHome}
        className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-white/80 transition-colors text-3xl"
        title="Додому"
      >
        🏠
      </button>

      <div className="max-w-3xl mx-auto flex flex-col items-center pt-24">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] text-center mb-8">Подихаємо разом</h1>

        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-8">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-white/30" />

          {/* Progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="3" opacity="0.3" />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#5B8DEF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.89} 289`}
              className="transition-all duration-100"
            />
          </svg>

          {/* Animated tiger */}
          <div
            className="absolute inset-8 flex items-center justify-center transition-transform duration-150 ease-out"
            style={{ transform: `scale(${getTigerScale()})` }}
          >
            <div className="relative">
              <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-56 md:h-56">
                <ellipse cx="50" cy="52" rx="35" ry="32" fill="#FFB347" />
                <ellipse cx="22" cy="28" rx="10" ry="12" fill="#FFB347" />
                <ellipse cx="78" cy="28" rx="10" ry="12" fill="#FFB347" />
                <ellipse cx="22" cy="28" rx="6" ry="8" fill="#FF8C42" />
                <ellipse cx="78" cy="28" rx="6" ry="8" fill="#FF8C42" />
                <path d="M30 35 Q35 40 30 48" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M70 35 Q65 40 70 48" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M35 30 Q38 35 35 42" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M65 30 Q62 35 65 42" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="50" cy="62" rx="18" ry="14" fill="#FFF8E7" />
                {phase === "inhale" || phase === "hold1" ? (
                  <>
                    <ellipse cx="38" cy="48" rx="7" ry="8" fill="white" />
                    <ellipse cx="62" cy="48" rx="7" ry="8" fill="white" />
                    <circle cx="38" cy="49" r="4" fill="#2D3436" />
                    <circle cx="62" cy="49" r="4" fill="#2D3436" />
                    <circle cx="36" cy="47" r="1.5" fill="white" />
                    <circle cx="60" cy="47" r="1.5" fill="white" />
                  </>
                ) : (
                  <>
                    <path d="M31 48 Q38 52 45 48" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M55 48 Q62 52 69 48" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </>
                )}
                <ellipse cx="50" cy="58" rx="5" ry="4" fill="#FF6B6B" />
                {phase === "inhale" ? (
                  <ellipse cx="50" cy="68" rx="8" ry="5" fill="#2D3436" opacity="0.8" />
                ) : phase === "exhale" ? (
                  <ellipse cx="50" cy="67" rx="6" ry="3" fill="#2D3436" opacity="0.6" />
                ) : (
                  <path d="M44 66 Q50 70 56 66" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
                <line x1="20" y1="55" x2="32" y2="58" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="60" x2="32" y2="62" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="65" x2="32" y2="66" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="80" y1="55" x2="68" y2="58" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="82" y1="60" x2="68" y2="62" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="80" y1="65" x2="68" y2="66" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-[#5B8DEF]">{countdownNumber}</span>
            </div>
          </div>
        </div>

        {/* Phase label */}
        <div className="bg-white rounded-2xl shadow-lg px-8 py-4 mt-4 mb-6">
          <span className="text-2xl md:text-3xl font-bold text-[#2D3436]">
            {phase === "inhale" && "Вдихни..."}
            {phase === "hold1" && "Затримай..."}
            {phase === "exhale" && "Видихни..."}
            {phase === "hold2" && "Затримай..."}
          </span>
        </div>

        {/* Completion overlay */}
        {isComplete && (
          <div className="fixed inset-0 bg-[#A0D8E6]/95 flex flex-col items-center justify-center z-50 animate-in fade-in duration-500">
            <span className="text-8xl mb-6">🐯</span>
            <p className="text-3xl font-bold text-[#2D3436] mb-2">Молодець!</p>
            <p className="text-xl text-[#555] mb-8">Ти чудово подихав!</p>

            <div className="flex gap-6">
              <button
                onClick={resetExercise}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Ще раз"
              >
                <RotateCcw className="w-8 h-8 text-[#5B8DEF]" />
              </button>
              <button
                onClick={onHome}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Додому"
              >
                <Home className="w-8 h-8 text-[#5B8DEF]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
