//  資料庫系統 CURD Create, Retrieve, Update, Delete

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");
db.query(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, time TEXT, body TEXT)`);

const posts = [
    //{ id: 0, title: '上課', body: '網站設計課' },
    //{ id: 1, title: '作筆記', body: '網站設計筆記' }
];

const router = new Router();

router.get('/', list)
    .get('/post/new', add)
    .get('/del/:id', del)
    .get('/post/:id', show)
    .get('/post/update/:id', update)
    .post('/post', create)
    .post('/update/:id', update_table);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());


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
    ctx.response.body = await render.update(posts[0]);
}
async function update_table(ctx) {
    if (body.type === "form") {
        console.log("update table **********")
        const body = ctx.request.body()
        const pairs = await body.value
        const post = {}

        for (const [key, value] of pairs) {
            post[key] = value
        }

        console.log('post=', post)
            // db.query(`UPDATE posts SET title = '${ ctx.params.title }' WHERE id = '${ ctx.params.id }'`);
        db.query(`UPDATE posts SET title='${ ctx.params.title }', time='${ ctx.params.time }', body='${ ctx.params.body }' WHERE id=${ ctx.params.id }`);
        ctx.response.redirect('/');
    }
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