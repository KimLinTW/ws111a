export async function input(input){
    // const file = await Deno.open("./tmp.txt", { write: true });
    // let result = new TextEncoder().encode(pyOut_raw) 
    // await Deno.write(file.rid,result, { write: true });

    const p = Deno.run({
        cmd: ["python", "back_end.py"],
        // stdout: file.rid,
        stdout: "piped",
        stdin: "piped",
        // stderr: file.rid 
    });

    const msg = new TextEncoder().encode(input); 
    await p.stdin.write(msg);
    p.stdin.close()
    // await p.status()

    let output = await p.output();
    const return_py = new TextDecoder().decode(output)
    // console.log(return_py);

    p.close();

    // const pyOut = await Deno.readTextFile("./tmp.txt");
    // console.log("tmp.txt :");
    // console.log(pyOut);
    // file.close();
    return return_py
}




