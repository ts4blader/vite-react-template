import { useEffect } from "react"

export const useCursorWaiting = (waiting: boolean) => {
  useEffect(() => {
    if (!document) return

    if (waiting) document.body.style.cursor = "wait"
    else document.body.style.cursor = "default"
  }, [waiting])
}
