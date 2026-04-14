import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

async function callBackend(messages: Message[]): Promise<string> {
  const res = await fetch('/api/claude/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system: `You are a friendly conversational AI assistant.
               Keep responses concise and natural — like a real conversation.
               Max 3-4 sentences per response.
               Detect the language the user speaks and reply in the same language.
               If Hinglish, reply in Hinglish. If English, reply in English.`,
      messages,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Server error ${res.status}`)
  }

  const data = await res.json()
  return data.text
}

// WebSpeech types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string
}
interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: (e: SpeechRecognitionEvent) => void
  onerror: (e: SpeechRecognitionErrorEvent) => void
  onend: () => void
}
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export default function VoiceChat() {
  const [messages, setMessages]     = useState<Message[]>([])
  const [listening, setListening]   = useState(false)
  const [speaking, setSpeaking]     = useState(false)
  const [transcript, setTranscript] = useState('')
  const [status, setStatus]         = useState('Mic dabao aur baat karo...')
  const [error, setError]           = useState('')
  const [muted, setMuted]           = useState(false)
  const recognitionRef              = useRef<SpeechRecognition | null>(null)
  const synthRef                    = useRef(window.speechSynthesis)
  const endRef                      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      synthRef.current.cancel()
      recognitionRef.current?.stop()
    }
  }, [])

  const speak = (text: string) => {
    if (muted) return
    synthRef.current.cancel()

    // Clean text — remove markdown symbols
    const clean = text
      .replace(/```[\s\S]*?```/g, 'code block.')
      .replace(/[*_`#]/g, '')
      .trim()

    const utterance = new SpeechSynthesisUtterance(clean)

    // Pick a good voice
    const voices = synthRef.current.getVoices()
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && v.name.toLowerCase().includes('google')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0]

    if (preferred) utterance.voice = preferred
    utterance.lang  = 'en-IN'
    utterance.rate  = 1.05
    utterance.pitch = 1.0

    utterance.onstart = () => setSpeaking(true)
    utterance.onend   = () => {
      setSpeaking(false)
      setStatus('Mic dabao aur baat karo...')
    }

    synthRef.current.speak(utterance)
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Chrome use karo — voice support chahiye.')
      return
    }

    synthRef.current.cancel() // stop AI if speaking
    setSpeaking(false)

    const recognition = new SpeechRecognition()
    recognition.lang = 'hin-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = async (e: SpeechRecognitionEvent) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      setStatus('Samajh raha hoon...')
      await handleUserSpeech(text)
    }

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setError(`Mic error: ${e.error}`)
      setListening(false)
      setStatus('Mic dabao aur baat karo...')
    }

    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
    setTranscript('')
    setError('')
    setStatus('Sun raha hoon...')
  }

  const handleUserSpeech = async (text: string) => {
    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStatus('Jawab ban raha hai...')

    try {
      const result = await callBackend(newMessages)
      const aiMsg: Message = { role: 'assistant', content: result }
      setMessages(prev => [...prev, aiMsg])
      setStatus('Bol raha hoon...')
      speak(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error aaya, dobara try karo')
      setStatus('Mic dabao aur baat karo...')
    }
  }

  const stopSpeaking = () => {
    synthRef.current.cancel()
    setSpeaking(false)
    setStatus('Mic dabao aur baat karo...')
  }

  const toggleMute = () => {
    if (!muted) synthRef.current.cancel()
    setMuted(prev => !prev)
  }

  const clearChat = () => {
    synthRef.current.cancel()
    setMessages([])
    setTranscript('')
    setError('')
    setStatus('Mic dabao aur baat karo...')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p>🎙️ Voice Chat — Bolo aur sunो!</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={toggleMute}
            style={{ background: 'none', border: '1px solid #ccc', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}
          >
            {muted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
          <button
            onClick={clearChat}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'gray', fontSize: 13 }}
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '8px 4px',
        border: '1px solid #ccc',
        borderRadius: 8,
        marginBottom: 16,
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'gray', marginTop: 40, fontSize: 14 }}>
            <p>🎙️ Mic dabao aur baat shuru karo!</p>
            <p style={{ fontSize: 12, marginTop: 8 }}>Kuch bhi poochho — main sun raha hoon</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              padding: '0 8px',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            {m.role === 'assistant' && (
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: speaking && i === messages.length - 1 ? '#28a745' : '#007bff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
                transition: 'background 0.3s',
              }}>
                {speaking && i === messages.length - 1 ? '🔊' : '🤖'}
              </div>
            )}

            <div style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: m.role === 'user'
                ? '12px 12px 2px 12px'
                : '12px 12px 12px 2px',
              background: m.role === 'user' ? '#007bff' : '#f0f0f0',
              color: m.role === 'user' ? 'white' : 'black',
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {m.content}
            </div>

            {m.role === 'user' && (
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: '#6c757d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>
                👤
              </div>
            )}
          </div>
        ))}

        {/* Live transcript while listening */}
        {listening && transcript && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px' }}>
            <div style={{
              maxWidth: '75%', padding: '10px 14px',
              borderRadius: '12px 12px 2px 12px',
              background: '#cce5ff', color: '#004085',
              fontSize: 14, fontStyle: 'italic',
            }}>
              {transcript}...
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Status */}
      <div style={{ textAlign: 'center', marginBottom: 12, color: 'gray', fontSize: 13 }}>
        {status}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: 'red', fontSize: 13, textAlign: 'center', marginBottom: 8 }}>{error}</p>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>

        {/* Main Mic Button */}
        <button
          onClick={startListening}
          disabled={listening}
          style={{
            width: 70, height: 70,
            borderRadius: '50%',
            background: listening
              ? '#dc3545'
              : '#007bff',
            color: 'white',
            border: 'none',
            fontSize: 28,
            cursor: listening ? 'not-allowed' : 'pointer',
            boxShadow: listening ? '0 0 0 8px rgba(220,53,69,0.2)' : '0 4px 12px rgba(0,123,255,0.3)',
            transition: 'all 0.3s',
          }}
        >
          {listening ? '👂' : '🎤'}
        </button>

        {/* Stop Speaking */}
        {speaking && (
          <button
            onClick={stopSpeaking}
            style={{
              width: 70, height: 70,
              borderRadius: '50%',
              background: '#28a745',
              color: 'white',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              boxShadow: '0 0 0 8px rgba(40,167,69,0.2)',
              transition: 'all 0.3s',
            }}
          >
            ⏹
          </button>
        )}
      </div>

    </div>
  )
}