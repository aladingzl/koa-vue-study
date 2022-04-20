<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">欢迎登录</div>
        <el-form-item prop="userName">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.userName"
          />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.userPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import storage from "../utils/storage";
import utils from "../utils/utils";
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "admin",
        userPwd: "123456",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            this.$store.commit("saveUserInfo", res);
            this.loadAsyncRoutes();
            this.$router.push("/welcome");
          });
        } else {
          return false;
        }
      });
    },
    async loadAsyncRoutes() {
      let userInfo = storage.getItem("userInfo") || {};
      if (userInfo.token) {
        try {
          const { menuList } = await this.$api.getPermissionList();
          let routes = utils.generateRoute(menuList);
          routes.map((route) => {
            // let url = `./../views/${route.component}.vue`;
            // route.component = () => import(url);
            let cpt = route.component;
            route.component = () => import(`./../views/${cpt}.vue`);
            this.$router.addRoute("home", route);
          });
        } catch (error) {}
      }
    },
    goHome() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  background-image: url("../assets/images/bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: rgba($color: #fff, $alpha: 0.6);
    border-radius: 12px;
    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>