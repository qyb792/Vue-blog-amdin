const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.userInfo.avatar,
  name: state => state.user.userInfo.nickname,
  username: state => state.user.username
}
export default getters
