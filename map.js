var isError = require("./is-error")
var end = require("./end")

module.exports = map

function map(readable, lambda) {
    return function stream(writable) {
        readable(function writer(chunk, recurse) {
            chunk === end ? writable(end) :
                isError(chunk) ? writable(chunk) :
                writable(lambda(chunk), recurse)
        })
    }
}