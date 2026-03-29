# API 文档

## 1. 基本信息

- Base URL: `http://localhost:3002/api`
- Content-Type: `application/json`
- 认证方式: Bearer Token (JWT)
- 受保护接口: 除 `auth/register` 和 `auth/login` 外均需认证

认证头示例:

```http
Authorization: Bearer <access_token>
```

## 2. 统一错误格式

常见错误响应:

```json
{
  "statusCode": 400,
  "message": "Bad Request"
}
```

## 3. 认证模块 Auth

### 3.1 用户注册

- 方法: `POST`
- 路径: `/auth/register`
- 认证: 否

请求体:

```json
{
  "email": "user@example.com",
  "username": "demo_user",
  "password": "123456",
  "firstName": "Demo",
  "lastName": "User"
}
```

字段约束:
- email: 必填，邮箱格式
- username: 必填，字符串
- password: 必填，最少 6 位
- firstName: 可选，字符串
- lastName: 可选，字符串

成功响应:

```json
{
  "access_token": "<jwt>",
  "user": {
    "id": "cm...",
    "email": "user@example.com",
    "username": "demo_user",
    "role": "USER"
  }
}
```

### 3.2 用户登录

- 方法: `POST`
- 路径: `/auth/login`
- 认证: 否

请求体:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

字段约束:
- email: 必填，邮箱格式
- password: 必填，字符串

成功响应:

```json
{
  "access_token": "<jwt>",
  "user": {
    "id": "cm...",
    "email": "user@example.com",
    "username": "demo_user",
    "role": "USER"
  }
}
```

## 4. 用户模块 Users

### 4.1 查询用户列表

- 方法: `GET`
- 路径: `/users`
- 认证: 是

成功响应:

```json
[
  {
    "id": "cm...",
    "email": "user@example.com",
    "username": "demo_user",
    "firstName": "Demo",
    "lastName": "User",
    "role": "USER",
    "status": "ACTIVE",
    "createdAt": "2026-03-29T01:23:45.000Z"
  }
]
```

### 4.2 查询单个用户

- 方法: `GET`
- 路径: `/users/:id`
- 认证: 是

路径参数:
- id: 用户 ID

成功响应:

```json
{
  "id": "cm...",
  "email": "user@example.com",
  "username": "demo_user",
  "firstName": "Demo",
  "lastName": "User",
  "role": "USER",
  "status": "ACTIVE",
  "createdAt": "2026-03-29T01:23:45.000Z"
}
```

## 5. 费用模块 Expenses

### 5.1 新建费用

- 方法: `POST`
- 路径: `/expenses`
- 认证: 是

请求体:

```json
{
  "title": "团队午餐",
  "amount": 125.5,
  "currency": "CNY",
  "category": "饭费",
  "description": "工作日聚餐",
  "attachments": ["https://example.com/a.png"]
}
```

字段约束:
- title: 必填，字符串
- amount: 必填，数字
- currency: 可选，字符串
- category: 必填，字符串
- description: 可选，字符串
- attachments: 可选，字符串数组

成功响应: 返回创建后的费用对象（含 submitter）

### 5.2 查询费用列表

- 方法: `GET`
- 路径: `/expenses`
- 认证: 是

成功响应: 费用数组（含 submitter、approvals、comments）

### 5.3 查询单个费用

- 方法: `GET`
- 路径: `/expenses/:id`
- 认证: 是

路径参数:
- id: 费用 ID

成功响应: 费用详情（含 submitter、approvals.approver、comments.author）

### 5.4 更新费用

- 方法: `PATCH`
- 路径: `/expenses/:id`
- 认证: 是

请求体 (可选字段):

```json
{
  "title": "团队午餐(修订)",
  "amount": 138,
  "category": "餐饮",
  "status": "APPROVED"
}
```

字段约束:
- title: 可选，字符串
- amount: 可选，数字
- category: 可选，字符串
- status: 可选，枚举 `DRAFT | PENDING | APPROVED | REJECTED | PAID`

成功响应: 更新后的费用对象

### 5.5 删除费用

- 方法: `DELETE`
- 路径: `/expenses/:id`
- 认证: 是

路径参数:
- id: 费用 ID

成功响应: 被删除的费用对象

## 6. 工作流模块 Workflows

### 6.1 新建工作流

- 方法: `POST`
- 路径: `/workflows`
- 认证: 是

请求体:

```json
{
  "title": "费用报销流程",
  "description": "标准费用报销",
  "type": "EXPENSE_REIMBURSEMENT",
  "steps": [
    {
      "title": "部门经理审批",
      "description": "经理确认",
      "approverRole": "MANAGER"
    },
    {
      "title": "财务审批",
      "description": "财务打款",
      "approverRole": "APPROVER"
    }
  ]
}
```

字段约束:
- title: 必填，字符串
- description: 可选，字符串
- type: 必填，枚举 `EXPENSE_REIMBURSEMENT | LEAVE_REQUEST | PURCHASE_ORDER | TRAVEL_REQUEST`
- steps: 必填，数组
  - title: 必填
  - description: 可选
  - approverRole: 必填

成功响应: 返回创建后的工作流对象（含 steps、creator）

### 6.2 查询工作流列表

- 方法: `GET`
- 路径: `/workflows`
- 认证: 是

成功响应: 工作流数组（含 steps、creator）

### 6.3 查询单个工作流

- 方法: `GET`
- 路径: `/workflows/:id`
- 认证: 是

路径参数:
- id: 工作流 ID

成功响应: 工作流详情（含 steps、creator）

### 6.4 删除工作流

- 方法: `DELETE`
- 路径: `/workflows/:id`
- 认证: 是

路径参数:
- id: 工作流 ID

成功响应: 被删除的工作流对象

## 7. 快速联调流程

1. 调用 `POST /auth/register` 或 `POST /auth/login` 获取 token
2. 在请求头加入 `Authorization: Bearer <token>`
3. 调用受保护接口进行业务联调

## 8. 枚举值总览

- Role: `ADMIN`, `MANAGER`, `APPROVER`, `USER`
- Status: `ACTIVE`, `INACTIVE`, `DELETED`
- WorkflowType: `EXPENSE_REIMBURSEMENT`, `LEAVE_REQUEST`, `PURCHASE_ORDER`, `TRAVEL_REQUEST`
- WorkflowStatus: `DRAFT`, `ACTIVE`, `ARCHIVED`
- ExpenseStatus: `DRAFT`, `PENDING`, `APPROVED`, `REJECTED`, `PAID`
- ApprovalStatus: `PENDING`, `APPROVED`, `REJECTED`
