/**
 * 用户管理模块
 */
const router = require('koa-router')()
const Leave = require('../models/leaveSchema')
const Dept = require('../models/deptSchema')
const util = require('../utils/util')
router.prefix('/leave')

// 查询申请列表
router.get('/list', async (ctx) => {
  
})

router.get("/count", async (ctx) => {
  
})

router.post("/operate", async (ctx) => {
  

})

router.post("/approve", async (ctx) => {
  
})

module.exports = router;
