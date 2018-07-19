import nodemailer from 'nodemailer'
import config from '../../../config'

const mailsend = {
  send(target, title, template, callback) {
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
          callback(false, error)
        } else {
          callback(true)
        }
      }
    )
  }
}
export default mailsend
