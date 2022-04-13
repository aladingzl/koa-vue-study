/**
 * api
 */
import request from '../utils/request';

export default {
  // 登录请求
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      // mock: true
    })
  },
  // 通知数量
  noticeCount(params) {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true
    })
  },
  // 获取菜单
  getMenuList(params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {},
      mock:true
    })
  },
  // 获取用户列表
  getUserList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: true
    })
  }
}