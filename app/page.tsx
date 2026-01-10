"use client"

import { useState } from "react"
import LoadingScreen from "@/components/shared/loading-screen"
import EmotionSelection from "@/components/home/emotion-selection"
import EmotionReflection from "@/components/home/emotion-reflection"
import AIResponse from "@/components/shared/ai-response"
import BreathingExercise from "@/components/emotions/anger/breathing-exercise"
import JoyPaintActivity from "@/components/emotions/joy/joy-paint-activity"
import SadnessStoryActivity from "@/components/emotions/sadness/sadness-story-activity"
import DisgustCleanActivity from "@/components/emotions/disgust/disgust-clean-activity"
import FearSafePlaceActivity from "@/components/emotions/fear/fear-safe-place-activity"
import AccountPage from "@/components/settings/account-page"
import ParentalSettingsPage from "@/components/settings/parental-settings-page"

export type Emotion = "joy" | "sadness" | "anger" | "fear" | "disgust"
export type Screen = "loading" | "emotions" | "reflection" | "response" | "activity" | "account" | "parental-settings"

export default function DruzhokApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("loading")
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)
  const [userMessage, setUserMessage] = useState("")

  const handleLoadingComplete = () => {
    setCurrentScreen("emotions")
  }

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion)
    setCurrentScreen("reflection")
  }

  const handleReflectionSubmit = (message: string) => {
    setUserMessage(message)
    setCurrentScreen("response")
  }

  const handleActivityChoice = (choice: "activity" | "done" | "continue") => {
    if (choice === "activity") {
      setCurrentScreen("activity")
    } else if (choice === "continue") {
      setCurrentScreen("response")
    } else {
      setCurrentScreen("emotions")
      setSelectedEmotion(null)
      setUserMessage("")
    }
  }

  const handleGoHome = () => {
    setCurrentScreen("emotions")
    setSelectedEmotion(null)
    setUserMessage("")
  }

  const handleNavigate = (page: "account" | "parental-settings") => {
    setCurrentScreen(page)
  }

  const renderActivity = () => {
    switch (selectedEmotion) {
      case "anger":
        return <BreathingExercise onHome={handleGoHome} />
      case "joy":
        return <JoyPaintActivity onHome={handleGoHome} />
      case "sadness":
        return <SadnessStoryActivity onHome={handleGoHome} />
      case "disgust":
        return <DisgustCleanActivity onHome={handleGoHome} />
      case "fear":
        return <FearSafePlaceActivity onHome={handleGoHome} />
      default:
        return <BreathingExercise onHome={handleGoHome} />
    }
  }

  return (
    <main className="min-h-screen w-full overflow-hidden">
      {currentScreen === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}
      {currentScreen === "emotions" && <EmotionSelection onSelect={handleEmotionSelect} onNavigate={handleNavigate} />}
      {currentScreen === "reflection" && selectedEmotion && (
        <EmotionReflection
          emotion={selectedEmotion}
          onSubmit={handleReflectionSubmit}
          onBack={() => setCurrentScreen("emotions")}
          onHome={handleGoHome}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === "response" && selectedEmotion && (
        <AIResponse
          emotion={selectedEmotion}
          onChoice={handleActivityChoice}
          onHome={handleGoHome}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === "activity" && renderActivity()}
      {currentScreen === "account" && <AccountPage onHome={handleGoHome} onNavigate={handleNavigate} />}
      {currentScreen === "parental-settings" && (
        <ParentalSettingsPage onHome={handleGoHome} onNavigate={handleNavigate} />
      )}
    </main>
  )
}
