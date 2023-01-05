import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as py from './callPy.js'



// console.log(a)

const db = new DB("mydb.db");
const app = new Application()
const router = new Router()

router.get('/', root)
    .get('/sqlcmd/:input', sqlcmd) // 用get就可以直接在網頁測試 post不行 (http://127.0.0.1:8000/sqlcmd/select * from users)
    .get('/home/(.*)', home)
    // .get('/test/:input3', test)
    .get('/test/:input3', signup)
    .get('/login', login)

app.use(router.routes())
app.use(router.allowedMethods())

async function signup(ctx) {
    let result = ctx.params['input3']
    console.log(result)
    result = await py.input(result);
    console.log(" v ")
    console.log(result)
    console.log(" ^ ")
        try {
            //把db.query(cmd)的結果以JSON格式輸出  main.js再用fetch接收
            ctx.response.type = 'application/json'
            ctx.response.body = result
            // console.log("s")
        } catch (error) {
            error = (error+"").split("at")[0]
            error = error.split(":")[1] +' :'+ error.split(":")[2]
            ctx.response.body = [ "錯誤"+error ]
            // console.log("f")
        }
}
async function test(ctx){
    // let testdata = "isSign.Kim.abc123.linkim0914@gmail.com"
    // result = await input(testdata);
    let cmd = ctx.params['input3']
    console.log(cmd)
        try {
            let result = cmd+"3"
            //把db.query(cmd)的結果以JSON格式輸出  main.js再用fetch接收
            ctx.response.type = 'application/json'
            ctx.response.body = result
            console.log("s")
        } catch (error) {
            error = (error+"").split("at")[0]
            error = error.split(":")[1] +' :'+ error.split(":")[2]
            ctx.response.body = [ "錯誤"+error ]
            console.log("f")
        }
}

async function login(ctx){
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "login.html",
    })
}

async function root(ctx) {
    ctx.response.redirect('/home/')
}

async function home(ctx) {
    // console.log(ctx)
    // console.log(ctx.request.url.pathname) //ctx.request.url.pathname: "/public/"

    // 把ctx.request.url.pathname對應到的檔案(index: "index.html") 傳回網頁
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "index.html",
    })
}

async function sqlcmd(ctx) {
    let cmd = ctx.params['input']

    try {
        let result = db.query(cmd)
        console.log("sql:"+result)

        //把db.query(cmd)的結果以JSON格式輸出  main.js再用fetch接收
        ctx.response.type = 'application/json'
        ctx.response.body = result
    } catch (error) {
        error = (error+"").split("at")[0]
        error = error.split(":")[1] +' :'+ error.split(":")[2]
        ctx.response.body = [ "錯誤"+error ]
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })