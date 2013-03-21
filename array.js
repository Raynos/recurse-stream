var readstream = require("./index")

module.exports = {
    writeList: writeList
    , readList: readList
}

// readList returns a readable stream that contains a list of objects
function readList(list) {
    var index = 0
    return readstream(function readable(writable, recurse) {
        if (index === list.length) {
            return writable(null)
        }

        writable(list[index++], recurse)
    })
}

// writeList returns a writable stream and accumulates values in array
// when it receives the end symbol `null` it returns the array to the callback
function writeList(callback) {
    var result = []
    return function writable(chunk, recurse) {
        if (chunk === null) {
            return callback(result)
        }

        result.push(chunk) && recurse()
    }
}