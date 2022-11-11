import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application()
const router = new Router()

router.get('/', root)
router.get('/home/', home)
router.get('/home2/:input', home2)

app.use(router.routes())
app.use(router.allowedMethods())

async function root(ctx) { // [GET] http://127.0.0.1:8000
    console.log("---------------")
    console.log(ctx.request.url.pathname)
}

async function home(ctx) { // [GET] http://127.0.0.1:8000/home/?a=b
    console.log("---------------")
    console.log(ctx.request.url.pathname)
    console.log(ctx.request.url.searchParams.get('a'))
}

async function home2(ctx) {  // [GET] http://127.0.0.1:8000/home2/abc
    console.log("---------------")
    console.log(ctx.request.url.pathname)
    console.log(ctx.params['input'])
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })