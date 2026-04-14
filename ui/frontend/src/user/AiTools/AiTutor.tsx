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

export default function CodeExplainer() {
  const [code, setCode]       = useState('')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleExplain = async () => {
    if (!code.trim()) return
    setLoading(true)
    setOutput('')
    setError('')

    try {
      const result = await callBackend(
        'You are a friendly coding tutor who explains in Hinglish (Hindi + English mix). Be clear, concise, and use relatable examples.',
        [{
          role: 'user',
          content: `Is code ko explain karo step by step:\n\n\`\`\`\n${code}\n\`\`\`\n\n1. Ek line mein kya karta hai ye code\n2. Step-by-step explanation\n3. Ek practical example`,
        }]
      )
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kuch error aaya, dobara try karo')
    }

    setLoading(false)
  }

  return (
    <div>
      <p>Apna code paste karo — main samjhaunga step by step 🔍</p>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="// Yahan apna code paste karo..."
        rows={8}
        style={{ width: '100%' }}
      />

      <button
        onClick={handleExplain}
        disabled={loading || !code.trim()}
      >
        {loading ? 'Explaining...' : '→ Explain Karo'}
      </button>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {output && (
        <div>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}