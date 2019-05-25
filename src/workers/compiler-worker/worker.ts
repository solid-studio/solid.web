import axios from "axios";

const ctx: Worker = self as any
const wrapper = require('solc/wrapper');

(ctx as any).importScripts("https://solc-bin.ethereum.org/bin/soljson-v0.5.8+commit.23d335f2.js");

ctx.onmessage = event => {
    console.log("wrapper", wrapper)
    console.log("wrapper", (ctx as any))
    console.log("event", event);
    const compiler = wrapper((ctx as any).Module)
    console.log("compiler", compiler)
    ctx.postMessage("whatever");

    // load('https://solc-bin.ethereum.org/bin/soljson-v0.5.8+commit.23d335f2.js')
    //     .then((result) => {
    //         // console.log("solc", solc)
    //         console.log("Resultado", (ctx as any).importScripts)
    //         console.log("event", event.data, "result", result);
    //         (ctx as any).importScripts("https://solc-bin.ethereum.org/bin/soljson-v0.5.8+commit.23d335f2.js");
    //         const compiler = wrapper((ctx as any).Module)
    //         console.log("compiler", compiler)
    //         ctx.postMessage("whatever");
    //     })
    //     .catch((error) => {
    //         console.log("Error", error)
    //     })
    // importScripts('https://solc-bin.ethereum.org/bin/soljson-v0.5.8+commit.23d335f2.js');
    // const solc = wrapper("soljson-v0.5.8+commit.23d335f2.js")
    // console.log("solc", solc)
    // console.log("SOLC", (window as any).Module)
};

// ctx.postMessage("whatever");

// ctx.addEventListener('message', (e) => {
//     console.log("message", "asdasd")
// })
//simple XHR request in pure JavaScript
const load = async (url: string) => {
    const result = await axios.get(url);
    return result;
}
