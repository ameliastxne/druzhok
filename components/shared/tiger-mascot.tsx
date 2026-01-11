"use client"

import type { Emotion } from "@/app/page"

interface TigerMascotProps {
  expression: Emotion | "happy" | "caring"
  size?: "sm" | "md" | "lg" | "xl"
  waving?: boolean
  animated?: boolean
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
}

export function TigerMascot({ expression, size = "md", waving = false, animated = false }: TigerMascotProps) {
  // Different facial expressions based on emotion
  const getFaceElements = () => {
    switch (expression) {
      case "joy":
      case "happy":
        return {
          eyes: "🌟",
          mouth: "curved-up",
          eyebrows: "happy",
          blush: true,
        }
      case "sadness":
        return {
          eyes: "💧",
          mouth: "curved-down",
          eyebrows: "sad",
          blush: false,
        }
      case "anger":
        return {
          eyes: "😤",
          mouth: "flat",
          eyebrows: "angry",
          blush: true,
        }
      case "fear":
        return {
          eyes: "😰",
          mouth: "open-small",
          eyebrows: "worried",
          blush: false,
        }
      case "disgust":
        return {
          eyes: "😖",
          mouth: "squiggle",
          eyebrows: "raised",
          blush: false,
        }
      case "caring":
        return {
          eyes: "💛",
          mouth: "gentle-smile",
          eyebrows: "caring",
          blush: true,
        }
      default:
        return {
          eyes: "normal",
          mouth: "smile",
          eyebrows: "normal",
          blush: true,
        }
    }
  }

  const face = getFaceElements()

  return (
    <div className={`${sizeClasses[size]} relative ${animated ? "animate-pulse-soft" : ""}`}>
      <svg viewBox="0 0 100 100" className={`w-full h-full ${waving ? "animate-wiggle" : ""}`}>
        {/* Tiger base - orange body */}
        <ellipse cx="50" cy="55" rx="35" ry="32" fill="#FF9F43" />

        {/* Tiger face - lighter orange */}
        <ellipse cx="50" cy="50" rx="32" ry="30" fill="#FECA57" />

        {/* Ears */}
        <ellipse cx="25" cy="22" rx="12" ry="12" fill="#FF9F43" />
        <ellipse cx="25" cy="22" rx="7" ry="7" fill="#FFB8B8" />
        <ellipse cx="75" cy="22" rx="12" ry="12" fill="#FF9F43" />
        <ellipse cx="75" cy="22" rx="7" ry="7" fill="#FFB8B8" />

        {/* Stripes */}
        <path d="M35 25 Q30 35 35 45" stroke="#E17055" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M65 25 Q70 35 65 45" stroke="#E17055" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M45 20 Q50 25 55 20" stroke="#E17055" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Eyes - expression based */}
        {expression === "joy" || expression === "happy" ? (
          <>
            <path d="M35 45 Q40 40 45 45" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M55 45 Q60 40 65 45" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : expression === "sadness" ? (
          <>
            <ellipse cx="40" cy="45" rx="5" ry="6" fill="#2D3436" />
            <ellipse cx="60" cy="45" rx="5" ry="6" fill="#2D3436" />
            <ellipse cx="41" cy="44" rx="2" ry="2" fill="#FFF" />
            <ellipse cx="61" cy="44" rx="2" ry="2" fill="#FFF" />
            <path d="M42 55 Q44 60 42 65" stroke="#74B9FF" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : expression === "anger" ? (
          <>
            <ellipse cx="40" cy="45" rx="5" ry="5" fill="#2D3436" />
            <ellipse cx="60" cy="45" rx="5" ry="5" fill="#2D3436" />
            <line x1="32" y1="35" x2="45" y2="40" stroke="#E17055" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="35" x2="55" y2="40" stroke="#E17055" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : expression === "fear" ? (
          <>
            <ellipse cx="40" cy="45" rx="6" ry="8" fill="#FFF" stroke="#2D3436" strokeWidth="2" />
            <ellipse cx="60" cy="45" rx="6" ry="8" fill="#FFF" stroke="#2D3436" strokeWidth="2" />
            <ellipse cx="40" cy="46" rx="3" ry="4" fill="#2D3436" />
            <ellipse cx="60" cy="46" rx="3" ry="4" fill="#2D3436" />
          </>
        ) : expression === "disgust" ? (
          <>
            <path d="M35 45 Q40 48 45 45" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M55 45 Q60 42 65 45" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="40" cy="45" rx="5" ry="6" fill="#2D3436" />
            <ellipse cx="60" cy="45" rx="5" ry="6" fill="#2D3436" />
            <ellipse cx="41" cy="44" rx="2" ry="2" fill="#FFF" />
            <ellipse cx="61" cy="44" rx="2" ry="2" fill="#FFF" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="50" cy="55" rx="6" ry="4" fill="#E17055" />

        {/* Mouth - expression based */}
        {expression === "joy" || expression === "happy" || expression === "caring" ? (
          <path d="M40 62 Q50 72 60 62" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : expression === "sadness" ? (
          <path d="M40 68 Q50 60 60 68" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : expression === "anger" ? (
          <line x1="42" y1="65" x2="58" y2="65" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
        ) : expression === "fear" ? (
          <ellipse cx="50" cy="65" rx="5" ry="4" fill="#2D3436" />
        ) : expression === "disgust" ? (
          <path
            d="M42 65 Q47 62 50 65 Q53 68 58 65"
            stroke="#2D3436"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path d="M42 62 Q50 68 58 62" stroke="#2D3436" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* Blush */}
        {face.blush && (
          <>
            <ellipse cx="28" cy="55" rx="6" ry="4" fill="#FFB8B8" opacity="0.6" />
            <ellipse cx="72" cy="55" rx="6" ry="4" fill="#FFB8B8" opacity="0.6" />
          </>
        )}

        {/* Whiskers */}
        <line x1="25" y1="55" x2="10" y2="50" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="58" x2="10" y2="58" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="61" x2="10" y2="66" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="75" y1="55" x2="90" y2="50" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="75" y1="58" x2="90" y2="58" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="75" y1="61" x2="90" y2="66" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
