import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import store from '../store'
import constList from './constClass'
var socket = null
var stompClient = null

function disconnect() {
  if (stompClient) {
    stompClient.disconnect()
  }
}
// 广播
function stompQueue() {
  stompClient.subscribe('/topic/subscribe', (msg) => { // 订阅服务端提供的某个topic
    var data = JSON.parse(msg.body)
    console.log(data)
    store.commit('SET_SINGLE',data)
  })
}
function connection(infoToken) {
  var token = infoToken
  if(window.WebSocket) {
    // socket = new SockJS('/ws?token=' + token + '&scope=crm')
  }

  // 获取STOMP子协议的客户端对象
  stompClient = Stomp.over(socket)
  stompClient.debug = null
  // 定义客户端的认证信息,按需求配置
  // 向服务器发起websocket连接
  stompClient.connect({}, () => {
    stompQueue()
  }, (err) => {
    // 连接发生错误时的处理函数
    setTimeout(function () {
      // connection(token)
    },5000)

    console.log(err)
  })

}
/* connection('4')*/

export { connection }
