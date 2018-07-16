import nodemailer from 'nodemailer'
import config from '../config'

const mailsend = {
  send(target, title, template, success) {
    const transporter = nodemailer.createTransport({
      host: config.SMTPhost,
      port: config.SMTPport,
      secure: true,
      auth: {
        user: config.SMTPuser,
        pass: config.SMTPpass
      }
    })
    transporter.sendMail(
      {
        from: 'blockdog_test@163.com', //mail source
        to: target, //mail arget
        subject: title, //mail title
        html: template //mail content
      },
      (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
        success()
      }
    )
  }
}
export default mailsend
