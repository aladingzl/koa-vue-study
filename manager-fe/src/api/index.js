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
      mock: false
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
  },
  // 用户删除
  userDel(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      mock: true
    })
  },
  // 用户提交
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: true
    })
  },
  // 获取菜单
  getMenuList(params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params,
      mock: true
    })
  },
  // 菜单创建/编辑/删除
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      mock: true
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
  // 获取角色名称列表
  getAllRoleList() {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true
    })
  },
  // 获取角色列表
  getRoleList(params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  // 获取部门列表
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  roleOperate(params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },
  // 更新权限
  updatePermission(params) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params,
      mock: true
    })
  }

}