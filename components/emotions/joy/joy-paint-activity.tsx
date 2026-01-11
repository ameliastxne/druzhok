"use client"

import React, { useState } from "react"
import { RotateCcw, Home } from "lucide-react"
import { Sunflower } from "../../shared/sunflower"

interface JoyPaintActivityProps {
  onHome: () => void
}

const paintSections = [
  // Sky - top area
  { id: 1, path: "M0,0 L100,0 L100,40 L0,40 Z", colorIndex: 1, cx: 50, cy: 20 },
  // Sun
  { id: 2, path: "M82,15 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", colorIndex: 2, cx: 82, cy: 15 },
  // Cloud
  {
    id: 3,
    path: "M20,18 Q12,12 20,8 Q30,4 40,10 Q48,6 50,14 Q52,22 40,24 Q25,26 20,18",
    colorIndex: 3,
    cx: 32,
    cy: 15,
  },
  // Grass - bottom area
  { id: 4, path: "M0,40 L100,40 L100,100 L0,100 Z", colorIndex: 4, cx: 50, cy: 70 },
  // Big flower center (middle)
  { id: 5, path: "M50,52 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0", colorIndex: 2, cx: 50, cy: 52 },
  // Big flower petal top
  { id: 6, path: "M50,35 Q42,44 50,44 Q58,44 50,35", colorIndex: 5, cx: 50, cy: 39 },
  // Big flower petal bottom
  { id: 7, path: "M50,69 Q42,60 50,60 Q58,60 50,69", colorIndex: 5, cx: 50, cy: 65 },
  // Big flower petal left
  { id: 8, path: "M33,52 Q42,44 42,52 Q42,60 33,52", colorIndex: 5, cx: 37, cy: 52 },
  // Big flower petal right
  { id: 9, path: "M67,52 Q58,44 58,52 Q58,60 67,52", colorIndex: 5, cx: 63, cy: 52 },
  // Big flower stem
  { id: 10, path: "M47,62 L47,92 L53,92 L53,62 Z", colorIndex: 6, cx: 50, cy: 77 },
  // Left small flower
  { id: 11, path: "M18,60 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", colorIndex: 7, cx: 18, cy: 60 },
  // Left small flower stem
  { id: 12, path: "M16,66 L16,90 L20,90 L20,66 Z", colorIndex: 6, cx: 18, cy: 78 },
  // Right small flower
  { id: 13, path: "M82,55 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", colorIndex: 8, cx: 82, cy: 55 },
  // Right small flower stem
  { id: 14, path: "M80,61 L80,88 L84,88 L84,61 Z", colorIndex: 6, cx: 82, cy: 75 },
  // Butterfly
  { id: 15, path: "M30,30 Q22,22 30,18 Q38,22 30,30 Q38,34 46,30 Q38,38 30,30", colorIndex: 9, cx: 34, cy: 26 },
]

const colorPalette = [
  { color: "#87CEEB", name: "Блакитний", index: 1 },
  { color: "#FFD93D", name: "Жовтий", index: 2 },
  { color: "#FFFFFF", name: "Білий", index: 3 },
  { color: "#90EE90", name: "Зелений", index: 4 },
  { color: "#FF6B6B", name: "Червоний", index: 5 },
  { color: "#228B22", name: "Темно-зелений", index: 6 },
  { color: "#FF69B4", name: "Рожевий", index: 7 },
  { color: "#FFB347", name: "Помаранчевий", index: 8 },
  { color: "#DDA0DD", name: "Фіолетовий", index: 9 },
]

export default function JoyPaintActivity({ onHome }: JoyPaintActivityProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null)
  const [filledSections, setFilledSections] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)

  const handleSectionClick = (sectionId: number) => {
    if (selectedColorIndex === null) return

    const selectedColor = colorPalette.find((c) => c.index === selectedColorIndex)
    if (!selectedColor) return

    const newFilled = { ...filledSections, [sectionId]: selectedColor.color }
    setFilledSections(newFilled)

    if (Object.keys(newFilled).length >= paintSections.length) {
      setTimeout(() => setIsComplete(true), 300)
    }
  }

  const resetPainting = () => {
    setFilledSections({})
    setSelectedColorIndex(null)
    setIsComplete(false)
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-1">Розмалюй квітковий сад!</h1>
        <p className="text-sm text-[#555] text-center mb-3">Обери колір та торкнись фігури з відповідним номером</p>

        <div className="relative w-56 h-56 md:w-64 md:h-64 bg-white rounded-2xl shadow-xl mb-3 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {paintSections.map((section) => (
              <g key={section.id}>
                <path
                  d={section.path}
                  fill={filledSections[section.id] || "#F0F0F0"}
                  stroke="#CCC"
                  strokeWidth="0.5"
                  onClick={() => handleSectionClick(section.id)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedColorIndex !== null && !filledSections[section.id] ? "hover:opacity-70" : ""
                  }`}
                />
                {!filledSections[section.id] && (
                  <text
                    x={section.cx}
                    y={section.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="6"
                    fontWeight="bold"
                    fill="#555"
                    className="pointer-events-none"
                  >
                    {section.colorIndex}
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Completion overlay */}
          {isComplete && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center animate-in fade-in duration-500">
              <span className="text-5xl mb-2">🌻</span>
              <p className="text-xl font-bold text-[#2D3436] mb-1">Чудово!</p>
              <p className="text-sm text-[#555] mb-4">Який гарний сад!</p>

              <div className="flex gap-4">
                <button
                  onClick={resetPainting}
                  className="w-12 h-12 rounded-full bg-[#FFD93D] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
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
          <p className="text-center text-[#555] mb-2 font-medium text-sm">Обери колір (номер = фігура):</p>
          <div className="flex flex-wrap justify-center gap-2">
            {colorPalette.map((item) => (
              <button
                key={item.index}
                onClick={() => setSelectedColorIndex(item.index)}
                className={`relative w-9 h-9 rounded-full transition-all duration-200 shadow-md hover:scale-110 ${
                  selectedColorIndex === item.index ? "ring-3 ring-[#5B8DEF] scale-110" : ""
                }`}
                style={{ backgroundColor: item.color }}
                title={item.name}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#2D3436] drop-shadow-sm">
                  {item.index}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-2 text-center">
          <p className="text-[#2D3436] font-medium text-sm">
            Розмальовано: {Object.keys(filledSections).length} / {paintSections.length}
          </p>
        </div>
      </div>
    </div>
  )
}
