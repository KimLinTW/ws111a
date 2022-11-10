import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("mydb.db");
const app = new Application()
const router = new Router()

router.get('/', home)
    .get('/sqlcmd/:cmd', sqlcmd) // 用get就可以直接在網頁測試 post不行 (http://127.0.0.1:8000/sqlcmd/select * from users)
    .get('/public/(.*)', pub)

app.use(router.routes())
app.use(router.allowedMethods())

async function home(ctx) {
    ctx.response.redirect('/public/')
}

async function pub(ctx) {
    console.log(ctx)
    console.log(ctx.request.url.pathname) //ctx.request.url.pathname: "/public/"

    // 把ctx.request.url.pathname對應到的檔案(index: "index.html") 傳回網頁
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "index.html",
    })
}

async function sqlcmd(ctx) {
    let cmd = ctx.params['cmd']
    console.log('cmd123=', cmd)
    console.log('cmd!=')
    try {
        let result = db.query(cmd) // 
        console.log('result=', result)
        ctx.response.type = 'application/json'
        ctx.response.body = result
        console.log("result:---")
    } catch (error) {
        error = (error+"").split("at")[0]
        console.log("error:",error)
        ctx.response.body = error
    }
    
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })