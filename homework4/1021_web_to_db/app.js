import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
// import { DB } from "https://deno.land/x/sqlite/mod.ts";

// const db = new DB("blog.db");


const app = new Application()

const posts = [
    { id: 0, title: 'aaa', body: 'aaaaa' },
    { id: 1, title: 'bbb', body: 'bbbbb' }
]

const router = new Router()

router.get('/list', list)
    .post('/tst', tst)
    .get('/post/:id', show)
    .post('/post', create)

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx, next) => {
    await next()
    console.log('path=', ctx.request.url.pathname)
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/public/`,
        index: "index.html",
    })
})

async function tst(ctx) {
    console.log("list")
    console.log(ctx.request.type)
}

async function list(ctx) {
    ctx.response.type = 'application/json'
    ctx.response.body = posts

}

async function show(ctx) {
    const id = ctx.params.id
    const post = posts[id]
    if (!post) ctx.throw(404, 'invalid post id')
    ctx.response.type = 'application/json'
    ctx.response.body = post
}

async function create(ctx) {
    // var post = ctx.request.body
    const body = ctx.request.body(); // content type automatically detected
    console.log('body = ', body)
    if (body.type === "json") {
        let post = await body.value
        post.id = posts.length
        posts.push(post)
        ctx.response.body = 'success'
        console.log('create:save=>', post)
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 }) //127.0.0.1:8000')
await app.listen({ port: 8000 })