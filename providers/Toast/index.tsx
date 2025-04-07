import { useState } from "react"
import { ViewProps } from "react-native"

import ToastContext from "@/contexts/ToastContext"

export default function ToastProvider({ children }: ViewProps) {
  const [type, setType] = useState<'INFO' | 'SUCCESS' | 'FAIL' | 'WARNING'>('INFO')
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)
  const [duration, setDuration] = useState(2500)

  return (
    <ToastContext.Provider value={{
      title,
      setTitle,
      visible,
      setVisible,
      duration,
      setDuration,
      type,
      setType
    }}>
      {children}
    </ToastContext.Provider>
  )
}