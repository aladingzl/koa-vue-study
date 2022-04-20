const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // 用户 ID，自增长
  userId: Number,
  // 用户名称
  userName: String,
  // 用户密码，md5加密
  userPwd: String,
  // 用户邮箱
  userEmail: String,
  // 手机号
  mobile: String,
  // 性别
  sex: Number,
  // 部门
  deptId: [],
  // 岗位
  job: String,
  // 1：在职，2：离职，3：试用期
  state: {
    type: Number,
    default: 1
  },
  // 用户角色，0：系统管理员，1：普通用户
  role: {
    type: Number,
    default: 1
  },
  // 系统角色
  roleList: [],
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now()
  },
  // 更新时间
  lastLoginTime: {
    type: Date,
    default: Date.now()
  },
  // 扩展
  remark: String
})

module.exports = mongoose.model("users", userSchema, "users");