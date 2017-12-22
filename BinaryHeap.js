/**
 * Created by Uncle Liu on 2017/12/22.
 */
// 二叉堆，用一个数组实现
//  根节点最小，左右节点都比根节点大
const BinaryHeap = class {
    constructor() {
        this.heapList = [0]
        this.currentSize = 0
    }
    // 插入，先增加到末尾，然后“上浮”到合适的位置
    insert(k) {
        this.heapList.push(k)
        this.currentSize += 1
        this.percUp(currentSize)
    }
    percUp(i) {
        while (Math.floor(i / 2) > 0) {
            if (this.heapList[i] < this.heapList(Math.floor(i / 2))) {
                [this.heapList[i], this.heapList[Math.floor(i / 2)]] = [this.heapList[Math.floor(i / 2)], this.heapList[i]]
            }
            i = Math.floor(i / 2)
        }
    }
    // 删除最小值。
    // 移除顶点，然后把最后一个元素放到顶点位置，然后下沉
    delMin() {
        const retval = this.heapList[1]
        this.heapList[1] = this.heapList[this.currentSize]
        this.currentSize -= 1
        this.heapList.pop()
        this.percDown(1)
        return retval
    }
    percDown(i) {
        while (i * 2 <= this.currentSize) {
            const mc = this.minChild(i)
            if (this.heapList[i] > this.heapList[mc]) {
                [this.heapList[i], this.heapList[mc]] = [this.heapList[mc], this.heapList[i]]
            }
            i = mc
        }
    }
    minChild(i) {
        if (i * 2 + 1 > this.currentSize) {
            return i * 2
        } else {
            if (this.heapList[i * 2] < this.heapList[i * 2 + 1]) {
                return i * 2
            } else {
                return i * 2 + 1
            }
        }
    }
    // 建堆。O(n)。
    buildHeap(alist) {
        const listLength = alist.length
        let i = Math.floor(listLength / 2)
        this.currentSize = listLength
        this.heapList = [0].concat(alist.slice())
        while (i > 0) {
            this.percDown(i)
            i -= 1
        }
    }
}