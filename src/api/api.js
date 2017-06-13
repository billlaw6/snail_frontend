import axios from 'axios'

// let base = ''
let base = 'http://localhost:8000'

export const authLogin = params => { return axios.post(`${base}/get-token/`, params).then(res => res) }

export const authLogout = params => { return axios.post(`${base}/logout`, params).then(res => res) }

export const getUserInfo = params => { return axios.get(`${base}/user-info/`, {params: params}).then(res => res) }

export const getUserPermissions = params => { return axios.get(`${base}/user-permissions/`, {params: params}).then(res => res) }

export const getUserList = params => { return axios.get(`${base}/users/`, {params: params}).then(res => res) }

export const getExpressList = params => { return axios.get(`${base}/expresses/`, {params: params}).then(res => res) }

export const getPaymentList = params => { return axios.get(`${base}/payments/`, {params: params}).then(res => res) }

export const getOrderStatusList = params => { return axios.get(`${base}/order-status/`, {params: params}).then(res => res) }

export const removeUser = params => { return axios.delete(`${base}/users/`).then(res => res) }

// 业务数据
export const getMerchandiseList = params => { return axios.get(`${base}/merchandises/`, {params: params}).then(res => res) }
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

export const getOrderList = params => { return axios.get(`${base}/orders/`, {params: params}).then(res => res) }
// export const getOrderList = params => { return axios.get(`${base}/orders/filtered_orders/`, {params: params}).then(res => res) }
export const addOrder = params => { return axios.post(`${base}/orders/`, params).then(res => res) }
export const putOrder = params => {
  let pk = params.id
  return axios.put(`${base}/orders/${pk}/`, params).then(res => res)
}
export const patchOrder = params => {
  let pk = params.id
  return axios.patch(`${base}/orders/${pk}/`, params).then(res => res)
}

export const getExpressInfo = params => { return axios.post(`${base}/get-express-info/`, params).then(res => res) }
