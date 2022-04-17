const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
  //角色名称
  roleName: String,
  //备注信息
  remark: String, 
  //权限列表
  permissionList: {
    checkedKeys: [], //选中的子菜单
    halfCheckedKeys: [], //半选中的父菜单
  },
  createTime: {
    type: Date,
    default: Date.now()
  }, //创建时间
})
// Schema模型名称，数据库映射名称
module.exports = mongoose.model("role", roleSchema, "roles")