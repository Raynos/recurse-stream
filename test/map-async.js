var test = require("tape")

var array = require("../array")
var mapAsync = require("../map-async")


test("can mapAsync", function (assert) {
    var stream = array.readList([1, 2, 3])

    var doubles = mapAsync(stream, function (i, cb) { cb(i * 2) })
    var squares = mapAsync(doubles, function (i, cb) { cb(i * i) })

    squares(array.writeList(function (err, arr) {
        assert.ifError(err)
        assert.deepEqual(arr, [4, 16, 36])
        assert.end()
    }))
})