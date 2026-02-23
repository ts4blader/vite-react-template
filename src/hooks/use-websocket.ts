import { useCallback, useEffect, useRef, useState } from "react"

export interface UseWebSocketOptions {
  onOpen?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
  onError?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
  shouldReconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export interface UseWebSocketReturn {
  ws: WebSocket | null
  send: (data: string | object) => void
  close: () => void
  isConnected: boolean
  error: Event | null
  reconnectAttempts: number
}

export function useWebSocket(
  url: string,
  options: UseWebSocketOptions = {},
): UseWebSocketReturn {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Event | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<number | null>(null)
  const optionsRef = useRef(options)

  // Update ref when options change
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const send = useCallback((data: string | object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message = typeof data === "string" ? data : JSON.stringify(data)
      wsRef.current.send(message)
    } else {
      console.warn("WebSocket is not connected. Message not sent:", data)
    }
  }, [])

  const close = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setWs(null)
    setIsConnected(false)
    setReconnectAttempts(0)
  }, [])

  const connect = useCallback(() => {
    try {
      const websocket = new WebSocket(url)
      wsRef.current = websocket

      websocket.onopen = (event) => {
        setIsConnected(true)
        setError(null)
        setReconnectAttempts(0)
        optionsRef.current.onOpen?.(event)
      }

      websocket.onmessage = (event) => {
        optionsRef.current.onMessage?.(event)
      }

      websocket.onerror = (event) => {
        setError(event)
        optionsRef.current.onError?.(event)
      }

      websocket.onclose = (event) => {
        setIsConnected(false)
        setWs(null)
        wsRef.current = null
        optionsRef.current.onClose?.(event)

        // Reconnect logic
        if (
          optionsRef.current.shouldReconnect &&
          !event.wasClean &&
          reconnectAttempts < (optionsRef.current.maxReconnectAttempts ?? 5)
        ) {
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempts((prev) => prev + 1)
          }, optionsRef.current.reconnectInterval ?? 3000)
        }
      }

      setWs(websocket)
    } catch (err) {
      console.error("Failed to create WebSocket connection:", err)
    }
  }, [url, reconnectAttempts])

  // Initial connection
  useEffect(() => {
    // Use setTimeout to avoid setState in effect
    setTimeout(() => connect(), 0)
    return () => {
      close()
    }
  }, [connect, close])

  // Handle reconnection attempts
  useEffect(() => {
    const maxAttempts = optionsRef.current.maxReconnectAttempts ?? 5
    if (reconnectAttempts > 0 && reconnectAttempts < maxAttempts) {
      // Use setTimeout to avoid setState in effect
      setTimeout(() => connect(), 0)
    }
  }, [reconnectAttempts, connect])

  return {
    ws,
    send,
    close,
    isConnected,
    error,
    reconnectAttempts,
  }
}
