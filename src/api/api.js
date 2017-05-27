import axios from 'axios'

// let base = ''
let base = 'http://localhost:8000'

export const authLogin = params => { return axios.post(`${base}/get-token/`, params).then(res => res) }

export const authLogout = params => { return axios.post(`${base}/logout`, params).then(res => res) }

export const getUserInfo = params => { return axios.get(`${base}/user-info/`).then(res => res) }

export const getUserPermissions = params => { return axios.get(`${base}/user-permissions/`).then(res => res) }

export const getUserList = params => { return axios.get(`${base}/users/`).then(res => res) }

export const removeUser = params => { return axios.delete(`${base}/users/`).then(res => res) }

// 业务数据
export const getMerchandiseList = params => { return axios.get(`${base}/merchandises/`).then(res => res) }
export const addMerchandise = params => { return axios.post(`${base}/merchandises/`, params).then(res => res) }
export const putMerchandise = params => {
  // let pk = params.id
  let pk = 1
  return axios.put(`${base}/merchandises/${pk}/`, params).then(res => res)
}
export const patchMerchandise = params => {
  let pk = params.id
  return axios.patch(`${base}/merchandises/${pk}/`, params).then(res => res)
}

export const getOrderList = params => { return axios.get(`${base}/orders/`).then(res => res) }
export const addOrder = params => { return axios.post(`${base}/orders/`, params).then(res => res) }
export const putOrder = params => {
  // let pk = params.id
  let pk = 1
  return axios.put(`${base}/orders/${pk}/`, params).then(res => res)
}
export const patchOrder = params => {
  let pk = params.id
  return axios.patch(`${base}/orders/${pk}/`, params).then(res => res)
}

