/**
 * Created by Uncle Liu on 2017/11/11.
 */

const log = (...args) => {
    console.log.apply(console, args)
}

// const findSmallest = (array) => {
//     let smallest = array[0]
//     let smallestIndex = 0
//     for (let i = 0; i < array.length; i++) {
//         if (array[i] < smallest) {
//             smallest = array[i]
//             smallestIndex = i
//         }
//     }
//     return smallestIndex
// }
//
// const selectionSort = (array) => {
//     let m = []
//     const len = array.length
//     for (let i = 0; i < len; i++) {
//         const r = findSmallest(array)
//         m.push(array[r])
//         array.splice(r, 1)
//     }
//     return m
// }
//
// log(selectionSort([5, 3, 6, 2, 11]))

// const binarySearch = (array, item) => {
//     let lo = 0
//     let hi = array.length - 1
//     while (lo <= hi) {
//         const mid = Math.floor((lo + hi) / 2)
//         const guess = array[mid]
//         if (guess === item) {
//             return mid
//         } else if (guess > item) {
//             hi = mid - 1
//         } else {
//             lo = mid + 1
//         }
//     }
// }

// log(binarySearch([1, 3, 5, 7, 9], 9))

// const sum = (array) => {
//     if (array.length === 0) {
//         return 0
//     }
//     return array[0] + sum(array.slice(1))
// }

// const count = (array) => {
//     if (array.length === 0) {
//         return 0
//     }
//     return 1 + count(array.slice(1))
// }
//
// const findMax = (array) => {
//     if (array.length === 1) {
//         return array[0]
//     }
//     if (array.length === 2) {
//         return array[0] > array[1] ? array[0] : array[1]
//     }
//     const subMax = findMax(array.slice(1))
//     return array[0] > subMax ? array[0] : subMax
// }
//
// const recursiveBinarySearch = (array, item) => {
//     if (array.length === 1) {
//         return array.indexOf(item)
//     }
//     const hi = array.length - 1
//     const lo = 0
//     const mid = Math.floor((hi + lo) / 2)
//     const middle = array[mid]
//     if (middle > item) {
//         return recursiveBinarySearch(array.slice(0, mid), item)
//     } else if (middle < item) {
//         return recursiveBinarySearch((array.slice(mid + 1)), item)
//     }
//     return array[mid]
// }
//
// log(recursiveBinarySearch([1, 2, 3]), 3)

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 44, 55];

// function getMidPoint(arr, searchNumb) {
//     var length = arr.length;
//     var midPoint = Math.floor(length / 2);
//     var newArr = arr;
//     console.log(arr);
//     console.log("array midpoint value: " + arr[midPoint]);
//
//     if (arr[midPoint] > searchNumb) {
//
//         var newArr = arr.slice(0, midPoint);
//         return getMidPoint(newArr, searchNumb);
//
//     } else if (arr[midPoint] < searchNumb) {
//
//         var newArr = arr.slice(midPoint + 1, arr.length);
//         return getMidPoint(newArr, searchNumb);
//
//     } else {
//         return midPoint;
//     }
// }

// log(getMidPoint(arr, 44))

// 这个版本会自动去掉重复的，因为左边是小于 pivot，右边是大于 pivot 的，漏掉了等于 pivot 的情况
// 在一侧加上等号之后，导致递归调用栈溢出错误。后面有一个不用 filter 的版本
// 应该不是 filter 的错误
// const l = [10, 5, 2, 3, 4, 6, 1, 6, 7, 10]，问题有可能出在这：
// pivot 的值是 l[0]，也就是10，刚好是整个数组最大的元素，这样在计算 less 数组的时候，如果是小于等于，
// 那么计算得到的 less 数组和原数组一样，more 数组是空数组。这样每一次递归都是一样的，没有改变条件。
// 在 more 数组的计算过程中改成大于等于，也是一样的错误，出现在 [2, 3, 4] 这种情况中，此时 pivot = 2，less = [], more = [2, 3, 4]
// 真正的问题在于，filter 是从下标为 0 的元素开始判断的，实际上这个元素已经被选为 pivot 了，应该从下标为 1 开始。
// const quickSort = (array) => {
//     if (array.length < 2) {
//         return array
//     }
//     const pivot = array[0]
//     // log('debug pivot', pivot)
//     const less = array.filter((m) => {
//         return m < pivot
//     })
//     // log('debug less', less)
//     const more = array.filter((m) => {
//         return m > pivot
//     })
//     // log('debug more', more)
//     // const less = array.filter(m => m < pivot)
//     return quickSort(less).concat([pivot], quickSort(more))
// }

// 没有 filter 的版本
// function quicksort(array) {
//     if (array.length <= 1) {
//         return array;
//     }
//
//     var pivot = array[0];
//
//     var left = [];
//     var right = [];
//
//     for (var i = 1; i < array.length; i++) {
//         array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
//     }
//     // log('debug pivot', pivot)
//     // log('debug left', left)
//     // log('debug right', right)
//     return quicksort(left).concat(pivot, quicksort(right));
// };

// const l = [10, 5, 2, 3, 4, 6, 1, 6, 7, 10]
// log(quicksort(l))
// log(quickSort(l))

// const p = l[0]
// log(l.filter(m => m >= p))

// 广度优先搜索
// 图的实现。图不过是一系列节点和边，所以图的实现用的散列表
// let graph = {
//     'you': ['alice', 'bob', 'claire'],
//     'bob': ['anuj', 'peggy'],
//     'alice': ['peggy'],
//     'claire': ['thom', 'jonny'],
//     'anuj': [],
//     'peggy': [],
//     'thom': [],
//     'jonny': [],
// }
// 步骤描述：
// 创建一个队列，用于存储要检查的人
// 从队列中弹出一个人
// 检查这个人是否是 芒果经销商，是 -> 结束；否 -> 将这个人的所有邻居加入队列，回到上一步。
// 队列
// const Queue = class {
//     constructor(data) {
//         this.data = data
//     }
//     enqueue(seller) {
//         this.data = this.data.concat(seller)
//         return this.data
//     }
//     dequeue() {
//         const r = this.data.shift()
//         return r
//     }
//     length() {
//         return this.data.length
//     }
//     isEmpty() {
//         return this.data.length === 0
//     }
// }

// 判断是否是芒果经销商。。。
// const personIsSeller = (name) => {
//     return name.slice(-1) === 'm'
// }

// 执行过程。这个没有判定是否已经检查过。
// const bfs = (queue) => {
//     while(queue.length() > 0) {
//         const p = queue.dequeue()
//         if(personIsSeller(p)) {
//             log(p + ' is a mango seller!')
//             return true
//         } else {
//             queue.enqueue(graph[p])
//         }
//     }
//     return false
// }

// 加了一个是否已经检查过判断
// const bfsImproved = (queue) => {
//     // 记录检查过的人
//     let searched = []
//     while (queue.length() > 0) {
//         const p = queue.dequeue()
//         if (!(p in searched)) {
//             if (personIsSeller(p)) {
//                 log(p + ' is a mango seller!')
//                 return true
//             } else {
//                 queue.enqueue(graph[p])
//             }
//         }
//     }
//     return false
// }

// 迪杰斯特拉算法只适用于 有向无环图 directed acyclic graph DAG
// 迪杰斯特拉算法不适合于边的权重为负数的情况，负的权重用贝尔曼-福德算法
// 迪杰斯特拉算法的大致实现：
// 三个散列表，graph 存储邻居和权重，costs 存储从起点到每个节点的开销，parents 存储每个节点的父节点，还有一个数组记录处理过的节点
// graph 散列表，存储每个节点的邻居节点和前往邻居的开销，终点用空的字典表示
const graph = {
    'start': {
        'a': 6,
        'b': 2,
    },
    'a': {
        'final': 1,
    },
    'b': {
        'a': 3,
        'final': 5,
    },
    'final': {

    }
}
// cost 散列表，从起点到该节点需要多长时间
let costs = {
    'a': 6,
    'b': 2,
    'final': Infinity,
}
// parents 散列表，存储父亲节点
let parents = {
    'a': 'start',
    'b': 'start',
    'final': null,
}
// 记录处理过的节点的数组
let processed = []
// 找出开销最低的节点函数
const findLowestCostNode = (costs) => {
    let lowestCost = Infinity
    let lowestCostNode = null
    Object.keys(costs).forEach((m) => {
        const cost = costs[m]
        if(cost < lowestCost && !(processed.includes(m))) {
            lowestCost = cost
            lowestCostNode = m
        }
    })
    return lowestCostNode
}
// 处理过程
const dijkstra = (graph, costs, parents) => {
    let node = findLowestCostNode(costs)
    while(node !== null) {
        const cost = costs[node]
        const neighbors = graph[node]
        Object.keys(neighbors).forEach((n) => {
            const newCost = cost + neighbors[n]
            if(costs[n] > newCost) {
                costs[n] = newCost
                parents[n] = node
            }
        })
        processed.push(String(node))
        node = findLowestCostNode(costs)
    }
}

// 下面是给 Set 添加交集和补集方法，来自MDN
// 有点坑啊，这个 Set 的交并补方法还要在原型里加上
Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}
// 贪婪算法的一个示例
// 所有需要被覆盖的 states
let statesNeeded = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az'])
// 每个 station 所能覆盖的 states
const stations = {
    'kone': new Set(['id', 'nv', 'ut']),
    'ktwo': new Set(['wa', 'id', 'mt']),
    'kthree': new Set(['or', 'nv', 'ca']),
    'kfour': new Set(['nv', 'ut']),
    'kfive': new Set(['ca', 'az']),
}
// 最终的选择
const finalStations = new Set()
// 过程，在当前的电台所覆盖的州和需要被覆盖的州之间求交集，找到覆盖范围最大的电台，
// 更新需要被覆盖的州，重复这个过程，直到所有州都被覆盖
const greedyExample = (stations, statesNeeded) => {
    let bestStation = null
    let statesCovered = new Set()
    while (statesNeeded.size > 0) {
        Object.keys(stations).forEach((station) => {
            const statesForStation = stations[station]
            const covered = statesNeeded.intersection(statesForStation)
            log('debug covered', covered)
            // 下面这个判断有问题，导致了死循环
            // const diff = statesCovered.difference(covered)
            if(covered.size > statesCovered.size) {
                bestStation = station
                statesCovered = covered
            }
        })
        log('states covered', statesCovered)
        statesNeeded = statesNeeded.difference(statesCovered)
        log('statesNeeded', statesNeeded)
        finalStations.add(bestStation)
        log('finalStations', finalStations)
    }
}
const _main = () => {
    // const q = new Queue(graph['you'])
    // bfsImproved(q)
    // dijkstra(graph, costs, parents)
    // log(costs)
    // log(parents)
    // greedyExample(stations, statesNeeded)
}

_main()
