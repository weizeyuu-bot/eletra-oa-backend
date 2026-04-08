BEGIN;

-- 1) Upsert system roles (professional baseline set)
INSERT INTO "sys_roles" ("name", "key", "sort", "status", "updatedAt")
VALUES
  ('系统管理员', 'sys:admin', 1, true, CURRENT_TIMESTAMP),
  ('流程审批人', 'workflow:approver', 2, true, CURRENT_TIMESTAMP),
  ('财务专员', 'finance:operator', 3, true, CURRENT_TIMESTAMP),
  ('人事专员', 'hr:operator', 4, true, CURRENT_TIMESTAMP),
  ('供应链专员', 'supply:operator', 5, true, CURRENT_TIMESTAMP),
  ('审计查看员', 'audit:viewer', 6, true, CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "sort" = EXCLUDED."sort",
  "status" = EXCLUDED."status",
  "updatedAt" = CURRENT_TIMESTAMP;

-- 2) Seed menus if missing (by permission as natural key)
WITH menu_seed (name, sort, permission, component, status) AS (
  VALUES
    ('用户管理', 10, 'system:user:list', 'system/user/index', true),
    ('角色管理', 20, 'system:role:list', 'system/role/index', true),
    ('菜单管理', 30, 'system:menu:list', 'system/menu/index', true),
    ('部门管理', 40, 'system:dept:list', 'system/dept/index', true),
    ('岗位管理', 50, 'system:post:list', 'system/post/index', true),
    ('字典管理', 60, 'system:dict:list', 'system/dict/index', true),
    ('通知公告管理', 70, 'system:notice:list', 'system/notice/index', true),
    ('流程待办', 80, 'workflow:todo:list', 'workflow/todo/index', true),
    ('流程配置', 90, 'workflow:config:list', 'workflow/config/index', true),
    ('报销申请', 100, 'finance:reimbursement:list', 'finance/reimbursement/index', true),
    ('付款申请', 110, 'finance:payment:list', 'finance/payment/index', true),
    ('发票申请', 120, 'finance:invoice:list', 'finance/invoice/index', true),
    ('出差申请', 130, 'hr:travel:list', 'hr/travel/index', true),
    ('请假申请', 140, 'hr:leave:list', 'hr/leave/index', true),
    ('考勤汇总', 150, 'hr:attendance:list', 'hr/attendance/index', true),
    ('采购申请', 160, 'supply:procurement:list', 'supply/procurement/index', true),
    ('领用申请', 170, 'supply:requisition:list', 'supply/requisition/index', true),
    ('报表中心', 180, 'reports:center:list', 'reports/index', true)
)
INSERT INTO "sys_menus" ("name", "sort", "permission", "component", "status", "updatedAt")
SELECT ms.name, ms.sort, ms.permission, ms.component, ms.status, CURRENT_TIMESTAMP
FROM menu_seed ms
WHERE NOT EXISTS (
  SELECT 1 FROM "sys_menus" m WHERE m."permission" = ms.permission
);

-- 3) Build role-menu mappings (idempotent)
WITH role_menu_seed (role_key, menu_permission) AS (
  VALUES
    -- admin: full access for seeded menus
    ('sys:admin', 'system:user:list'),
    ('sys:admin', 'system:role:list'),
    ('sys:admin', 'system:menu:list'),
    ('sys:admin', 'system:dept:list'),
    ('sys:admin', 'system:post:list'),
    ('sys:admin', 'system:dict:list'),
    ('sys:admin', 'system:notice:list'),
    ('sys:admin', 'workflow:todo:list'),
    ('sys:admin', 'workflow:config:list'),
    ('sys:admin', 'finance:reimbursement:list'),
    ('sys:admin', 'finance:payment:list'),
    ('sys:admin', 'finance:invoice:list'),
    ('sys:admin', 'hr:travel:list'),
    ('sys:admin', 'hr:leave:list'),
    ('sys:admin', 'hr:attendance:list'),
    ('sys:admin', 'supply:procurement:list'),
    ('sys:admin', 'supply:requisition:list'),
    ('sys:admin', 'reports:center:list'),

    -- workflow approver
    ('workflow:approver', 'workflow:todo:list'),
    ('workflow:approver', 'workflow:config:list'),
    ('workflow:approver', 'reports:center:list'),
    ('workflow:approver', 'system:notice:list'),

    -- finance operator
    ('finance:operator', 'finance:reimbursement:list'),
    ('finance:operator', 'finance:payment:list'),
    ('finance:operator', 'finance:invoice:list'),
    ('finance:operator', 'reports:center:list'),
    ('finance:operator', 'system:notice:list'),

    -- hr operator
    ('hr:operator', 'hr:travel:list'),
    ('hr:operator', 'hr:leave:list'),
    ('hr:operator', 'hr:attendance:list'),
    ('hr:operator', 'reports:center:list'),
    ('hr:operator', 'system:notice:list'),

    -- supply operator
    ('supply:operator', 'supply:procurement:list'),
    ('supply:operator', 'supply:requisition:list'),
    ('supply:operator', 'reports:center:list'),
    ('supply:operator', 'system:notice:list'),

    -- audit viewer
    ('audit:viewer', 'workflow:todo:list'),
    ('audit:viewer', 'reports:center:list'),
    ('audit:viewer', 'system:notice:list')
)
INSERT INTO "sys_role_menus" ("roleId", "menuId")
SELECT r."id", m."id"
FROM role_menu_seed s
JOIN "sys_roles" r ON r."key" = s.role_key
JOIN "sys_menus" m ON m."permission" = s.menu_permission
ON CONFLICT ("roleId", "menuId") DO NOTHING;

COMMIT;
