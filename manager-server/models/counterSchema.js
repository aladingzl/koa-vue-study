/**
 * 维护用户 ID 自增长表
 */

// mongodb 自身无法实现键的自增长
// 数据库维护一张表 counters，eg: 10001，下一次创建改成10002，作为下一次创建的键
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  _id: String,
  sequence_value: Number
})

module.exports = mongoose.model("counter", userSchema, "counters");