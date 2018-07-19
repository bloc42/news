import mailsend from './mail'

const api = {
  async sendMail(email, type, url) {
    return new Promise(async (resolve, reject) => {
      if (email) {
        const template =
          '<div><h2>感谢您注册Block-dog</h2><p>请点击以下连接激活用户</p><p><a href="' +
          url +
          '">立即激活</a></p><p>如果点击没有反应,请将以下连接复制到浏览器</p><p>' +
          url +
          '</p></div>'
        const title = 'test'
        mailsend.send(email, title, template, (res, info) => {
          if (res == true) {
            resolve('发送成功')
          } else {
            //todo change active_deadline to resend mail
            reject('发送邮件失败,请重新发送')
          }
        })
      } else {
        //todo
        reject('发送邮件失败,请重新填写邮箱')
      }
    })
  }
}

export default api
