import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/serverContact/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/serverContact/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/serverContact/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/serverContact/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/serverContact',
    method: 'put',
    data: obj
  })
}
