# recurse-stream

[![build status][1]][2] [![dependency status][3]][4]

[![browser support][5]][6]

A functionally recursive pull stream

## Example

```js
var readstream = require("recurse-stream")
var isError = require("recurse-stream/is-error")

// a readable stream is a function that takes a writable stream
var cursor = cursorStream(someDb, { /* ... */ })

// a writable stream is just a function (chunk, recurse). It calls recurse
// when it wants to read more

cursor(function writable(chunk, recurse) {
    if (chunk === null) {
        /* cursor ended */
    } else if (isError(chunk)) {
        /* a oops happened */
    } else {
        /* got chunk from database yay! */

        // remember to call recurse to read more
        recurse()
    }
})

function cursorStream(db, opts) {
    var source
    return readstream(function (writable, recurse) {
        if (!source) {
            source = db.cursor(opts)
        }

        cursor.nextObject(function (er, item) {
            if (er) return writable(er)
            if (item === null) return writable(null)

            writable(item, recurse)
        })
    })
}
```

## Example transforms

```js
var array = require("recurse-stream/array")
var map = require("recurse-stream/map")
var mapAsync = require("recurse-stream/mapAsync")

var stream = array.readList([1, 2, 3])

var doubles = map(stream, function(i) { return i * 2 })
var squares = mapAsync(stream, function (i, cb)  {
    process.nextTick(function () {
        cb(i * i)
    })
})

squares(function print(chunk, recurse) {
    console.log("chunk", chunk)

    recurse && recurse()
})
```

## Example buffers

```js
var Stream = require("stream")
var readstream = require("recurse-stream")
var buffer = require("recurse-stream/buffer")

var source = Stream()
// Wrapping a readable stream with `buffer` will correctly respect the
// writable's pulling requests and buffer up any chunks that come too fast
var stream = buffer(function (writable) {
    source.on("data", function (chunk) {
        writable(chunk, function () {})
    })
})

// the chunks will print once per second
stream(function writeChunk(chunk, recurse) {
    console.log("print chunk", chunk)

    setTimeout(recurse, 1000)
})

source.emit("data", 1)
source.emit("data", 2)
source.emit("data", 3)
source.emit("data", 4)
source.emit("data", 5)
source.emit("data", null)
```

## Installation

`npm install recurse-stream`

## Contributors

 - Raynos

## MIT Licenced


  [1]: https://secure.travis-ci.org/Raynos/recurse-stream.png
  [2]: http://travis-ci.org/Raynos/recurse-stream
  [3]: http://david-dm.org/Raynos/recurse-stream.png
  [4]: http://david-dm.org/Raynos/recurse-stream
  [5]: http://ci.testling.com/Raynos/recurse-stream.png
  [6]: http://ci.testling.com/Raynos/recurse-stream
