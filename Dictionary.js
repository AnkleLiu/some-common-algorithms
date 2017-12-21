/**
 * Created by Uncle Liu on 2017/12/19.
 */
function Dictionary() {

    var items = {}

    this.has = function (key) {
        return key in items
    }

    this.set = function (key, value) {
        items[key] = value
    }

    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key]
            return true
        }
        return false
    }

    this.get = function (key) {
        return this.has(key) ? items[key] : undefined
    }

    this.values = function () {
        var values = {}
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k])
            }
        }
        return values
    }

    this.getItems = function () {
        return items
    }
}
// hash 函数
const hashFunction = (key, size) => {
    return key % size
}
// rehash 函数
const rehash = (oldhash, size) => {
    return (oldhash + 1) % size
}
// 再用 class 实现一个
const Map = class {
    constructor(size=11) {
        this.size = size
        this.data = new Array(size)
        this.slots = new Array(size)
    }
    //
    put(key, data) {
        const hashValue = hashFunction(key, this.size)
        // 空槽
        if(this.slots[hashValue] === undefined) {
            this.slots[hashValue] = key
            this.data[hashValue] = data
        } else {
            // 覆盖
            if(this.slots[hashValue] === key) {
                this.data[hashValue] = data
            } else {
                // 不断地 rehash，直到找到一个空槽或者 key 等于要插入的 key
                let nextSlot = rehash(hashValue, this.size)
                while(this.slots[nextSlot] !== undefined && this.slots[nextSlot] !== key) {
                    nextSlot = rehash(nextSlot, this.slots.length)
                }
                // 找到了空槽
                if(this.slots[nextSlot] === undefined) {
                    this.slots[nextSlot] = key
                    this.data[nextSlot] = data
                } else {
                    // 覆盖
                    this.data[nextSlot] = data
                }
            }
        }
    }
    //
    get(key) {
        let startSlot = hashFunction(key, this.size.length)
        let data, stop = false, found = false, position = startSlot
        while(this.slots[position] !== undefined && !found && !stop) {
            if(this.slots[position] === key) {
                found = true
                data = this.data[position]
            } else {
                position = rehash(position, this.slots.length)
                if(position === startSlot) {
                    stop = true
                }
            }
        }
        return data
    }
}

const __main = () => {
    const m = new Map()
    m.put(54, 'cat')
    m.put(26, 'dog')
    m.put(93, 'lion')
    m.put(17, 'tiger')
    m.put(77, 'bird')
    m.put(31, 'cow')
    m.put(44, 'goat')
    m.put(55, 'pig')
    m.put(20, 'chicken')
    console.log(m.slots)
    console.log(m.data)
}

__main()