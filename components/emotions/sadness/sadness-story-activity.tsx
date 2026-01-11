"use client"

import React, { useState } from "react"
import { Sunflower } from "../../shared/sunflower"
import { Volume2, RotateCcw, Home } from "lucide-react"

interface SadnessStoryActivityProps {
  onHome: () => void
}

interface StoryPage {
  text: string
  image: string
  choices?: { text: string; nextPage: number }[]
}

const storyPages: StoryPage[] = [
  {
    text: "Маленьке тигреня Дружок сидів під деревом. Йому було сумно...",
    image: "🐯",
    choices: [{ text: "Далі", nextPage: 1 }],
  },
  {
    text: "Сльозинка скотилася по його щічці. Він сумував за своїми друзями.",
    image: "😢",
    choices: [{ text: "Далі", nextPage: 2 }],
  },
  {
    text: "Раптом прилетів маленький метелик і сів йому на носик.",
    image: "🦋",
    choices: [{ text: "Далі", nextPage: 3 }],
  },
  {
    text: '"Чому ти сумуєш, Дружку?" — запитав метелик ніжним голосом.',
    image: "💬",
    choices: [
      { text: "Хочу обійми", nextPage: 4 },
      { text: "Хочу в безпечне місце", nextPage: 5 },
    ],
  },
  {
    text: 'Метелик обняв Дружка своїми крильцями. "Все буде добре, — прошепотів він. — Я тут, поруч з тобою."',
    image: "🤗",
    choices: [{ text: "Далі", nextPage: 6 }],
  },
  {
    text: 'Метелик повів Дружка до затишної галявини, де сонечко грало на квітах. "Тут ти в безпеці," — сказав він.',
    image: "🌸",
    choices: [{ text: "Далі", nextPage: 6 }],
  },
  {
    text: "Дружок відчув тепло в серці. Він зрозумів: навіть коли сумно, поруч завжди є хтось, хто допоможе.",
    image: "💛",
    choices: [{ text: "Далі", nextPage: 7 }],
  },
  {
    text: "Сльози висохли, і на мордочці Дружка з'явилася маленька усмішка. Все буде добре!",
    image: "🌈",
    choices: [],
  },
]

export default function SadnessStoryActivity({ onHome }: SadnessStoryActivityProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const page = storyPages[currentPage]

  const goToPage = (pageNum: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage(pageNum)
      setIsAnimating(false)
    }, 300)
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "uk-UA"
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const restartStory = () => {
    setCurrentPage(0)
  }

  const isLastPage = page.choices?.length === 0

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

      <div className="max-w-2xl mx-auto flex flex-col items-center pt-24">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] text-center mb-8">Історія про Дружка</h1>

        {/* Story card */}
        <div
          className={`w-full bg-white rounded-3xl shadow-xl p-8 mb-8 transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Story image */}
          <div className="text-center mb-6">
            <span className="text-8xl">{page.image}</span>
          </div>

          {/* Story text */}
          <div className="flex items-start gap-3 mb-8">
            <p className="text-xl md:text-2xl leading-relaxed text-[#2D3436] text-center flex-1">{page.text}</p>
            <button
              onClick={() => speakText(page.text)}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#A0D8E6] hover:bg-[#8FCBD9] flex items-center justify-center transition-colors"
              title="Прослухати"
            >
              <Volume2 className="w-5 h-5 text-[#2D3436]" />
            </button>
          </div>

          {/* Choices / Continue buttons */}
          <div className="flex flex-col gap-3">
            {page.choices?.map((choice, index) => (
              <button
                key={index}
                onClick={() => goToPage(choice.nextPage)}
                className="w-full p-4 rounded-2xl bg-[#C8B6E2] text-[#2D3436] text-lg font-bold hover:bg-[#B8A6D2] transition-all duration-200 active:scale-95 shadow-md"
              >
                {choice.text}
              </button>
            ))}

            {isLastPage && (
              <div className="text-center">
                <p className="text-lg text-[#555] mb-4">Кінець історії</p>
                <div className="flex gap-6 justify-center">
                  <button
                    onClick={restartStory}
                    className="w-14 h-14 rounded-full bg-[#FFD93D] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="Ще раз"
                  >
                    <RotateCcw className="w-7 h-7 text-[#2D3436]" />
                  </button>
                  <button
                    onClick={onHome}
                    className="w-14 h-14 rounded-full bg-[#87CEEB] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="Додому"
                  >
                    <Home className="w-7 h-7 text-[#2D3436]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {storyPages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentPage ? "bg-[#5B8DEF] scale-125" : "bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
