async function sqlRun() { // 按下 [執行] 呼叫這個function
    let cmd = document.getElementById('input').value
        // 'SELECT user FROM users'

    let result = document.getElementById('result')
        // <pre id="resultJson">[<br>  [<br>    "ccc"<br>  ],<br>  [<br>    "tim"<br>  ]<br>]</pre>

    let r = await window.fetch(`/sqlcmd/${cmd}`)

        //把sqlcmd 輸出的結果傳回來 (JSON格式)
    let obj = await r.json() // 呼叫.json轉成物件  有延遲需要await
    result.innerText = JSON.stringify(obj, null, 2) // 物件轉成字串 丟給 節點
}