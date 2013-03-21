module.exports = map

function map(readable, lambda) {
    return function stream(writable) {
        readable(function (chunk, recurse) {
            if (chunk === null) {
                return writable(null)
            }

            writable(lambda(chunk), recurse)
        })
    }
}