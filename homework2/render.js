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
    <p><a href="/del/${post.id}">刪除資料</a></p>
  `)
}