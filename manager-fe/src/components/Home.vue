<template>
  <div class="basic-layout">
    <div class="nav-side">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <span>Manager</span>
      </div>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold">折叠</div>
          <div class="bread">面包屑</div>
        </div>
        <div class="user-info">admin</div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    .logo {
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 50px;
      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      height: calc(100vh - 50px);
      padding: 20px;
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>