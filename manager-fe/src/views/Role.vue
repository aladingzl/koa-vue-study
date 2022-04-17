<template>
  <div class="role-manage">
    <!-- query Form -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="queryForm.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- Table -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        ></el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleOpenPermission(scope.row)"
              >设置权限</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- Modal -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleForm.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="roleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- Permission Modal -->
    <el-dialog title="设置权限" v-model="showPermissionModal">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="permisssionTreeRef"
            :data="menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :props="{ label: 'menuName' }"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermissionModal = false">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from "../utils/utils";
export default {
  name: "Role",
  data() {
    return {
      queryForm: {
        roleName: "",
      },
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "权限列表",
          prop: "permissionList",
          formatter: (row, column, value) => {
            let names = [];
            let list = value.halfCheckedKeys || [];
            list.map((key) => {
              if (key) {
                names.push(this.actionMap[key]);
              }
              return names.join(",");
            });
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "更新时间",
          prop: "updateTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      roleList: [],
      menuList: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      showModal: false,
      showPermissionModal: false,
      roleForm: {},
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
          },
        ],
      },
      action: "create",
      curRoleId: "",
      curRoleName: "",
      actionMap: {},
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuList();
  },
  methods: {
    // 角色列表初始化
    async getRoleList() {
      try {
        // let pager = this.pager;
        let { list, page } = await this.$api.getRoleList({
          ...this.queryForm,
          ...this.pager,
        });
        this.roleList = list;
        // console.log(this.roleList);
        this.pager.total= page.total;
      } catch (error) {
        throw new Error(error);
      }
    },
    // 菜单列表初始化
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList();
        this.menuList = list;
        // 映射
        this.getActionMap(list);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 角色创建
    handleCreate() {
      this.action = "create";
      this.showModal = true;
    },
    // 角色编辑
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.roleForm = { _id: row._id, roleName: row.roleName, remark: row.remark };
      });
    },
    // 表单重置
    handleReset(strRef) {
      this.$refs[strRef].resetFields();
      this.getRoleList();
    },
    // 角色删除
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getRoleList();
    },
    // 表单提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this;
          let params = { ...roleForm, action };
          let res = await this.$api.roleOperate(params);
          if (res) {
            this.showModal = false;
            this.$message.success("创建成功");
            this.handleReset("dialogForm");
            this.getRoleList();
          }
        }
      });
    },
    // 更新权限节点
    async handlePermissionSubmit() {
      let nodes = this.$refs.permisssionTreeRef.getCheckedNodes();
      let halfKeys = this.$refs.permisssionTreeRef.getHalfCheckedKeys();
      let checkedKeys = [];
      let parentKeys = [];
      // 菜单、按钮分开
      nodes.map((node) => {
        if (!node.children) {
          checkedKeys.push(node._id);
        } else {
          parentKeys.push(node._id);
        }
      });
      let params = {
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys),
        },
      };
      await this.$api.updatePermission(params);
      this.showPermissionModal = false;
      this.$message.success("设置成功");
      this.getRoleList();
    },
    // 弹窗关闭
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
    //
    // 翻页
    handleCurrentChange (current) {
      this.pager.pageNum = current;
      this.getUserList();
    },
    // 权限弹框
    handleOpenPermission(row) {
      this.curRoleId = row._id;
      this.curRoleName = row.roleName;
      this.showPermissionModal = true;
      let { checkedKeys } = row.permissionList;
      // console.log(this.$refs);
      setTimeout(() => {
        this.$refs.permisssionTreeRef.setCheckedKeys(checkedKeys);
      }, 0);
    },
    // 字典映射
    getActionMap(list) {
      let actionMap = {};
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop();
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName;
          }
          if (item.children && !item.action) {
            deep(item.children);
          }
        }
      };
      deep(JSON.parse(JSON.stringify(list)));
      this.actionMap = actionMap;
    },
  },
};
</script>

<style lang="scss">
</style>