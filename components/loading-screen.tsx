"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#A0D8E6] p-8">
      {/* Main content - centered vertically */}
      <div className="flex flex-col items-center">
        <img
          src="/images/app-tiger.png"
          alt="Druzhok - the friendly tiger mascot"
          className="w-72 h-auto md:w-96 lg:w-[28rem] object-contain"
        />

        <div className="w-64 md:w-80 h-2.5 bg-white/40 rounded-full overflow-hidden mt-8">
          <div
            className="h-full bg-[#FFD93D] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
