module.exports = duplex

function duplex(readable, writable) {
    return function stream(chunk, recurse) {
        // called as a readable
        if (typeof chunk === "function") {
            readable(chunk)
        } else {
            writable(chunk, recurse)
        }
    }
}