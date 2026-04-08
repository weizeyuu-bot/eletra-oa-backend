-- Create role-menu permission mapping table
CREATE TABLE IF NOT EXISTS "sys_role_menus" (
  "roleId" INTEGER NOT NULL,
  "menuId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sys_role_menus_pkey" PRIMARY KEY ("roleId", "menuId")
);

-- FK constraints
ALTER TABLE "sys_role_menus"
  ADD CONSTRAINT "sys_role_menus_roleId_fkey"
  FOREIGN KEY ("roleId") REFERENCES "sys_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "sys_role_menus"
  ADD CONSTRAINT "sys_role_menus_menuId_fkey"
  FOREIGN KEY ("menuId") REFERENCES "sys_menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Helpful index for menu-based lookups
CREATE INDEX IF NOT EXISTS "sys_role_menus_menuId_idx" ON "sys_role_menus"("menuId");
