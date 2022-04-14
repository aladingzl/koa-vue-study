/**
 * 用户管理模块
 */
const router = require('koa-router')();
const User = require('../models/userSchema');
const util = require('../utils/util');
const jwt = require('jsonwebtoken');

router.prefix('/users');

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    // 返回数据库指定字段
    const res = await User.findOne({
      userName,
      userPwd
    }, 'userId userName userEmail state role deptId roleList');

    if(res) {
      const data = res._doc;
      const token = jwt.sign({
        data
      }, 'rp', { expiresIn: '1h' });

      data.token = token;

      ctx.body = util.success(data);
    } else {
      ctx.body = util.fail("账号密码不正确");
    }
  } catch(error) {
    ctx.body = util.fail(error.msg);
  }
})
// 用户列表
router.get('/list', async (ctx) => {
  const { userId, userName, state } = ctx.request.query;
  const { page, skipIndex } = util.paper(ctx.request.query);
  let params = {};
  if(userId) params.userId = userId;
  if(userName) params.userName = userName;
  if(state && state != '0') params.state = state;
  try {
    // 根据条件查询用户列表
    const query = User.find(params, {_id: 0, userPwd: 0 });
    // 从哪开始查，限制数目
    const list = await query.skip(skipIndex).limit(page.pageSize);
    // 统计数目
    const total = await User.countDocuments(params);

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    ctx.body = util.fail(`查询异常：${error.stack}`);
  }
})

module.exports = router
