import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
});

async function testAPI() {
  try {
    console.log('🧪 开始测试后端 API...\n');

    // 1. 注册用户
    console.log('1️⃣ 测试注册用户...');
    const timestamp = Date.now();
    const registerRes = await api.post('/auth/register', {
      email: `demo${timestamp}@eletra.com`,
      username: `demouser${timestamp}`,
      password: 'Demo123456',
      firstName: 'Demo',
      lastName: 'User',
    });
    const token = registerRes.data.access_token;
    console.log('✅ 注册成功:', registerRes.data.user.email);
    console.log('   Token:', token.substring(0, 20) + '...\n');

    // 设置认证头
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 2. 保存示例 token
    console.log('2️⃣ 创建测试费用...');
    const expenseRes = await api.post('/expenses', {
      title: '团队午餐',
      amount: 125.5,
      currency: 'CNY',
      category: '饭费',
      description: '在餐厅点了3份盒饭和2杯饮料',
    });
    console.log('✅ 费用创建成功:', expenseRes.data.title);
    console.log('   ID:', expenseRes.data.id);
    console.log('   金额: ¥' + expenseRes.data.amount + '\n');

    // 3. 获取所有费用
    console.log('3️⃣ 获取费用列表...');
    const expensesRes = await api.get('/expenses');
    console.log('✅ 费用列表获取成功');
    console.log('   共有', expensesRes.data.length, '条费用记录\n');

    // 4. 获取用户列表
    console.log('4️⃣ 获取用户列表...');
    const usersRes = await api.get('/users');
    console.log('✅ 用户列表获取成功');
    console.log('   共有', usersRes.data.length, '个用户\n');

    // 5. 创建工作流
    console.log('5️⃣ 创建工作流...');
    const workflowRes = await api.post('/workflows', {
      title: '费用报销流程',
      description: '标准的费用报销审批流程',
      type: 'EXPENSE_REIMBURSEMENT',
      steps: [
        {
          title: '部门经理审批',
          description: '部门经理审核费用',
          approverRole: 'MANAGER',
        },
        {
          title: '财务审批',
          description: '财务部门审核并发放',
          approverRole: 'APPROVER',
        },
      ],
    });
    console.log('✅ 工作流创建成功:', workflowRes.data.title);
    console.log('   ID:', workflowRes.data.id);
    console.log('   步骤数:', workflowRes.data.steps.length + '\n');

    console.log('✨ 所有 API 测试通过！');
    console.log('\n📋 后端 API 集成完成！');
    console.log('   前端可以访问:');
    console.log('   • http://localhost:3000 - 前端应用');
    console.log('   • http://localhost:3002/api - 后端 API');
  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();
