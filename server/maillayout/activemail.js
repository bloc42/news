const activemail = link => {
  return (
    '<div>' +
    '<h2>感谢您注册Block-dog</h2>' +
    '<p>请点击以下连接激活用户</p>' +
    '<p><a href=' +
    link +
    '>立即激活</a></p>' +
    '<p>如果点击没有反应,请将以下连接复制到浏览器</p>' +
    '<p>' +
    link +
    '</p>' +
    '</div>'
  )
}
export default activemail
