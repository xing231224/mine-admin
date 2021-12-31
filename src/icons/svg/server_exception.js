import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/serverException/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/serverException/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/serverException/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/serverException/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/serverException',
    method: 'put',
    params: obj
  })
}
// export function getSTList(){
//   return request({
//     url: '/admin/serverType/getSTList',
//     method: 'get'
//   })
// }
