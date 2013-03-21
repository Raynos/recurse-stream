var test = require("tape")
var EventEmitter = require("events").EventEmitter
var setTimeout = require("timers").setTimeout

var buffer = require("../buffer")
var readstream = require("../readstream")

test("can buffer from a push source", function (assert) {
    var source = new EventEmitter()
    var stream = SourceStream(source)

    var list = []
    var paused = false
    buffer(stream)(function writable(chunk, recurse) {
        if (chunk === null) {
            assert.deepEqual(list, [1, 2, 3, 4, 5])
            return assert.end()
        }

        list.push(chunk)
        assert.equal(paused, false)
        paused = true

        setTimeout(function () {
            assert.equal(paused, true)
            paused = false

            recurse()
        }, 10)
    })

    source.emit("data", 1)
    source.emit("data", 2)
    source.emit("data", 3)
    source.emit("data", 4)
    source.emit("data", 5)
    source.emit("data", null)
})

function SourceStream(emitter) {
    return readstream(function (writable) {
        emitter.on("data", function  (chunk) {
            writable(chunk, noop)
        })
    })
}

function noop() {}