// 环境配置
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'http://127.0.0.1:4523/mock/838042'
  },
  test: {
    baseApi: '/',
    mockApi: 'http://127.0.0.1:4523/mock/838042'
  },
  prod: {
    baseApi: '/',
    mockApi: 'http://127.0.0.1:4523/mock/838042'
  }
}

export default {
  env,
  mock: true,
  // 命名空间
  namespace: 'manager',
  ...EnvConfig[env]
}