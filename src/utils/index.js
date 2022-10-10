

export function getPath(userType, header) {
  let path
  if (userType) {
    // 登陆后需要判断跳转到哪个页面
    if (userType === 'boss') {
      path = 'boss'
    } else {
      path = 'mogul'
    }
    // 如果没有头像，就需要去补充信息， 没有头像直接去boss\mogul页面
    if (!header) {
      path += 'Info'
    }
  }
  return path
}