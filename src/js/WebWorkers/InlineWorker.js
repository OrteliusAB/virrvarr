const worker = () => {
    const getFunctionArguments = (fn) => {
        return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"))
    }

    const getFunctionContent = (fn) => {
        return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
    }

    const worker = (params) => {
        const fn = params.data.fn
        const args = params.data.args
        const fnObj = new Function(getFunctionArguments(fn), getFunctionContent(fn))
        postMessage(fnObj.apply(null, args))
    }

    self.onmessage = worker
}

export default (fn, args) => {
    const workerString = worker.toString()
    const code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("}"))
    const webWorker = new Worker(URL.createObjectURL(new Blob([code], { type: 'text/javascript' })))
    const message = {
        fn: fn.toString(),
        args: args
    }
    return new Promise((resolve, reject) => {
        webWorker.onmessage = (result) => {
            resolve(result.data)
        }
        webWorker.onerror = reject
        webWorker.postMessage(message)
    })
}

/* Example Usage 
const test = (arg1) => {
    console.log("Thread started! " + arg1)
    const start = Date.now()
    while (Date.now() - start < 10000) { }
    return arg1 + 10
}

execute(test, [1]).then(result => {
    console.log("Thread 1 Done! " + result)
})
execute(test, [2]).then(result => {
    console.log("Thread 2 Done!" + result)
})
execute(test, [3]).then(result => {
    console.log("Thread 3 Done!" + result)
})
*/