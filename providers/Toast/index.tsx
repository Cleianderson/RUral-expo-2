import { useState } from "react"
import { ViewProps } from "react-native"

import ToastContext from "@/contexts/ToastContext"

export default function ToastProvider({ children }: ViewProps) {
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
      setDuration
    }}>
      {children}
    </ToastContext.Provider>
  )
}