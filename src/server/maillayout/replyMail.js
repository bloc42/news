const replyMail = (link, posttitle, replyfrom) => {
  const template = `<div><h2>Hello!这里是唠嗑</h2><p>您在"${posttitle}"一文中收到了${replyfrom}的回复!</p><p><a href=${link}>点击查看</a></p><p>如果点击没有反应,请将以下连接复制到浏览器</p><p>${link}</p></div>`
  return template
}
export default replyMail
