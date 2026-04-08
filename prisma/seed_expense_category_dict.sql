BEGIN;

-- Ensure finance-related form options are configurable via dictionary management.
WITH seed(name, type, remark, status) AS (
  VALUES
    ('差旅费 (Viagens)', 'expense_category', '报销类别可配置项', true),
    ('招待费 (Entretenimento)', 'expense_category', '报销类别可配置项', true),
    ('办公费 (Escritorio)', 'expense_category', '报销类别可配置项', true),
    ('通讯费 (Comunicacao)', 'expense_category', '报销类别可配置项', true),
    ('其他 (Outros)', 'expense_category', '报销类别可配置项', true)
)
INSERT INTO "sys_dicts" ("name", "type", "remark", "status", "updatedAt")
SELECT s.name, s.type, s.remark, s.status, CURRENT_TIMESTAMP
FROM seed s
WHERE NOT EXISTS (
  SELECT 1 FROM "sys_dicts" d WHERE d."type" = s.type AND d."name" = s.name
);

WITH seed(name, type, remark, status) AS (
  VALUES
    ('银行转账 (Transferencia)', 'payment_method', '付款方式可配置项', true),
    ('支票 (Cheque)', 'payment_method', '付款方式可配置项', true),
    ('现金 (Dinheiro)', 'payment_method', '付款方式可配置项', true),
    ('PIX', 'payment_method', '付款方式可配置项', true)
)
INSERT INTO "sys_dicts" ("name", "type", "remark", "status", "updatedAt")
SELECT s.name, s.type, s.remark, s.status, CURRENT_TIMESTAMP
FROM seed s
WHERE NOT EXISTS (
  SELECT 1 FROM "sys_dicts" d WHERE d."type" = s.type AND d."name" = s.name
);

WITH seed(name, type, remark, status) AS (
  VALUES
    ('Banco do Brasil', 'bank_name', '银行名称可配置项', true),
    ('Itau Unibanco', 'bank_name', '银行名称可配置项', true),
    ('Bradesco', 'bank_name', '银行名称可配置项', true),
    ('Caixa Economica Federal', 'bank_name', '银行名称可配置项', true)
)
INSERT INTO "sys_dicts" ("name", "type", "remark", "status", "updatedAt")
SELECT s.name, s.type, s.remark, s.status, CURRENT_TIMESTAMP
FROM seed s
WHERE NOT EXISTS (
  SELECT 1 FROM "sys_dicts" d WHERE d."type" = s.type AND d."name" = s.name
);

COMMIT;
