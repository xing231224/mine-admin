/*
 * @Author: your name
 * @Date: 2020-12-10 09:52:15
 * @LastEditTime: 2021-09-23 14:43:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jw-crm\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TipsKey = 'Admin-Tips'
export function getToken() {
  return Cookies.get(TokenKey)
}
//合同添加页面
export function getTokenAdd() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//消息提醒
export function getTips() {
  return Cookies.get(TipsKey)
}

export function setTips(Tips) {
  return Cookies.set(TipsKey, Tips)
}
export function removeTips() {
  return Cookies.remove(TipsKey)
}
