import { Resend } from 'resend'

// In-memory rate limiter: max 3 envíos por IP por hora
const rateLimit = new Map()
const LIMIT = 3
const WINDOW = 60 * 60 * 1000

function allowed(ip) {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now - entry.first > WINDOW) {
    rateLimit.set(ip, { count: 1, first: now })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'

  if (!allowed(ip)) {
    return res.status(429).json({ error: 'Demasiados intentos. Esperá un momento.' })
  }

  const { name = '', email = '', message = '' } = req.body

  // Nombre: mínimo 2 palabras
  const nameParts = name.trim().split(/\s+/)
  if (nameParts.length < 2 || nameParts.some(p => p.length < 2)) {
    return res.status(400).json({ error: 'Ingresá nombre y apellido.' })
  }

  // Email válido
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'El email no es válido.' })
  }

  // Mensaje: entre 10 y 2000 caracteres
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'El mensaje debe tener al menos 10 caracteres.' })
  }
  if (message.trim().length > 2000) {
    return res.status(400).json({ error: 'El mensaje es demasiado largo (máx. 2000 caracteres).' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Next Photograph <onboarding@resend.dev>',
      to: 'nahuel.lopez.11.mateo@gmail.com',
      replyTo: email.trim(),
      subject: `Nuevo contacto de ${escapeHtml(name.trim())}`,
      html: `
        <p><strong>Nombre:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al enviar el mensaje. Intentá de nuevo.' })
  }
}
