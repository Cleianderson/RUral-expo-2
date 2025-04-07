import { createContext } from 'react'

export type ToastType = 'INFO' | 'SUCCESS' | 'FAIL' | 'WARNING'
type ToastContextProp = {
  title: string
  setTitle: (str: string) => void
  visible: boolean
  setVisible: (bool: boolean) => void
  duration: number
  setDuration: (time: number) => void
  type: ToastType
  setType: (type: ToastType) => void
}

const ToastContext = createContext<ToastContextProp>({} as ToastContextProp)

export default ToastContext