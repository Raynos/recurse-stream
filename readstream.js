module.exports = readstream

// A readable stream is a function that returns a writable stream.

// A writable stream is a function that takes a chunk and a callback `recurse` 
// it calls the recurse callback if it wants to read another chunk 

// readstream is an abstraction that takes a generator function. i.e.
// a function that takes (writable, recurse) and allows for recursively 
// calling that generator function.
function readstream(generator) {
    return function readable(writable) {
        (function recurse() {
            generator(writable, recurse)
        }())
    }
}