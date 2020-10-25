const fs = require('fs')
const dotenv = require('dotenv')

const checkEnv = (name) => {
    return new Promise((resolve, reject) => {
        const filePath = __dirname + name
        fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
            if (err) resolve()
            resolve(filePath)
        })
    })
}

const readFile = promisify(fs.readFile)

function promisify(fn) {
    return function () {
        return new Promise((resolve, reject) => {
            fn.call(this, ...arguments, (error, value) => {
                if (error) reject(error)
                else resolve(value)
            })
        })
    }
}

const files = [
    '/../.env'
]
if (process.env.NODE_ENV === "dev") files.unshift('/../.env.dev')
else dotenv.config()



module.exports = Promise.all(
    files.map(file => checkEnv(file)
        .then(file => readFile(file))
    ))
    .then(
        results =>
            results.forEach((result, index) => {
                // console.log(files[index], result.length)
                const envConfig = dotenv.parse(result);
                // console.log('envConfig :>> ', envConfig);
                for (const k in envConfig) process.env[k] = process.env[k] || envConfig[k]
            }))
    // .then(() => console.log('process.env :>> ', process.env))
