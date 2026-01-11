"use client"

import React, { useState } from "react"
import { UserProfileDropdown } from "./../shared/user-profile-dropdown"
import { Home, Download, ArrowUpDown, Filter } from "lucide-react"

interface ParentalSettingsPageProps {
  onHome: () => void
  onNavigate: (page: "account" | "parental-settings") => void
}

type SortField = "date" | "emotion" | "duration" | "activities"
type SortDirection = "asc" | "desc"

const activityData = [
  { date: "5 жовтня 2025 р. о 14:30", emotion: "Гнів", emotionId: "anger", duration: "7хв 0с", activities: 2 },
  { date: "12 жовтня 2025 р. о 10:15", emotion: "Страх", emotionId: "fear", duration: "5хв 15с", activities: 1 },
  { date: "18 жовтня 2025 р. о 16:45", emotion: "Печаль", emotionId: "sadness", duration: "8хв 30с", activities: 3 },
  { date: "23 жовтня 2025 р. о 11:20", emotion: "Радість", emotionId: "joy", duration: "4хв 0с", activities: 0 },
  { date: "28 жовтня 2025 р. о 15:10", emotion: "Гнів", emotionId: "anger", duration: "6хв 30с", activities: 1 },
]

const emotionColors: Record<string, string> = {
  anger: "bg-red-100 text-red-700",
  fear: "bg-purple-100 text-purple-700",
  sadness: "bg-blue-100 text-blue-700",
  joy: "bg-yellow-100 text-yellow-700",
  disgust: "bg-green-100 text-green-700",
}

export default function ParentalSettingsPage({ onHome, onNavigate }: ParentalSettingsPageProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterEmotion, setFilterEmotion] = useState<string>("all")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredData = activityData.filter((item) => filterEmotion === "all" || item.emotionId === filterEmotion)

  const handleDownload = (date: string) => {
    // Prototype - no actual download
    alert(`Завантаження журналу за ${date}`)
  }

  const handleDownloadAll = () => {
    // Prototype - no actual download
    alert("Завантаження всіх журналів розмов")
  }

  return (
    <div className="min-h-screen w-full bg-[#A0D8E6] p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <UserProfileDropdown onNavigate={onNavigate} />
        <button
          onClick={onHome}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <Home className="w-6 h-6 text-[#2D3436]" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] bg-[#FFE066] px-8 py-3 rounded-full shadow-md">
            Батьківські налаштування
          </h1>
        </div>

        {/* Activity Table Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Activity Log Title */}
            <h2 className="text-lg md:text-xl font-bold text-[#2D3436] bg-[#A0D8E6] px-6 py-2 rounded-full shadow-sm">
              Журнал активності дитини
            </h2>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 px-4 py-2 bg-[#A0D8E6] text-[#2D3436] rounded-full font-medium hover:bg-[#8bc9db] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Завантажити все</span>
            </button>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#636e72]" />
            <span className="text-[#636e72] font-medium">Фільтр:</span>
            <select
              value={filterEmotion}
              onChange={(e) => setFilterEmotion(e.target.value)}
              className="px-4 py-2 rounded-full bg-gray-100 text-[#2D3436] font-medium border-none focus:ring-2 focus:ring-[#A0D8E6] outline-none"
            >
              <option value="all">Усі емоції</option>
              <option value="joy">Радість</option>
              <option value="sadness">Печаль</option>
              <option value="anger">Гнів</option>
              <option value="fear">Страх</option>
              <option value="disgust">Відраза</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th
                    className="text-left py-3 px-4 text-[#636e72] font-semibold cursor-pointer hover:text-[#2D3436] transition-colors"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-2">
                      Дата
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-4 text-[#636e72] font-semibold cursor-pointer hover:text-[#2D3436] transition-colors"
                    onClick={() => handleSort("emotion")}
                  >
                    <div className="flex items-center gap-2">
                      Емоція
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-[#636e72] font-semibold">Журнал розмов</th>
                  <th
                    className="text-left py-3 px-4 text-[#636e72] font-semibold cursor-pointer hover:text-[#2D3436] transition-colors"
                    onClick={() => handleSort("duration")}
                  >
                    <div className="flex items-center gap-2">
                      Тривалість
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-4 text-[#636e72] font-semibold cursor-pointer hover:text-[#2D3436] transition-colors"
                    onClick={() => handleSort("activities")}
                  >
                    <div className="flex items-center gap-2">
                      Вправи
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-[#2D3436]">{row.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${emotionColors[row.emotionId]}`}>
                        {row.emotion}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDownload(row.date)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-[#636e72] rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Завантажити
                      </button>
                    </td>
                    <td className="py-4 px-4 text-[#2D3436]">{row.duration}</td>
                    <td className="py-4 px-4 text-[#2D3436]">{row.activities} раз(и)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-[#636e72]">Немає даних для відображення</div>
          )}
        </div>
      </div>
    </div>
  )
}
