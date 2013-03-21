var test = require("tape")

var readstream = require("../readstream")

test("readstream", function (assert)  {
    assert.equal(typeof readstream, "function")

    var list = ["one", "two", "three"]
    var s = readstream(function (writable, recurse) {
        var c = list.shift()

        if (c) {
            writable(c, recurse)
        } else {
            writable(null)
        }
    })

    var target = []
    s(function writable(chunk, recurse) {
        if (chunk === null) {
            assert.deepEqual(target, ["one", "two", "three"])
            assert.end()
        } else {
            target.push(chunk) && recurse()
        }
    })
})