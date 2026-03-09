# 自我批评参考素材一键生成

一个基于 AI 的自我批评材料生成工具，支持自定义 API Key，适用于所有岗位。

## 功能特性

### 核心功能
- AI 自动生成自我批评材料
- 实时流式输出
- 导出 Word 文档
- 个人信息导入导出
- 上传去年文稿参考
- 支持自定义 API Key

### 生成规则
- 严格基于用户填写的工作内容
- 从5个方面查找差距不足：
  - 学习贯彻党的创新理论
  - 加强党性锤炼
  - 联系服务群众
  - 发挥先锋模范作用
  - 改作风树新风
- 内容真实具体，避免假大空
- 语言朴实，避免空洞表态

## 技术架构

### 前端技术
- 纯 HTML + CSS + JavaScript
- 无需后端服务器
- 使用 localStorage 保存用户配置

### API 集成
- 支持多个 AI 模型提供商
- 默认: AiHubMix (glm-4.7-flash-free)
- 推荐: DeepSeek (deepseek-chat)
- 支持自定义 API 配置

### 依赖库
- docx.js: 生成 Word 文档
- FileSaver.js: 文件下载

## 使用说明

### 1. 填写信息
- 姓名
- 岗位
- 主要工作内容（越详细越好）
- 自定义重点内容（可选）
- 上传去年文稿（可选）

### 2. 配置 API（推荐）
点击左上角"⚙️ API配置"，推荐使用 DeepSeek：
1. 访问 https://platform.deepseek.com 注册账号
2. 获取 API Key
3. 选择 DeepSeek 并填入 API Key
4. 费用: 约 1 分钱/次生成

### 3. 生成和导出
- 点击"一键生成"
- 可编辑生成结果
- 导出为 Word 文档

## 部署

直接用浏览器打开 `index.html` 即可使用，无需安装任何依赖。

## License

MIT License - 详见 [LICENSE](LICENSE) 文件
