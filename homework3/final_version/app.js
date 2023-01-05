import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");
db.query(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, time TEXT, body TEXT)`);

// init db
db.query(`INSERT OR IGNORE INTO posts (id, title, time, body) VALUES (0,'上課','2022-10-01','網站設計課')`)
db.query(`INSERT OR IGNORE INTO posts (id, title, time, body) VALUES (1,'作筆記','2022-10-02','網站設計筆記')`)

const router = new Router();

router.get('/', list)
    .get('/post/new', add)
    .get('/del/:id', del)
    .get('/post/:id', show)
    .get('/post/update/:id', update)
    .get('/home/(.*)', home)
    .get('/test/:input', test)
    .post('/post', create)
    .post('/update/:id', update_table)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());



async function test(ctx) {
    let result = ctx.params['input'] // 取得
    try {
        //把db.query(cmd)的結果以JSON格式輸出  main.js再用fetch接收
        ctx.response.type = 'application/json'
        ctx.response.body = result
    } catch (error) {
        // error = (error+"").split("at")[0]
        // error = error.split(":")[1] +' :'+ error.split(":")[2]
        ctx.response.body = [ "錯誤"+error ]
    }
}


async function home(ctx){
    await send(ctx, ctx.request.url.pathname,{
        root: `${Deno.cwd()}`,
        index: "index.html",
    })
}



function query(sql) {
    let list = []
    for (const [id, title, time, body] of db.query(sql)) {
        list.push({ id, title, time, body })
    }
    return list
}

async function list(ctx) {
    let posts = query(`SELECT id, title, time, body FROM posts`);
    ctx.response.body = await render.list(posts);
}

async function add(ctx) {
    ctx.response.body = await render.newPost();
}

async function show(ctx) {
    // const id = ctx.params.id;
    let posts = query(`SELECT id, title, time, body FROM posts WHERE id = ${ ctx.params.id }`);
    console.log(posts)
    if (!posts[0]) {
        ctx.throw(404, "invalid note id");
    }

    ctx.response.body = await render.show(posts[0]);
    // const post = posts[ctx.params.id];
    // if (!posts) ctx.throw(404, 'invalid post id');
    // ctx.response.body = await render.show(post);
}

async function del(ctx) {
    db.query(`DELETE FROM posts WHERE id = ${ ctx.params.id }`);
    ctx.response.redirect("/");
}

async function update(ctx) {
    // 修改 需要 id 原標題 原內容 原時間
    let posts = query(`SELECT id, title, time, body FROM posts WHERE id = ${ ctx.params.id }`);
    console.log(posts)
    if (!posts[0]) {
        ctx.throw(404, "invalid note id");
    }

    let string1 = posts[0]['id']+":"+posts[0]['time']+":"+posts[0]['body']
    ctx.response.body = await render.update(posts[0]);

    console.log("100-----")

    
    // ctx.response.redirect("/update/"+string1);
}
async function update_table(ctx) {



    // await send(ctx, ctx.request.url.pathname, {
    //     root: `${Deno.cwd()}/`,
    //     index: "index.html",
    // })

    
    let content = await document.getElementById('title').value
    let r = await window.fetch(`/update/content`)

        //把sqlcmd 輸出的結果傳回來 (JSON格式)
    let obj = await r.json() // 呼叫.json轉成物件  有延遲需要await
    innerText = JSON.stringify(obj, null, 2) // 物件轉成字串 丟給 節點
    console.log(innerText)


    let result = ctx.params['id'] // 取得
    console.log(result)
    console.log('-----------------------')
        try {
            //把db.query(cmd)的結果以JSON格式輸出  main.js再用fetch接收
            ctx.response.type = 'application/json'
            ctx.response.body = result
        } catch (error) {
            // error = (error+"").split("at")[0]
            // error = error.split(":")[1] +' :'+ error.split(":")[2]
            ctx.response.body = [ "錯誤"+error ]
        }


        // db.query(`UPDATE posts SET title='${ ctx.params.title }', time='${ ctx.params.time }', body='${ ctx.params.body }' WHERE id=${ ctx.params.id }`);
        // await send(ctx, ctx.request.url.pathname, {
        //         root: `${Deno.cwd()}/`,
        //         index: "index.html",
        //     })
        // // if (body.type === "form") {
        // //     const body = ctx.request.body()
        // //     const pairs = await body.value
        // //     const post = {}

        // //     for (const [key, value] of pairs) {
        // //         post[key] = value
        // //     }

        // //     console.log('post=', post)
        // //         // db.query(`UPDATE posts SET title = '${ ctx.params.title }' WHERE id = '${ ctx.params.id }'`);
        // //     db.query(`UPDATE posts SET title='${ ctx.params.title }', time='${ ctx.params.time }', body='${ ctx.params.body }' WHERE id=${ ctx.params.id }`);
        //     ctx.response.redirect('/');
        // // }

}


async function create(ctx) {

    const body = ctx.request.body()

    if (body.type === "form") {

        const pairs = await body.value
        const post = {}

        for (const [key, value] of pairs) {
            post[key] = value
        }

        console.log('post=', post)

        db.query(`
                INSERT INTO posts(title, time, body) VALUES( ? , ? , ? )
                `, [post.title, post.time, post.body]);
        ctx.response.redirect('/');
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });