// 可以通过 new，这里直接调用
const router = require('koa-router')();
const util = require('../utils/util');
const Menu = require('../models/menuSchema');
// 路由前缀
router.prefix('/menu');

// 菜单列表查询
router.get('/list', async (ctx) => {
  const {
    menuName,
    menuState
  } = ctx.request.query;
  const params = {};
  if (menuState) params.menuState = menuState;
  if (menuName) params.menuName = menuName;
  let rootList = await Menu.find(params) || [];
  let permissionList = getTreeMenu(rootList, null, []);
  ctx.body = util.success(permissionList);
})

// 递归拼接树形列表
function getTreeMenu(rootList, id, list) {
  for(let i = 0; i < rootList.length; i++) {
    let item = rootList[i];
    // 原数据是 Buffer类型，一次递归遍历一级二级。。。菜单
    if(String(item.parentId.slice().pop()) == String(id)) {
      list.push(item._doc);
    }
  }
  list.map(item => {
    item.children = [];
    getTreeMenu(rootList, item._id, item.children);
    if(item.children.length == 0) {
      delete item.children;
    } else if(item.children.length > 0 && item.children[0].menuType == 2) {
      // 快速区分按钮和菜单，用于后续菜单按钮权限控制
      item.action = item.children;
    }
  })
  return list;
}

// 菜单编辑、删除、新增
router.post('/operate', async (ctx) => {
  const {
    _id,
    action,
    ...params
  } = ctx.request.body;
  let res, info;
  try {
    if (action == 'add') {
      res = await Menu.create(params);
      info = '创建成功';
    } else if (action == 'edit') {
      params.updateTime = new Date();
      res = await Menu.findByIdAndUpdate(_id, params);
      info = '编辑成功';
    } else {
      res = await Menu.findByIdAndRemove(_id);
      // 对于父节点，还要删除关联节点
      await Menu.deleteMany({
        parentId: {
          $all: [_id]
        }
      });
      info = '删除成功';
    }
    ctx.body = util.success('', info);
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
})

module.exports = router