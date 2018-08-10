const invitationMail = (sender, link) => {
  const template = `<div><h2>Hello!我们是Bloc42</h2><p>${sender}邀请您加入Bloc42</p><p><a href=${link}>立即加入</a></p><p>如果点击没有反应,请将以下连接复制到浏览器</p><p>${link}</p></div>`
  return template
}
export default invitationMail
