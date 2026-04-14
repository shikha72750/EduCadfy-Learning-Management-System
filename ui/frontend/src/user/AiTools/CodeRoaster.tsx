import { useState, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM = `You are a savage but loving code roaster who speaks in Hinglish (Hindi + English mix).
When user gives you code:

PART 1 — ROAST:
- Roast the code HARD like a comedy roast show
- Be funny, dramatic, savage but not mean
- Point out every bad practice, weird naming, messy logic
- Use funny comparisons like "ye code dekh ke meri aankhen ro rahi hain"
- Use emojis aggressively

PART 2 — REDEMPTION ARC:
- Say "Chalo, ab theek karte hain isse..."
- Give the improved, clean version of the code
- Explain what you fixed and why in Hinglish
- End with encouragement like a proud coach

IMPORTANT: Separate the two parts with the exact marker: ===REDEMPTION===
Keep it entertaining — Bollywood drama style!`

async function callBackend(system: string, messages: Message[]): Promise<string> {
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

function getMaleVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null

  const malePriority: ((v: SpeechSynthesisVoice) => boolean)[] = [
    v => v.name.toLowerCase().includes('male') && v.lang.startsWith('hi'),
    v => v.name.toLowerCase().includes('hemant'),
    v => !v.name.toLowerCase().includes('kalpana') && v.lang === 'hi-IN',
    v => v.name.toLowerCase().includes('male') && v.lang.startsWith('en'),
    v => ['david', 'mark', 'daniel', 'fred', 'alex', 'rishi', 'aaron', 'arthur', 'thomas'].some(
      m => v.name.toLowerCase().includes(m)
    ),
    v => !v.name.toLowerCase().match(/female|woman|girl|zira|susan|karen|victoria|samantha|moira|fiona|tessa|veena|neerja|heera/)
  ]

  for (const test of malePriority) {
    const found = voices.find(test)
    if (found) return found
  }
  return voices[0]
}

export default function CodeRoast() {
  const [code, setCode]         = useState('')
  const [roastText, setRoastText] = useState('')
  const [fixText, setFixText]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [copied, setCopied]     = useState(false)
  const [speaking, setSpeaking] = useState<'roast' | 'fix' | null>(null)
  const [rate, setRate]         = useState(1)
  const [voiceName, setVoiceName] = useState('Detect ho raha hai...')

  useEffect(() => {
    const update = () => {
      const v = getMaleVoice()
      setVoiceName(v ? `${v.name} (${v.lang})` : 'Default browser voice')
    }
    speechSynthesis.onvoiceschanged = update
    setTimeout(update, 500)
    return () => { speechSynthesis.onvoiceschanged = null }
  }, [])

  const handleRoast = async () => {
    if (!code.trim()) return
    setLoading(true)
    setRoastText('')
    setFixText('')
    setError('')
    setCopied(false)
    stopSpeech()

    try {
      const result = await callBackend(SYSTEM, [{
        role: 'user',
        content: `Mera code roast karo:\n\n\`\`\`\n${code}\n\`\`\``,
      }])

      const parts = result.split('===REDEMPTION===')
      setRoastText((parts[0] || result).trim())
      setFixText((parts[1] || '').trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kuch error aaya, dobara try karo')
    }

    setLoading(false)
  }

  const stopSpeech = () => {
    speechSynthesis.cancel()
    setSpeaking(null)
  }

  const speakSection = (section: 'roast' | 'fix') => {
    if (speaking === section) {
      stopSpeech()
      return
    }
    stopSpeech()

    const text = section === 'roast' ? roastText : fixText
    const voice = getMaleVoice()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = rate
    utter.pitch = 0.85
    utter.lang = voice?.lang || 'hi-IN'
    if (voice) utter.voice = voice

    utter.onstart = () => setSpeaking(section)
    utter.onend = () => setSpeaking(null)
    utter.onerror = () => setSpeaking(null)

    speechSynthesis.speak(utter)
  }

  const copyFixed = () => {
    const match = fixText.match(/```[\w]*\n([\s\S]*?)```/)
    const toCopy = match ? match[1] : fixText
    navigator.clipboard.writeText(toCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setCode('')
    setRoastText('')
    setFixText('')
    setError('')
    setCopied(false)
    stopSpeech()
  }

  const hasResult = roastText || fixText

  return (
    <div>
      <p>Apna code do — ek mard ki awaaz mein roast sunoge!</p>

      <div style={{ marginBottom: 12 }}>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="// Himmat hai toh code paste karo... 😈"
          rows={8}
          style={{ width: '100%', fontFamily: 'monospace' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={handleRoast} disabled={loading || !code.trim()}>
          {loading ? '🔥 Roast ho raha hai...' : '🔥 Roast Karo Mujhe'}
        </button>
        {hasResult && (
          <button onClick={reset} style={{ color: 'gray', background: 'none', border: 'none', cursor: 'pointer' }}>
            🔄 Naya Code Laao
          </button>
        )}
      </div>

      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}

      {/* Voice info */}
      <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
        🎙 Awaaz: {voiceName}
      </p>

      {/* Speed control */}
      {hasResult && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <label style={{ fontSize: 13 }}>Speed:</label>
          <select value={rate} onChange={e => setRate(parseFloat(e.target.value))}>
            <option value={0.8}>0.8x</option>
            <option value={1}>1x</option>
            <option value={1.2}>1.2x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
      )}

      {/* Roast Section */}
      {roastText && (
        <div style={{
          background: '#fff3f3', border: '1px solid #ffcccc',
          borderRadius: 8, padding: 16, marginTop: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ color: '#cc0000' }}>🔥 Roast:</strong>
            <button onClick={() => speakSection('roast')}>
              {speaking === 'roast' ? '🔇 Band Karo' : '🔊 Sunao Roast'}
            </button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 14, lineHeight: 1.7, color: '#333' }}>
            {roastText}
          </pre>
        </div>
      )}

      {/* Redemption Section */}
      {fixText && (
        <div style={{
          background: '#f3fff3', border: '1px solid #ccffcc',
          borderRadius: 8, padding: 16, marginTop: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ color: '#006600' }}>✨ Redemption Arc:</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={copyFixed}>
                {copied ? '✅ Copied!' : '📋 Fixed Code Copy Karo'}
              </button>
              <button onClick={() => speakSection('fix')}>
                {speaking === 'fix' ? '🔇 Band Karo' : '🔊 Sunao Fix'}
              </button>
            </div>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 14, lineHeight: 1.7, color: '#333' }}>
            {fixText}
          </pre>
        </div>
      )}
    </div>
  )
}