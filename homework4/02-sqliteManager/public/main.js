async function sqlRun() {
    let command = document.getElementById('command').value
        // 'SELECT user FROM users'

    let rzjson = document.getElementById('resultJson')
        // <pre id="resultJson">[<br>  [<br>    "ccc"<br>  ],<br>  [<br>    "tim"<br>  ]<br>]</pre>

    let r = await window.fetch(`/sqlcmd/${command}`)
    let obj = await r.json()
    rzjson.innerText = JSON.stringify(obj, null, 2)
}