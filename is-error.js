var stringifier = Object.prototype.toString

module.exports = isError

function isError(value) {
    return stringifier.call(value) === "[object Error]"
}