import Vue from 'vue'
import router from '../router'
import Cookies from 'js-cookie'
import VueJsonp from 'vue-jsonp'
const url = window.location.hostname
Vue.use(VueJsonp)
var jsonpUrl = 'http://114.55.174.64:9999/auth/sso/token/login'
var jsonpOut = 'http://114.55.174.64:9999/auth/sso/token/logout'
const TokenKey = 'Admin-Token'
export function getJurisdiction(token, type) {
  var Url = ''
  if (type === 'out') {
    Url = jsonpOut
  } else {
    Url = jsonpUrl
  }
  Vue.jsonp(Url, {
    token: token
  }).then((res) => {
    if (res.status === '200') {
      if (type === 'out') {
        location.reload()
      } else {
        Cookies.set(TokenKey, res.msg)
        //Cookies.setDomain(url)
        window.location.reload()
      }
      // window.location='http://192.168.2.243:9531/'
    } else {
      if (type === 'out') {
        location.reload()
      } else {
        //router.push({ path: '/' })
      }
      //router.push({ path: '/login' })
    }
  }).catch(error => {
  })
}
/* getJurisdiction()*/
export function setInfo(url,token) {
  Vue.jsonp(url, {
    token: token
  }).then((res) => {
    console.log(res)
  }).catch(error => {
  })
}
