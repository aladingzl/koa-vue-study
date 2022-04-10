<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">欢迎登录</div>
        <el-form-item prop="userName">
          <el-input 
            type="text" 
            prefix-icon="el-icon-user"  
          />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input 
            type="password" 
            prefix-icon="el-icon-view"  
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
export default {
  name: "login",
  data() {
    return;
  },
  methods: {
    login() {
      
    }
  }
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  background-image: url('../assets/images/bg2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: rgba($color: #fff, $alpha: .6); 
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