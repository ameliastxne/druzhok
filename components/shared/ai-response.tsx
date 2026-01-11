"use client"

import { useState, useEffect } from "react"
import type { Emotion } from "@/app/page"
import { UserProfileDropdown } from "./user-profile-dropdown"
import { Sunflower } from "./sunflower"
import { Send, Volume2, Mic, Home } from "lucide-react"

interface AIResponseProps {
  emotion: Emotion
  onChoice: (choice: "activity" | "done" | "continue") => void
  onHome: () => void
  onNavigate: (page: "account" | "parental-settings") => void
}

interface Message {
  sender: "tiger" | "child"
  text: string
}

const emotionResponses: Record<Emotion, string> = {
  joy: "Як чудово, що тобі так весело! Радість — це як сонечко всередині нас. Хочеш поділитися своєю радістю через веселу вправу?",
  sadness:
    "Я розумію, що тобі сумно. Іноді плакати — це нормально, і це допомагає нам почуватися краще. Я тут, щоб тебе підтримати. Хочеш спробувати щось разом?",
  anger:
    "Це нормально злитися, коли навколо тебе відбуваються несправедливі або страшні речі. Іноді, коли ми про це говоримо, стає трохи легше. Хочеш спробувати щось разом?",
  fear: "Страх — це те, що допомагає нам бути обережними. Але коли він занадто сильний, ми можемо навчитися його заспокоювати. Хочеш спробувати?",
  disgust:
    "Я розумію, що тобі щось не подобається. Це нормально мати такі почуття. Давай разом подумаємо, як зробити так, щоб тобі стало краще?",
}

const followUpResponses = [
  "Дякую, що ділишся зі мною. Я тут, щоб слухати тебе. Розкажи більше, якщо хочеш.",
  "Я розумію тебе. Твої почуття важливі. Що ще ти хотів би сказати?",
  "Ти дуже сміливий, що говориш про це. Я завжди тут для тебе.",
]

export default function AIResponse({ emotion, onChoice, onHome, onNavigate }: AIResponseProps) {
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState("")
  const [replyText, setReplyText] = useState("")
  const [isContinueMode, setIsContinueMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentTypingMessage, setCurrentTypingMessage] = useState("")

  const fullText = emotionResponses[emotion]

  useEffect(() => {
    if (isTyping && messages.length === 0) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 25)

      return () => clearInterval(typingInterval)
    }
  }, [fullText, isTyping, messages.length])

  const handleSendMessage = () => {
    if (!replyText.trim()) return

    const newMessages: Message[] = [...messages, { sender: "child", text: replyText }]
    setMessages(newMessages)
    setReplyText("")

    setIsTyping(true)
    setCurrentTypingMessage("")

    const responseText = followUpResponses[Math.floor(Math.random() * followUpResponses.length)]
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= responseText.length) {
        setCurrentTypingMessage(responseText.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        setMessages([...newMessages, { sender: "tiger", text: responseText }])
        setCurrentTypingMessage("")
        clearInterval(typingInterval)
      }
    }, 25)
  }

  const handleContinueChat = () => {
    setIsContinueMode(true)
    setMessages([{ sender: "tiger", text: fullText }])
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
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

      <div className="max-w-4xl mx-auto pt-20">
        <div className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="max-h-[400px] overflow-y-auto mb-6 space-y-4">
            {!isContinueMode && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="/images/tiger-profile.png"
                    alt="Дружок"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-[#2D3436]">Дружок</span>
                    <button
                      onClick={() => speakMessage(fullText)}
                      className="w-8 h-8 rounded-full bg-[#E8F4F8] flex items-center justify-center hover:bg-[#D8E8EE] transition-colors"
                    >
                      <Volume2 size={16} className="text-[#5B8DEF]" />
                    </button>
                  </div>
                  <div className="bg-[#E8F4F8] rounded-2xl rounded-tl-md p-4 md:p-5">
                    <p className="text-lg md:text-xl leading-relaxed text-[#2D3436]">
                      {displayedText}
                      {isTyping && <span className="animate-pulse text-[#5B8DEF]">|</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isContinueMode &&
              messages.map((message, index) => (
                <div key={index} className={`flex gap-4 ${message.sender === "child" ? "flex-row-reverse" : ""}`}>
                  {message.sender === "tiger" ? (
                    <>
                      <div className="flex-shrink-0">
                        <img
                          src="/images/tiger-profile.png"
                          alt="Дружок"
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 max-w-[80%]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-[#2D3436]">Дружок</span>
                          <button
                            onClick={() => speakMessage(message.text)}
                            className="w-7 h-7 rounded-full bg-[#E8F4F8] flex items-center justify-center hover:bg-[#D8E8EE] transition-colors"
                          >
                            <Volume2 size={14} className="text-[#5B8DEF]" />
                          </button>
                        </div>
                        <div className="bg-[#E8F4F8] rounded-2xl rounded-tl-md p-4">
                          <p className="text-lg leading-relaxed text-[#2D3436]">{message.text}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#FFD93D] flex items-center justify-center shadow-md">
                          <Sunflower size={32} />
                        </div>
                      </div>
                      <div className="flex-1 max-w-[80%]">
                        <div className="flex items-center gap-2 mb-2 justify-end">
                          <span className="font-bold text-[#2D3436]">Борис</span>
                        </div>
                        <div className="bg-[#FFD93D] rounded-2xl rounded-tr-md p-4">
                          <p className="text-lg leading-relaxed text-[#2D3436]">{message.text}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

            {isContinueMode && isTyping && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="/images/tiger-profile.png"
                    alt="Дружок"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md"
                  />
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[#2D3436]">Дружок</span>
                  </div>
                  <div className="bg-[#E8F4F8] rounded-2xl rounded-tl-md p-4">
                    <p className="text-lg leading-relaxed text-[#2D3436]">
                      {currentTypingMessage}
                      <span className="animate-pulse text-[#5B8DEF]">|</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isTyping && !isContinueMode && (
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleContinueChat}
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#C8B6E2] text-[#2D3436] shadow-md hover:shadow-lg hover:bg-[#B8A6D2] transition-all duration-200 active:scale-95"
              >
                <span className="text-2xl">💬</span>
                <span className="text-lg font-bold whitespace-nowrap">Продовжити розмову</span>
              </button>

              <button
                onClick={() => onChoice("activity")}
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#FFF3B0] text-[#2D3436] shadow-md hover:shadow-lg hover:bg-[#FFE98A] transition-all duration-200 active:scale-95"
              >
                <span className="text-2xl">🎮</span>
                <span className="text-lg font-bold whitespace-nowrap">Пограймо разом</span>
              </button>

              <button
                onClick={() => onChoice("done")}
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#87CEEB] text-[#2D3436] shadow-md hover:shadow-lg hover:bg-[#7AC0DD] transition-all duration-200 active:scale-95"
              >
                <span className="text-2xl">🏠</span>
                <span className="text-lg font-bold whitespace-nowrap">На сьогодні досить</span>
              </button>
            </div>
          )}

          {isContinueMode && !isTyping && (
            <>
              <div className="relative mb-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Напиши відповідь..."
                  className="w-full min-h-[80px] p-4 pr-28 text-lg border-2 border-[#E0E0E0] rounded-2xl focus:border-[#5B8DEF] focus:outline-none resize-none"
                />
                <button className="absolute bottom-4 right-16 w-10 h-10 rounded-full bg-[#E8F4F8] text-[#5B8DEF] flex items-center justify-center hover:bg-[#D8E8EE] transition-colors">
                  <Mic size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#5B8DEF] text-white flex items-center justify-center hover:bg-[#4A7CD9] transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => onChoice("activity")}
                  className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#FFF3B0] text-[#2D3436] shadow-md hover:shadow-lg hover:bg-[#FFE98A] transition-all duration-200 active:scale-95"
                >
                  <span className="text-2xl">🎮</span>
                  <span className="text-lg font-bold whitespace-nowrap">Пограймо разом</span>
                </button>

                <button
                  onClick={() => onChoice("done")}
                  className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#87CEEB] text-[#2D3436] shadow-md hover:shadow-lg hover:bg-[#7AC0DD] transition-all duration-200 active:scale-95"
                >
                  <span className="text-2xl">🏠</span>
                  <span className="text-lg font-bold whitespace-nowrap">На сьогодні досить</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
