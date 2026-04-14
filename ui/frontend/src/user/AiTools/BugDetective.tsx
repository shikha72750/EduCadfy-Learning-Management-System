import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

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

const SYSTEM_PROMPT = `You are Sherlock Holmes but for code bugs. 
You speak in Hinglish (Hindi + English mix).
When user gives you buggy code and error:
1. First say "Interesting..." and describe what you observe dramatically
2. Give 2-3 clues one by one like a detective 🔍
3. Ask the user "Ab tumhe kya lagta hai issue kya hai?" 
4. Only reveal the fix after user responds or asks for it
5. When giving fix, explain WHY the bug happened
Use emojis like 🔍 🕵️ 💡 ❌ ✅
Never give the answer directly on first message — always build suspense.`

export default function BugDetective() {
  const [code, setCode]           = useState('')
  const [errorMsg, setErrorMsg]   = useState('')
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [started, setStarted]     = useState(false)

  // First message — code + error submit
  const startInvestigation = async () => {
    if (!code.trim() || !errorMsg.trim()) return
    setLoading(true)
    setError('')
    setMessages([])

    const userMessage: Message = {
      role: 'user',
      content: `Mera code:\n\`\`\`\n${code}\n\`\`\`\n\nError jo aa rha hai:\n${errorMsg}`,
    }

    try {
      const result = await callBackend(SYSTEM_PROMPT, [userMessage])
      setMessages([
        userMessage,
        { role: 'assistant', content: result }
      ])
      setStarted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kuch error aaya, dobara try karo')
    }

    setLoading(false)
  }

  // Follow up messages
  const sendMessage = async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setError('')

    const userMsg: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')

    try {
      const result = await callBackend(SYSTEM_PROMPT, newMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: result }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kuch error aaya, dobara try karo')
    }

    setLoading(false)
  }

  const reset = () => {
    setCode('')
    setErrorMsg('')
    setMessages([])
    setInput('')
    setError('')
    setStarted(false)
  }

  return (
    <div>
      <p>🕵️ Buggy code aur error do — Sherlock Detective dhundega!</p>

      {!started ? (
        // Input Phase
        <div>
          <div style={{ marginBottom: 12 }}>
            <label>Apna buggy code paste karo:</label>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="// Yahan buggy code paste karo..."
              rows={8}
              style={{ width: '100%', marginTop: 6 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Error message paste karo:</label>
            <textarea
              value={errorMsg}
              onChange={e => setErrorMsg(e.target.value)}
              placeholder="e.g. TypeError: Cannot read properties of undefined..."
              rows={3}
              style={{ width: '100%', marginTop: 6 }}
            />
          </div>

          <button
            onClick={startInvestigation}
            disabled={loading || !code.trim() || !errorMsg.trim()}
          >
            {loading ? '🔍 Investigate ho raha hai...' : '🕵️ Investigation Shuru Karo'}
          </button>
        </div>
      ) : (
        // Chat Phase
        <div>
          {/* Chat History */}
          <div style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 12,
            maxHeight: 400,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user'
                    ? '12px 12px 2px 12px'
                    : '12px 12px 12px 2px',
                  background: m.role === 'user' ? '#007bff' : '#f0f0f0',
                  color: m.role === 'user' ? 'white' : 'black',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: 14,
                }}
              >
                {m.role === 'assistant' && (
                  <strong style={{ display: 'block', marginBottom: 4 }}>
                    🕵️ Detective:
                  </strong>
                )}
                {m.content}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                padding: '10px 14px',
                background: '#f0f0f0',
                borderRadius: '12px 12px 12px 2px',
                fontSize: 14,
                color: 'gray',
              }}>
                🔍 Soch raha hoon...
              </div>
            )}
          </div>

          {/* Reply Input */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Detective ko reply karo ya 'fix batao' likho..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 14,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              →
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            style={{ marginTop: 10, color: 'gray', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            🔄 Naya Bug Laao
          </button>
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: 8 }}>{error}</p>
      )}
    </div>
  )
}