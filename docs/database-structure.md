# 数据库结构文档

## 1. 基本信息

- 数据库类型: PostgreSQL
- ORM: Prisma
- Schema 文件: `prisma/schema.prisma`
- 主键策略: CUID (`String @id @default(cuid())`)
- 时间字段策略:
  - `createdAt`: `@default(now())`
  - `updatedAt`: `@updatedAt`

## 2. 表结构

### 2.1 users (用户表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 用户 ID |
| email | String | 否 | - | UNIQUE | 邮箱 |
| username | String | 否 | - | UNIQUE | 用户名 |
| password | String | 否 | - | - | 密码哈希 |
| firstName | String | 是 | - | - | 名 |
| lastName | String | 是 | - | - | 姓 |
| avatar | String | 是 | - | - | 头像 URL |
| role | Role | 否 | USER | ENUM | 角色 |
| status | Status | 否 | ACTIVE | ENUM | 状态 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- 1:N -> workflows (createdBy)
- 1:N -> approvals (approvedBy)
- 1:N -> expenses (submittedBy)
- 1:N -> comments (authorId)

---

### 2.2 workflows (工作流表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 工作流 ID |
| title | String | 否 | - | - | 标题 |
| description | String | 是 | - | - | 描述 |
| type | WorkflowType | 否 | - | ENUM | 工作流类型 |
| status | WorkflowStatus | 否 | DRAFT | ENUM | 工作流状态 |
| createdBy | String | 否 | - | FK -> users.id | 创建者 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- N:1 -> users (creator)
- 1:N -> workflow_steps
- 1:N -> approvals

---

### 2.3 workflow_steps (工作流步骤表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 步骤 ID |
| workflowId | String | 否 | - | FK -> workflows.id | 所属工作流 |
| stepNumber | Int | 否 | - | UNIQUE(workflowId, stepNumber) | 步骤序号 |
| title | String | 否 | - | - | 步骤标题 |
| description | String | 是 | - | - | 步骤描述 |
| approverRole | String | 否 | - | - | 审批角色 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- N:1 -> workflows (onDelete: Cascade)

---

### 2.4 expenses (费用表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 费用 ID |
| title | String | 否 | - | - | 标题 |
| amount | Float | 否 | - | - | 金额 |
| currency | String | 否 | CNY | - | 币种 |
| category | String | 否 | - | - | 类别 |
| description | String | 是 | - | - | 描述 |
| submittedBy | String | 否 | - | FK -> users.id | 提交人 |
| attachments | String[] | 否 | [] | - | 附件 URL 数组 |
| status | ExpenseStatus | 否 | PENDING | ENUM | 费用状态 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- N:1 -> users (submitter)
- 1:N -> approvals
- 1:N -> comments

---

### 2.5 approvals (审批表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 审批 ID |
| workflowId | String | 否 | - | FK -> workflows.id | 所属工作流 |
| expenseId | String | 是 | - | FK -> expenses.id | 关联费用 |
| approvedBy | String | 否 | - | FK -> users.id | 审批人 |
| status | ApprovalStatus | 否 | - | ENUM | 审批状态 |
| comment | String | 是 | - | - | 审批意见 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- N:1 -> workflows (onDelete: Cascade)
- N:1 -> expenses (onDelete: Cascade, 可空)
- N:1 -> users (approver)

---

### 2.6 comments (评论表)

| 字段名 | 类型 | 可空 | 默认值 | 约束 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | String | 否 | cuid() | PK | 评论 ID |
| content | String | 否 | - | - | 评论内容 |
| expenseId | String | 否 | - | FK -> expenses.id | 所属费用 |
| authorId | String | 否 | - | FK -> users.id | 作者 |
| createdAt | DateTime | 否 | now() | - | 创建时间 |
| updatedAt | DateTime | 否 | auto | - | 更新时间 |

关系:
- N:1 -> expenses (onDelete: Cascade)
- N:1 -> users (author)

## 3. 枚举定义

### 3.1 Role

- ADMIN
- MANAGER
- APPROVER
- USER

### 3.2 Status

- ACTIVE
- INACTIVE
- DELETED

### 3.3 WorkflowType

- EXPENSE_REIMBURSEMENT
- LEAVE_REQUEST
- PURCHASE_ORDER
- TRAVEL_REQUEST

### 3.4 WorkflowStatus

- DRAFT
- ACTIVE
- ARCHIVED

### 3.5 ExpenseStatus

- DRAFT
- PENDING
- APPROVED
- REJECTED
- PAID

### 3.6 ApprovalStatus

- PENDING
- APPROVED
- REJECTED

## 4. 关系总览

- users 1:N workflows
- users 1:N expenses
- users 1:N approvals
- users 1:N comments
- workflows 1:N workflow_steps
- workflows 1:N approvals
- expenses 1:N approvals
- expenses 1:N comments

## 5. 删除策略

以下外键使用 `onDelete: Cascade`:

- workflow_steps.workflowId -> workflows.id
- approvals.workflowId -> workflows.id
- approvals.expenseId -> expenses.id
- comments.expenseId -> expenses.id

说明:
- 删除工作流会级联删除对应步骤和审批记录。
- 删除费用会级联删除对应审批记录和评论。
