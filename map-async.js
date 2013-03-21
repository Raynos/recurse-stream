var isError = require("./is-error")
var end = require("./end")

module.exports = mapAsync

function mapAsync(readable, lambda) {
    return function stream(writable) {
        readable(function writer(chunk, recurse) {
            chunk === end ? writable(end) :
                isError(chunk) ? writable(chunk) :
                lambda(chunk, function callback(result) {
                    writable(result, recurse)
                })
        })
    }
}