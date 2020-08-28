String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleize = function () {
    var string_array = this.capitalize().split("_");
    return string_array.join(" ");
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.chunk = function (size) {
    var chunks = [];
    var i, j, newChunk;
    for (i = 0, j = this.length; i < j; i += size) {
        newChunk = this.slice(i, i + size);
        chunks.push(newChunk);
    }
    return chunks;
};

export function pick(obj, arr) {
    return arr.reduce(
        (acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc),
        {}
    );
}
