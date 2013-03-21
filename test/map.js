var test = require("tape")

var array = require("../array")
var map = require("../map")

test("can map stream", function (assert) {
    var stream = array.readList([1, 2, 3])

    var doubles = map(stream, function (i) { return i * 2 })
    var squares = map(doubles, function (i) { return i * i })

    squares(array.writeList(function (arr) {
        assert.deepEqual(arr, [4, 16, 36])
        assert.end()
    }))
})