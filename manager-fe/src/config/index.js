// 环境配置
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: ''
  },
  test: {
    baseApi: '/',
    mockApi: ''
  },
  prod: {
    baseApi: '/',
    mockApi: ''
  }
}

export default {
  env,
  mock: false,
  // 命名空间
  namespace: 'manager',
  ...EnvConfig[env]
}