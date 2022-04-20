const mongoose = require('mongoose')
const leaveSchema = mongoose.Schema({
  orderNo: String, // 申请单号
  applyType: Number, // 申请类型  1:事假 2：调休 3:年假
  startTime: {
    type: Date,
    default: Date.now()
  },
  endTime: {
    type: Date,
    default: Date.now()
  },
  applyUser: { // 申请人信息
    userId: String,
    userName: String,
    userEmail: String
  },
  leaveTime: String,
  reasons: String, // 休假原因
  auditUsers: String, // 完整审批人
  curAuditUserName: String, // 当前审批人
  auditFlows: [{
    userId: String,
    userName: String,
    userEmail: String
  }], // 审批流
  auditLogs: [{
    userId: String,
    userName: String,
    createTime: Date,
    remark: String,
    action: String
  }],
  applyState: {
    type: Number,
    default: 1
  }, // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
  createTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("leaves", leaveSchema, "leaves")