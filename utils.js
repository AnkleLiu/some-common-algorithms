/**
 * Created by Uncle Liu on 2017/12/15.
 */
const log = (...args) => {
    console.log.apply(console, args)
}
// 最大公约数
const gcd = function (p, q) {
    if (q === 0) {
        return p
    }
    const r = p % q
    return gcd(q, r)
}

// 队列
const Queue = class {
    constructor(data=[]) {
        this.data = data
    }
    enqueue(seller) {
        this.data = this.data.concat(seller)
        return this.data
    }
    dequeue() {
        const r = this.data.shift()
        return r
    }
    length() {
        return this.data.length
    }
    isEmpty() {
        return this.data.length === 0
    }
}

// 栈
const Stack = class {
    constructor(data=[]) {
        this.data = data
    }
    push(item) {
        this.data.push(item)
    }
    pop() {
        const r = this.data.pop()
        return r
    }
    length() {
        return this.data.length
    }
    isEmpty() {
        return this.data.length === 0
    }
}

// 链表
const Node = class {
    constructor(item, next=null) {
        this.item = item
        this.next = next
    }
}

// 用链表实现的栈
// 这个暂时不会写，先撂挑子了
const LinkedListStack = class {
    constructor(item) {
        this.item = item
    }
}
const __main = function () {
    // log(gcd(3, 60))
    const one = new Node('one')
    const two = new Node('two')
    const thr = new Node('thr')
    //
    one.next = two
    two.next = thr
    //
    log(one)
    log(two)
    log(thr)
}

__main()