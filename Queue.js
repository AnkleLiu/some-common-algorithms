/**
 * Created by Uncle Liu on 2017/12/18.
 */
//队列，没有用 class 实现的
function Queue() {
    var items = []

    this.enqueue = function(element) {
        items.push(element)
    }

    this.dequeue = function(element) {
        return items.shift()
    }

    this.front = function() {
        return items[0]
    }

    this.isEmpty = function() {
        return items.length === 0
    }

    this.clear = function() {
        items = []
    }

    this.size = function() {
        return items.length
    }

    this.print = function() {
        console.log(items.toString())
    }
}
//优先队列
function PriorityQueue() {
    var items = []

    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }

    this.enqueue = function(element, priority) {
        var queueElement = new QueueElement(element, priority)
        if(this.isEmpty()) {
            items.push(queueElement)
        } else {
            var added = false
            for(var i = 0; i < items.length; i++) {
                if(queueElement.priority < items[i].priority) {
                    items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if(!added) {
                items.push(queueElement)
            }
        }
    }

    this.dequeue = function(element) {
        return items.shift()
    }

    this.front = function() {
        return items[0]
    }

    this.isEmpty = function() {
        return items.length === 0
    }

    this.clear = function() {
        items = []
    }

    this.size = function() {
        return items.length
    }

    this.print = function() {
        items.forEach((item) => {
            console.log(item.element + '-->' + item.priority)
        })
    }
}
// 队列，用 class 实现
const QueueWithClass = class {
    constructor() {
        this.items = []
    }
    enqueue(item) {
        this.items.push(item)
    }
    dequeue() {
        return this.items.shift()
    }
    size() {
        return this.items.length
    }
    isEmpty() {
        return this.items.length === 0
    }
}
// 约瑟夫环问题。
// 我的理解就是按照 num 轮一圈，先出列再入列，一圈后出列一个再也不入列了。直到剩下最后一个。
const hotPotato = (namelist, num) => {
    let simqueue = new QueueWithClass()
    namelist.forEach((name) => {
        simqueue.enqueue(name)
    })
    //
    while(simqueue.size() > 1) {
        for(let i = 0; i < num; i++) {
            simqueue.enqueue(simqueue.dequeue())
        }
        simqueue.dequeue()
    }
    //
    return simqueue.dequeue()
}
// 双端队列
const Deque = class {
    constructor() {
        this.items = []
    }
    isEmpty() {
        return this.items == []
    }
    addFront(item) {
        this.items.push(item)
    }
    addRear(item) {
        this.items.splice(0, 0, item)
    }
    removeFront() {
        return this.items.pop()
    }
    removeRear() {
        return this.items.splice(0, 1)[0]
    }
    size() {
        return this.items.length
    }
}
// 双端队列的一个应用，回文数检测
const palchecker = (aString) => {
    let chardeque = new Deque()

    for(let ch of aString) {
        chardeque.addRear(ch)
    }

    let stillEqual = true

    while(chardeque.size() > 1 && stillEqual) {
        let first = chardeque.removeFront()
        let last = chardeque.removeRear()
        if(first != last) {
            stillEqual = false
        }
    }
    return stillEqual
}
const __main = () => {
    // console.log(hotPotato(["Bill","David","Susan","Jane","Kent","Brad"],7))
    // console.log(palchecker("lsdkjfskf"))
    // console.log(palchecker("radar"))
    // var pq = new PriorityQueue()
    // pq.enqueue("John", 2)
    // pq.enqueue("Jack", 1)
    // pq.enqueue("Camila", 1)
    // pq.print()
//     const q = new QueueWithClass()
//     q.enqueue('dog')
//     console.log(q.size())
//     console.log(q.isEmpty())
//     q.enqueue(1)
//     q.enqueue(true)
//     console.log(q.size())
//     console.log(q.isEmpty())
//     console.log(q.dequeue())
//     console.log(q.dequeue())
//     console.log(q.dequeue())
//     console.log(q.size())
//     console.log(q.isEmpty())
}
module.exports = Queue
__main()