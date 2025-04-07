import { useContext } from "react";

import ToastContext, { ToastType } from "@/contexts/ToastContext";

type Arg = { type: ToastType, message: string, duration?: number }

export function useToast() {
  const { setTitle, setVisible, duration, setDuration, setType } = useContext(ToastContext)

  return function (arg: Arg) {
    setType(arg.type)
    setTitle(arg.message)

    if (typeof arg.duration === 'number') {
      setDuration(arg.duration)
    }

    setVisible(true)
    setTimeout(() => setVisible(false), duration)
  }

}