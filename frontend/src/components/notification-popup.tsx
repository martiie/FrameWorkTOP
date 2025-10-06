"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
//   AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"
// import { Checkbox } from "../components/ui/checkbox"
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react"

interface NotificationPopupProps {
  title?: string
  message?: string
  type?: "info" | "warning" | "success" | "announcement"
  showDontShowAgain?: boolean
  autoShow?: boolean
  delay?: number
}

export default function NotificationPopup({
  title = "ยินดีต้อนรับ!",
  message = "ขอบคุณที่เข้าชมเว็บไซต์ของเรา เรามีข่าวสารและโปรโมชั่นใหม่ๆ รอคุณอยู่",
  type = "info",
  showDontShowAgain = true,
  autoShow = true,
  delay = 1000,
}: NotificationPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowAgain] = useState(false) //setDontShowAgain

  useEffect(() => {
    if (autoShow) {
      // ตรวจสอบว่าผู้ใช้เลือก "ไม่แสดงอีก" หรือไม่
      const shouldNotShow = localStorage.getItem("notification-dismissed")

      if (!shouldNotShow) {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, delay)

        return () => clearTimeout(timer)
      }
    }
  }, [autoShow, delay])

  const handleClose = () => {
    setIsOpen(false)

    if (dontShowAgain) {
      localStorage.setItem("notification-dismissed", "true")
    }
  }

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "announcement":
        return <Bell className="h-6 w-6 text-blue-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getColorScheme = () => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "announcement":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className={`max-w-md ${getColorScheme()}`}>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              {getIcon()}
              <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-700 leading-relaxed">{message}</AlertDialogDescription>
          </AlertDialogHeader>

          {showDontShowAgain && (
            <div className="flex items-center space-x-2 px-1">
              {/* <Checkbox
                id="dont-show"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label htmlFor="dont-show" className="text-sm text-gray-600 cursor-pointer">
                ไม่แสดงข้อความนี้อีก
              </label> */}
            </div>
          )}

          <AlertDialogFooter className="gap-2">
            {/* <AlertDialogCancel onClick={handleClose}>ปิด</AlertDialogCancel> */}
            <AlertDialogAction onClick={handleClose}>รับทราบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
