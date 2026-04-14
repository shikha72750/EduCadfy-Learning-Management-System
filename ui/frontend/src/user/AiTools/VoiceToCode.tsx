import { useState, useRef } from 'react'

async function callBackend(system: string, messages: { role: 'user' | 'assistant', content: string }[]): Promise<string> {
  const res = await fetch('/api/claude/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, messages }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Server error ${res.status}`)
  }

  const data = await res.json()
  return data.text
}

// WebSpeech API types
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

export default function VoiceToCode() {
  const [listening, setListening]     = useState(false)
  const [transcript, setTranscript]   = useState('')
  const [code, setCode]               = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const recognitionRef                = useRef<SpeechRecognition | null>(null)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Tera browser voice support nahi karta. Chrome use karo.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN' // Hindi + English dono samjhega
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
    }

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setError(`Mic error: ${e.error}`)
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
    setError('')
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const generateCode = async () => {
    if (!transcript.trim()) return
    setLoading(true)
    setCode('')
    setError('')

    try {
      const result = await callBackend(
        `You are an expert code generator. 
         User will describe what they want in Hinglish (Hindi + English mix).
         Generate clean, working code with comments in Hinglish.
         Return ONLY the code block, no extra explanation.`,
        [{
          role: 'user',
          content: `Generate code for this: "${transcript}"`,
        }]
      )
      setCode(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kuch error aaya, dobara try karo')
    }

    setLoading(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div>
      <p>🎤 Bolo kya banana hai — main code banaunga</p>

      {/* Mic Button */}
      <button
        onClick={listening ? stopListening : startListening}
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: listening ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 16,
        }}
      >
        {listening ? '⏹ Stop' : '🎤Speak'}
      </button>

      {/* Live transcript */}
      {listening && (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>
          Sun raha hoon...
        </p>
      )}

      {/* Transcript output */}
      {transcript && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Tumne kaha:</strong></p>
          <p style={{ 
            background: '#f5f5f5', 
            padding: 12, 
            borderRadius: 8,
            fontStyle: 'italic'
          }}>
            "{transcript}"
          </p>

          <button
            onClick={generateCode}
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? 'Code ban raha hai...' : '→ Code Banao'}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: 'red', marginTop: 8 }}>{error}</p>
      )}

      {/* Generated Code */}
      {code && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Generated Code:</strong>
            <button onClick={copyCode}>📋 Copy</button>
          </div>
          <pre style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: 16,
            borderRadius: 8,
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            marginTop: 8,
          }}>
            {code}
          </pre>

          {/* Regenerate */}
          <button
            onClick={generateCode}
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            🔄 Dobara Banao
          </button>
        </div>
      )}
    </div>
  )
}