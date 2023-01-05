let stdout = require("child_process").execSync('python ./eazy.py ' + "123", {encoding: 'utf8'})
console.log(stdout)