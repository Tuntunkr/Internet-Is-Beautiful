import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
})

const FROM = process.env.EMAIL_FROM || 'Internet Is Beautiful <noreply@internetisbeautiful.io>'
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

export async function sendSubmissionConfirmation(email, trackingToken, title) {
  const trackingUrl = `${BASE_URL}/track/${trackingToken}`
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: `Submission received: ${title}`,
    html: `
      <h2>Thanks for submitting to Internet Is Beautiful!</h2>
      <p>Your project "<strong>${title}</strong>" has been received and is in our review queue.</p>
      <p>Track your submission status: <a href="${trackingUrl}">${trackingUrl}</a></p>
      <p>We'll review it shortly and notify you of the outcome.</p>
      <p>— The Internet Is Beautiful Team</p>
    `,
  })
}

export async function sendNewsletterConfirmation(email, confirmToken) {
  const confirmUrl = `${BASE_URL}/confirm-newsletter?token=${confirmToken}`
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: 'Confirm your Internet Is Beautiful newsletter subscription',
    html: `
      <h2>Almost there!</h2>
      <p>Click to confirm your subscription: <a href="${confirmUrl}">Confirm</a></p>
      <p>— The Internet Is Beautiful Team</p>
    `,
  })
}
