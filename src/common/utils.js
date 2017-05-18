//
export const checkLoginStatus = () => {
  const accessToken = window.sessionStorage.getItem('accessToken')
  const user = window.sessionStorage.getItem('user')
  if (accessToken && user) {
    return true
  } else {
    return false
  }
}

