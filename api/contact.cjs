const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' })
  }

  try {
    await resend.emails.send({
      from: 'Next Photograph <onboarding@resend.dev>',
      to: 'nahuel.lopez.11.mateo@gmail.com',
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err?.message || 'Error al enviar el mensaje.' })
  }
}
