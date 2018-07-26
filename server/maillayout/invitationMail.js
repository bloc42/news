const invitationMail = (sender,link) => {
  const template = `<div><h2>Hello!我们是Block42</h2><p>${sender}邀请您加入Block42</p><p><a href=${link}>立即加入</a></p><p>如果点击没有反应,请将以下连接复制到浏览器</p><p>${link}</p></div>`
  return template
}
export default invitationMail