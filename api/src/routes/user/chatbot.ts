import Groq from 'groq-sdk'
import { Router, Request, Response } from 'express'

const router = Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })


const MODEL = 'llama-3.3-70b-versatile'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequestBody {
  system: string
  messages: Message[]
}

router.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  const { system, messages } = req.body

  if (!system || !messages?.length) {
    return res.status(400).json({ error: 'system aur messages required hain' })
  }

  try {
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        ...messages,
      ],
      max_tokens: 1000,
    })

    const text = response.choices[0]?.message?.content?.trim() ?? ''
    res.json({ text })
  } catch (err) {
    const error = err as Error
    console.error('Groq error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

export default router