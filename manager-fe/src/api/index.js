/**
 * api
 */
import request from '../utils/request';

export default {
  /**登录 */
  // 登录请求
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: false
    })
  },

  /**用户管理 */
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

  /**菜单管理 */
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

  /**部门管理 */
  // 获取部门列表
  getDeptList(params) {
    return request({
      url: '/dept/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  // 
  getDeptUserList() {
    return request({
      url: '/users/all/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  // 
  deptOperate(params) {
    return request({
      url: '/dept/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },

  
  /**角色管理 */
  // 获取角色列表
  getRoleList(params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
      mock: false
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
  // 角色操作
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
      mock: false
    })
  },

  /**审批管理 */
  // 通知数量
  noticeCount(params) {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true
    })
  },
}