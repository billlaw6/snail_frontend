import axios from 'axios'

// let base = ''
// let restbase = '/rest'
let base = `http://localhost:8000`
let restBase = `http://localhost:8000/rest`

export const authLogin = params => { return axios.post(`${base}/get-token/login/`, params).then(res => res) }

export const authLogout = params => { return axios.post(`${base}/logout`, params).then(res => res) }

export const getUserInfo = params => { return axios.get(`${base}/user-info/`, {params: params}).then(res => res) }

export const getUserPermissions = params => { return axios.get(`${restBase}/user-permissions/`, {params: params}).then(res => res) }

export const getUserList = params => { return axios.get(`${restBase}/users/`, {params: params}).then(res => res) }

export const getExpressList = params => { return axios.get(`${restBase}/expresses/`, {params: params}).then(res => res) }

export const getPaymentList = params => { return axios.get(`${restBase}/payments/`, {params: params}).then(res => res) }

export const getOrderStatusList = params => { return axios.get(`${restBase}/order-status/`, {params: params}).then(res => res) }

export const removeUser = params => { return axios.delete(`${restBase}/users/`).then(res => res) }

// 业务数据
export const getMerchandiseList = params => { return axios.get(`${restBase}/merchandises/`, {params: params}).then(res => res) }
export const getSubMerchandiseList = params => { return axios.get(`${restBase}/submerchandises/`, {params: params}).then(res => res) }
export const getMerchandiseDetail = params => {
  return axios.get(`${restBase}/merchandises/${params}/`).then(res => res)
}
export const addMerchandise = params => { return axios.post(`${restBase}/merchandises/`, params).then(res => res) }
export const putMerchandise = params => {
  let pk = params.id
  return axios.put(`${restBase}/merchandises/${pk}/`, params).then(res => res)
}
export const patchMerchandise = params => {
  let pk = params.id
  return axios.patch(`${restBase}/merchandises/${pk}/`, params).then(res => res)
}

// export const getOrderList = params => { return axios.get(`${base}/orders/`, {params: params}).then(res => res) }
export const getOrderList = params => { return axios.get(`${base}/orders/filtered_orders/`, {params: params}).then(res => res) }
// export const addOrder = params => { return axios.post(`${base}/orders/`, params).then(res => res) }
export const addOrder = params => { return axios.post(`${base}/add_order/`, params).then(res => res) }
export const putOrder = params => {
  let pk = params.id
  return axios.put(`${restBase}/orders/${pk}/`, params).then(res => res)
}
export const patchOrder = params => {
  let pk = params.id
  return axios.patch(`${restBase}/orders/${pk}/`, params).then(res => res)
}

export const getExpressInfo = params => { return axios.post(`${base}/get-express-info/`, params).then(res => res) }
export const getChinaCities = params => { return axios.get(`${base}/china/`, params).then(res => res) }
