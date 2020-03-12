import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return 'admin-token'
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
