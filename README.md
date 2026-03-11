# 自我批评生成器

党员组织生活会专用工具，支持一键生成自我批评和批评他人材料。

## 🌐 在线访问

- **自我批评**: http://x.dysobo.cn:8888/ziping.html（密码：58156104）
- **批评他人**: http://x.dysobo.cn:8888/critique.html（需配置 API Key）

## ✨ 功能特性

### 自我批评页面
- 🔐 密码验证（后端验证，5 次错误锁定 IP 30 分钟）
- 📝 填写个人信息和工作内容
- 🤖 AI 一键生成自我批评材料
- 📄 支持导出 Word 文档
- 💾 个人信息导入/导出

### 批评他人页面
- 👤 填写被批评人信息（姓名、性别、年龄、岗位）
- 💬 可添加自定义吐槽内容
- 🤖 AI 生成 200-300 字批评材料
- 📄 支持导出 Word 文档
- 📋 一键复制结果

## 🚀 本地部署

### 方式一：Docker Compose（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方式二：直接运行

```bash
# 安装依赖
npm install

# 启动服务（默认密码：58156104）
npm start

# 或自定义密码
PARTY_PASSWORD=your_password npm start
```

访问：http://localhost:3888

## 📁 项目结构

```
party-self-criticism/
├── server.js           # Node.js 后端服务
├── package.json        # 项目配置
├── Dockerfile          # Docker 镜像
├── docker-compose.yml  # Docker Compose 配置
└── public/             # 前端页面
    ├── index.html      # 自我批评页面
    └── critique.html   # 批评他人页面
```

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| PARTY_PASSWORD | 密码验证 | 58156104 |

### API 配置

前端支持自定义 AI API 配置（左上角⚙️）：
- **AiHubMix**（默认）：glm-4.7-flash-free
- **DeepSeek**：deepseek-chat
- **自定义**：任意兼容 OpenAI 格式的 API

## 🔒 安全特性

1. **密码后端验证** - 前端不存储明文密码
2. **IP 锁定保护** - 5 次错误后锁定 30 分钟
3. **Docker 隔离** - 容器化运行，环境隔离

## 📝 版本历史

- **V1.8** - 密码验证移至后端，IP 锁定保护
- **V1.7** - 支持自定义 API Key，新增 DeepSeek 选项
- **V1.5** - 删除特定行业字段，适用于所有岗位
- **V1.4** - 严格基于实际工作生成，禁止编造

## 📄 License

MIT
