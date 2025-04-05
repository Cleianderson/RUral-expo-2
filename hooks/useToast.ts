import { useContext } from "react";

import ToastContext from "@/contexts/ToastContext";

type Arg = { type: 'SUCCESS' | 'FAIL', message: string, duration?: number }

export function useToast() {
  const { setTitle, setVisible, duration, setDuration } = useContext(ToastContext)

  return function (arg: Arg) {
    setVisible(true)
    setTitle(arg.message)

    if (typeof arg.duration === 'number') {
      setDuration(arg.duration)
    }

    setTimeout(() => setVisible(false), duration)
  }

}