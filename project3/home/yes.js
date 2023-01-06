

//import * as py from '../callPy'
async function input(input){

    // document.getElementById('b').innerText = "35"
    console.log(input)
    let stdout = await require("child_process").execSync('python ./back_end.py ' + input, {encoding: 'utf8'})
    console.log(stdout)
    // document.getElementById('b').innerText = "36"
    return stdout

}

async function sqlRun() { // 按下 [執行] 呼叫這個function
    let cmd = document.getElementById('input').value
    let result = document.getElementById('result')
    let r = await window.fetch(`/sqlcmd/${cmd}`)
    let obj = await r.json() // 呼叫.json轉成物件  有延遲需要await
    result.innerText = JSON.stringify(obj, null, 2) // 物件轉成字串 丟給 節點
}

async function tst() {
    let name = document.getElementById('name').value
    let pas = document.getElementById('pas').value
    let mail = document.getElementById('mail').value
    // let input = "isSign.Kim.abc123.linkim0914@gmail.com"
    let input = "Sign"+name+"."+pas+"."+mail
    let result = document.getElementById('d')
    let r = await window.fetch(`/test/${input}`)
    let obj = await r.json() // 呼叫.json轉成物件  有延遲需要await
    // result.innerText = JSON.stringify(obj, null, 2)
    let tmp = JSON.stringify(obj, null, 2)
    await window.fetch(`/test/${tmp}`)
    // document.getElementById("d").innerText = JSON.stringify(obj, null, 2)
    // return await JSON.stringify(obj, null, 2)
}

async function signup() {
    // sign up
    // name = document.getElementById('name').value
    // pas = document.getElementById('pas').value
    // mail = document.getElementById('mail').value

    // document.getElementById('a').innerText = "isSign."+name+"."+pas+"."+mail
    let result="raw"

    let testdata = "isSign.Kim.abc123.linkim0914@gmail.com"
    // document.getElementById('ss').innerText = "失敗"
    result = await input(testdata);
    // document.getElementById('ss').innerText = "成功"
    //result = await input("isSign."+name+"."+pas+"."+mail);
    // document.getElementById('b').innerText = result 
    if(result == "OK"){
        // document.getElementById('ss').innerText = "註冊成功"
    }else{
        // document.getElementById('ss').innerText = "此帳號已經存在!"+result+"?"
    }
}




signup()


// var exec = require("child_process").exec;

// exec('../eazy.py',function(error,stdout,stderr){
//     if(stdout.length >1){
//         return console.log(stdout);
//     } else {
//         console.log("you don\’t offer args");
//     }
//     if(error) {
//         console.info('stderr :', stderr);
//     }
// });


// var util = require("util");

// var spawn = require("child_process").spawn;
// var process = spawn('python',["python_launched_from_nodejs.py"]);

// util.log('readingin')

// process.stdout.on('data',function(chunk){

//     var textChunk = chunk.toString('utf8');// buffer to string

//     util.log(textChunk);
// });



// // 默认返回Buffer，需设置 encoding = utf8

// // 继续其他操作





// const express = require('express')


// const app = express()
// let { PythonShell } = require('python-shell')

// // app.listen(3000, () => {
// //   console.log('server running on port 3000')
// // })

// // app.get('/call/python', pythonProcess)

// function pythonProcess(req, res) {
//   let options = {
//     args:
//       [
//         "a.1"
//       ]
//   }

//   PythonShell.run('../back_end.py', options, (err, data) => {
//     if (err) res.send(err)
//     const parsedString = JSON.parse(data)
//     console.log(`name: ${parsedString.Name}, from: ${parsedString.From}`)
//     res.json(parsedString)
//   })

// }
// req = "a.1"
// res = ""
// pythonProcess(req, res)