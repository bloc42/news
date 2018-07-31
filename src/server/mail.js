import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import R from 'ramda'
import config from '../config'

const transporter = nodemailer.createTransport(
  mg({
    auth: {
      api_key: config.mailApiKey,
      domain: config.mailDomain
    }
  })
)

class Mailer {
  static async send(mailOptions) {
    const mergedOptions = R.merge(
      {
        from: 'postmaster@bloc42.com'
      },
      mailOptions
    )

    try {
      const info = await transporter.sendMail(mergedOptions)
      console.log(info)
    } catch (err) {
      console.log(err)
    }
  }
}
export default Mailer
