// 請設計個人網頁(包含登入)
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
    return `<html>
  <head>
        <script src="https://kit.fontawesome.com/5b08644e8c.js" crossorigin="anonymous"></script>
        <style>
            
            body { font-family:"Calluna";}

            h2 { font-size: 36px;}
            
            i{
                font-size: 25px;
                padding:10px;
            }

            button { padding:8px 14px;
                     background-color:DeepSkyBlue;
                     border:0px black solid;
                     color: white;
                     border-radius: 5px;}

            div { width:100%;
                  text-align:center;}

            input[type=text], input[type=password] {
                padding:8px 14px;
                width:200px;
                border-radius:5px;
                border: 1px #cccccc solid;}

            a { color:DodgerBlue;
                text-decoration: none;}

            .card-layout { width: 352px;
                           box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
                           padding: 24px;
                           border-radius: 8px;
                           margin: auto;
                           background: #fff;}

            button:hover {
                background-color: DodgerBlue;
                cursor: pointer;
            }
        </style>
  </head>
  <body style="background-color:rgb(252,240,228);">
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
    console.log('ctx.request.url=', ctx.request.url)
    let pathname = ctx.request.url.pathname
    if (pathname.startsWith("/login")) {
        ctx.response.body = page(`
       <br><br><br><br><br><br><br><br>
        <div id="" class="card-layout">
            <h2>Sign up</h2>
            <p><i class="fa-solid fa-user-astronaut"></i><input type="text" placeholder="Your name"/></p>
            <p><i class="fa-solid fa-globe"></i><input type="text" placeholder="Your email"/></p>
            <p><i class="fa-solid fa-shuttle-space"></i><input type="password" placeholder="Password"/></p>
            <p><i class="fa-solid fa-meteor"></i><input type="password" placeholder="Retype your password again"/></p>
            <br><p><input type="checkbox"> I agree all statements in <a href="#">Terms of service</a></p>
            <br><br>
            <button style="background-color:#f0b446;" >Submit</button>
        </div>
    `)
    } else {
        ctx.response.body = page(`
        
      <h1>我的網站</h1>
      <a href="http://127.0.0.1:8000/login">點擊註冊<a/>
    `)
    }
    // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });