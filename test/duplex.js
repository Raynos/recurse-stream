var test = require("tape")

var array = require("../array")
var duplex = require("../duplex")

test("can create a duplex stream", function (assert) {
    var readable = array.readList([1, 2, 3])
    var writable = array.writeList(function (arr) {
        assert.deepEqual(arr, [1, 2, 3])
        assert.end()
    })

    var stream = duplex(readable, writable)
    stream(stream)
})