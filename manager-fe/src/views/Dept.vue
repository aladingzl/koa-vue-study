<template>
  <div class="dept-manage">
    <div class="query-form">
      <el-form ref="queryForm" :inline="true" :model="queryForm">
        <el-form-item label="部门名称">
          <el-input
            placeholder="请输入部门名称"
            v-model="queryForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptList" type="primary">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="small" type="danger" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dept",
  data() {
    return {
      queryForm: {
        deptName: "",
      },
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
      ],
      deptList: [],
      pager: {
        pageNum: 0,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.getDeptList();
  },
  methods: {
    async getDeptList() {
      let list = await this.$api.getDeptList({
        ...this.queryForm,
        ...this.pager,
      });
      this.deptList = list;
    },
    handleReset(strRef) {
      this.$refs[strRef].resetFields();
    },
  },
};
</script>

<style>
</style>