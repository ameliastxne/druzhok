"use client"

import React, { useState } from "react"
import { UserProfileDropdown } from "./../shared/user-profile-dropdown"
import { Home, Bell, Mail, AlertTriangle, Clock, BarChart3 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface AccountPageProps {
  onHome: () => void
  onNavigate: (page: "account" | "parental-settings") => void
}

export default function AccountPage({ onHome, onNavigate }: AccountPageProps) {
  const [emailFrequency, setEmailFrequency] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [pushNotifications, setPushNotifications] = useState(true)
  const [safetyAlerts, setSafetyAlerts] = useState(true)
  const [activityLogging, setActivityLogging] = useState(true)
  const [quietHours, setQuietHours] = useState(false)
  const [summaryCharts, setSummaryCharts] = useState(true)

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

      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3436] bg-[#FFE066] px-8 py-3 rounded-full shadow-md">
            Обліковий запис
          </h1>
        </div>

        {/* Child Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2D3436] mb-4">Профіль дитини</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-[#636e72] font-medium">Ім'я</span>
              <span className="text-[#2D3436] font-semibold">Борис Петров</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-[#636e72] font-medium">Вік</span>
              <span className="text-[#2D3436] font-semibold">7 років</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[#636e72] font-medium">Мова</span>
              <span className="text-[#2D3436] font-semibold">Російська</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2D3436] mb-4">Налаштування сповіщень</h2>

          {/* Email Frequency */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-[#6D4C41]" />
              <span className="text-[#2D3436] font-medium">Надсилати підсумкові листи</span>
            </div>
            <div className="flex gap-2 ml-8">
              {(["daily", "weekly", "monthly"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setEmailFrequency(freq)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    emailFrequency === freq
                      ? "bg-[#A0D8E6] text-[#2D3436]"
                      : "bg-gray-100 text-[#636e72] hover:bg-gray-200"
                  }`}
                >
                  {freq === "daily" ? "Щодня" : freq === "weekly" ? "Щотижня" : "Щомісяця"}
                </button>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#6D4C41]" />
              <div>
                <span className="text-[#2D3436] font-medium block">Push-сповіщення</span>
                <span className="text-sm text-[#636e72]">Емоція дитини щодня</span>
              </div>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          {/* Safety Alerts */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#e17055]" />
              <div>
                <span className="text-[#2D3436] font-medium block">Сповіщення про безпеку</span>
                <span className="text-sm text-[#636e72]">Автоматичні сповіщення при виявленні занепокоєння</span>
              </div>
            </div>
            <Switch checked={safetyAlerts} onCheckedChange={setSafetyAlerts} />
          </div>

          {/* Activity Logging */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-[#6D4C41]" />
              <div>
                <span className="text-[#2D3436] font-medium block">Журнал активності</span>
                <span className="text-sm text-[#636e72]">Записувати всі дії в додатку</span>
              </div>
            </div>
            <Switch checked={activityLogging} onCheckedChange={setActivityLogging} />
          </div>

          {/* Quiet Hours */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#6D4C41]" />
              <div>
                <span className="text-[#2D3436] font-medium block">Тихі години</span>
                <span className="text-sm text-[#636e72]">Вимкнути сповіщення вночі</span>
              </div>
            </div>
            <Switch checked={quietHours} onCheckedChange={setQuietHours} />
          </div>

          {/* Summary Charts */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-[#6D4C41]" />
              <div>
                <span className="text-[#2D3436] font-medium block">Підсумкові графіки</span>
                <span className="text-sm text-[#636e72]">Візуальний огляд емоцій та вправ</span>
              </div>
            </div>
            <Switch checked={summaryCharts} onCheckedChange={setSummaryCharts} />
          </div>
        </div>
      </div>
    </div>
  )
}
