import { createContext } from 'react'

type ToastContextProp = {
  title: string
  setTitle: (str: string) => void
  visible: boolean
  setVisible: (bool: boolean) => void
  duration: number
  setDuration: (time: number) => void
}

const ToastContext = createContext<ToastContextProp>({} as ToastContextProp)

export default ToastContext