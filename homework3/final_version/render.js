export function layout(title, content) {
    return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function list(posts) {
    let list = []
    for (let post of posts) {
        list.push(`
            <li>
              <h2>${ post.title } (${ post.time })</h2>
              <p><a href="/post/${post.id}">查看詳細資訊</a></p>
              <p><a href="/del/${post.id}">刪除資料</a></p>
            </li>
        `)
    }
    let content = `
      <h1>行事曆系統</h1>
      <p>你有<strong>${posts.length}</strong>筆記錄</p>
      <p><a href="/post/new">新增項目</a></p>
      <ul id="posts">  ${list.join('\n')} </ul>
    `
    return layout('Posts', content)
}

export function newPost() {
    return layout('New Post', `
      <h1>新增項目</h1>
      
      <form action="/post" method="post">

      <input type="date" id="start" name="time" value="2022-10-01" min="2022-09-01" max="2023-01-31">
      &nbsp設定日期
      </input>

        <p><input type="text" placeholder="標題" name="title" minlength="1"></p>
        <p><textarea placeholder="內容" name="body" minlength="1"></textarea></p>
        <p><input type="submit" value="建立"></p>
      </form>
  `)
}

export function show(post) {
    return layout(post.title, `
    <p><a href="/">上一頁</a></p>
    <h1>${post.title}</h1>
    <pre>${post.body}</pre>
    <p><a href="/post/update/${post.id}">修改資料</a></p>
    <p><a href="/del/${post.id}">刪除資料</a></p>
  `)
}

export function update(post) {

    return layout('修改post', `
      <h1>修改項目</h1>
      
      <form action="/update/${post.id}" method="post" id="update">

      <input type="date" id="time" name="time" value="${post.time}" min="2022-09-01" max="2023-01-31">
      &nbsp修改日期
      </input>

        <p><input type="text" placeholder="標題" name="title" id="title" value="${post.title}"></p>
        <p><textarea placeholder="內容" name="body" id="body">${post.body}</textarea></p>
        <p><input type="submit" value="更新"></p>
      </form>
  `)
}


async function test2() { // 按下 [執行] 呼叫這個function
    let cmd = document.getElementById('input').value
        // 'SELECT user FROM users'

    let result = document.getElementById('result')
        // <pre id="resultJson">[<br>  [<br>    "ccc"<br>  ],<br>  [<br>    "tim"<br>  ]<br>]</pre>

    let r = await window.fetch(`/sqlcmd/${cmd}`)

        //把sqlcmd 輸出的結果傳回來 (JSON格式)
    let obj = await r.json() // 呼叫.json轉成物件  有延遲需要await
    result.innerText = JSON.stringify(obj, null, 2) // 物件轉成字串 丟給 節點
}