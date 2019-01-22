### 使用docker开发

#### 0 设置环境变量
`cp docker/development/.env.docker .env`

#### 1 编译docker容器并运行
`npm run build:docker` 

#### 2 重启容器服务
`npm run start:docker`

#### 3 停止容器服务
`npm run stop:docker`

### 本地环境开发

#### 0 设置环境变量
`cp .env.default .env`

#### 1 启动依赖的服务

- 使用docker启动 
`npm run start:refs`

- 手动安装服务并启动
安装mongodb服务

#### 2 启动项目
`npm start`
