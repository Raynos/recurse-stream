var end = require("./end")
var isError = require("./is-error")

module.exports = buffer

function buffer(readable, highWaterMark) {
    var list = []
    var paused = false
    var ended = false

    highWaterMark = highWaterMark === undefined ? 100 : highWaterMark

    return function stream(writable) {
        function drainBuffer() {
            if (list.length === 0 || paused) {
                return
            }

            var item = list.shift()

            writable(item, drainBuffer)
        }

        readable(function (chunk, recurse) {
            // always push onto buffer
            list.push(chunk)

            // the source has halted. We should drain this buffer into 
            // writable
            if (chunk === end || isError(chunk)) {
                ended = true

                return drainBuffer()
            }

            // If paused then DO NOT WRITE TO WRITABLE
            if (paused) {
                if (buffer.length < highWaterMark) {
                    // let's just pre-emptively pull some stuff out of source
                    recurse()
                }

                return
            }

            // pause right before writing to writable
            paused = true

            // write item to writable!
            var item = list.shift()
            writable(item, function () {
                // unpause once writable says I WANT MORE
                paused = false

                // if ended then drain else tell source we want more
                ended ? drainBuffer() : recurse()
            })
        })
    }
}