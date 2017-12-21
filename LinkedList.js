/**
 * Created by Uncle Liu on 2017/12/18.
 */
// 链表，没用 class 实现的
function LinkedList() {
    var Node = function (element) {
        this.element = element
        this.next = null
    }
    //
    var length = 0
    var head = null
    //
    this.append = function (element) {
        let node = new Node(element), current
        if (head === null) {
            head = node
        } else {
            current = head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        length++
    }
    //
    this.removeAt = function (position) {
        // 检查越界
        if (position > -1 && position < length) {
            let current = head, previous, index = 0
            // 移除第一项
            if (position === 0) {
                head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            length--
            return current.element
        } else {
            return null
        }
    }
    //
    this.insert = function (position, element) {
        // 检查越界
        if (position >= 0 && position <= length) {
            let node = new Node(element), current = head, previous, index = 0
            // 在第一个位置添加
            if (position === 0) {
                node.next = current
                head = node
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }
            length++
            return true
        } else {
            return false
        }
    }
    //
    this.toString = function () {
        let current = head, string = ''
        while (current) {
            string = string + '-->' + current.element
            current = current.next
        }
        return string.slice(3)
    }
    //
    this.indexOf = function (element) {
        let current = head, index = 0
        while (current) {
            if (element === current.element) {
                return index
            }
            index++
            current = current.next
        }
        return -1
    }
    //
    this.remove = function (element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }
    //
    this.isEmpty = function () {
        return length === 0
    }
    //
    this.size = function () {
        return length
    }
    //
    this.getHead = function () {
        return head
    }
}
// 双向链表，没有用 class 实现的
function DoublyLinkedList() {
    const Node = function (element) {
        this.element = element
        this.next = null
        this.prev = null
    }
    // 这里 tail 指向最后一个节点
    let length = 0, head = null, tail = null
    //
    this.insert = function (position, element) {
        // 检查越界
        if (position >= 0 && position <= length) {
            let node = new Node(element), current = head, previous, index = 0
            // 在第一位置添加
            if (position === 0) {
                if (!head) {
                    // 原来是空的链表
                    head = node
                    tail = node
                } else {
                    // 原来是非空的
                    node.next = current
                    current.prev = node
                    head = node
                }
            } else if (position === length) {
                // 新增最后一项
                current = tail
                current.next = node
                node.prev = current
                tail = node
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }
            length++
            return true
        } else {
            return false
        }
    }
    //
    this.removeAt = function (position) {
        // 检查越界
        if (position > -1 && position < length) {
            let current = head, previous, index = 0
            if (position === 0) {
                // 移除第一项
                head = current.next
                if (length === 1) {
                    // 如果只有一项
                    tail = null
                } else {
                    head.prev = null
                }
            } else if (position === length - 1) {
                current = tail
                tail = current.prev
                tail.next = null
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
                //
                length--
                return current.element
            }
        } else {
            return null
        }
    }
}
const __main = () => {
    // let list = new LinkedList()
    // list.append(15)
    // list.append(10)
    // list.append(50)
    // console.log(list.isEmpty())
    // console.log(list.getHead())
    // console.log('before remove: ', list.toString())
    // list.remove(30)
    // console.log('after remove: ', list.toString())
}

__main()