const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');

const fs = require('fs')
const { promisify } = require('util')
// 将writeFile转换成promise对象
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const { stat } = require('./utils')

// 初始化 koa 实例
const app = new Koa()

// 初始化路由实例
const router = new Router({ prefix: '/api' })

// 用于接收post请求的
app.use(bodyParser())

// 跨域设置
app.use(cors());

router.get('/', async ctx => {
  ctx.body = '欢迎使用Koa!'
})
// 读取列表
router.get('/course', async ctx => {
  // 判断文件是否存在
  if (await stat('./data/list.text')) {
    const data = await readFile('./data/list.text')
    ctx.body = data.toString()
  } else {
    // 定义假数据并写入文件
    const defaultData = [
      {
        id: 0,
        name: 'java后台',
        price: 8000
      },
      {
        id: 1,
        name: '前端',
        price: 9900
      },
      {
        id: 2,
        name: 'koa',
        price: 4000
      }
    ]
    await writeFile('./data/list.text', JSON.stringify(defaultData), 'utf8')
    ctx.body = defaultData
  }
})
// 添加数据
router.post('/AddCourse', async ctx => {
  console.log(ctx.request.body)
  // 要添加的数据
  const targetData = ctx.request.body
  // 读取文件中已经存在的数据
  let baseData = await readFile('./data/list.text')
  baseData = JSON.parse(baseData.toString())
  // 将数据追加到数据末尾
  baseData.push({
    id: baseData.length + 1,
    ...targetData
  })
  // 将数组重新写入文件
  await writeFile('./data/list.text', JSON.stringify(baseData), 'utf8')
  // 写入成功读取文件并将数据返回给前端
  const data = await readFile('./data/list.text')
  ctx.body = data.toString()
})

// 注册路由中间件
app.use(router.routes())

// 启动端口监听
app.listen('9999', () => {
  console.log(`http://localhost:9999`)
})