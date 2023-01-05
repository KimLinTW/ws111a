import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';
import { DB } from 'https://deno.land/x/sqlite/mod.ts';
import { MongoClient } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';



const client = new MongoClient();
client.connectWithUri('mongodb+srv://dbUser:dbuser@magicmirror.xcrmaww.mongodb.net/?retryWrites=true&w=majority');
const result = await shops.findOne({ id: 3394 });
console.log(result);

const db = new DB('mydb.db');
const app = new Application();
const router = new Router();

router
  .get('/', root)
  .get('/sqlcmd/:input', sqlcmd)
  .get('/home/(.*)', home)
  .get('/login', login);

app.use(router.routes());
app.use(router.allowedMethods());

async function login(ctx) {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/`,
    index: 'login.html',
  });
}

async function root(ctx) {
  ctx.response.redirect('/home/');
}

async function home(ctx) {
  console.log(ctx);
  console.log(ctx.request.url.pathname);

  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/`,
    index: 'index.html',
  });
}

async function sqlcmd(ctx) {
  const cmd = ctx.params['input'];

  try {
    const result = db.query(cmd);

    ctx.response.type = 'application/json';
    ctx
