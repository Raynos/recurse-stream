var test = require("tape")

var array = require("../array")

test("can read from a list", function (assert) {
    var stream = array.readList([1, 2, 3])

    var res = []
    stream(function (chunk, recurse) {
        if (chunk === null) {
            assert.deepEqual(res, [1, 2, 3])
            assert.end()
        } else {
            res.push(chunk) && recurse()
        }
    })
})

test("can write to a list", function (assert) {
    var writable = array.writeList(function (err, list){
        assert.deepEqual(list, [1, 2, 3])
        assert.end()
    })

    writable(1, function () {
        writable(2, function () {
            writable(3, function () {
                writable(null)
            })
        })
    })
})