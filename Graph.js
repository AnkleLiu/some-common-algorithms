/**
 * Created by Uncle Liu on 2017/12/21.
 */
const Queue = require('./Queue')
function Graph() {
    // 数组用来存顶点
    var vertices = []
    // 字典用来存储邻接表，顶点名作为键，邻接顶点为值
    var adjList = new Map()
    // 添加新的顶点
    this.addVertex = function (v) {
        vertices.push(v)
        adjList.set(v, [])
    }
    // 添加边，参数是两个顶点
    this.addEdge = function (v, w) {
        adjList.get(v).push(w)
        adjList.get(w).push(v)
    }
    //
    this.toString = function () {
        var s = ''
        for (var i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> '
            var neighbors = adjList.get(vertices[i])
            for (var j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' '
            }
            s += '\n'
        }
        return s
    }
    // 辅助函数，初始所有节点都是白色的
    // 这个数组的每一项是下面的样子
    // 通过 array['A'] 访问，而不能通过下标访问
    // 第一次见到这种数组
    //[ A: 'white', B: 'white', C: 'white', D: 'white']
    var initializeColor = function () {
        var color = []
        for (var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white'
        }
        return color
    }
    // 广度优先搜索，假设从顶点 v 开始遍历
    // 创建一个队列，将 v 标注为被发现（灰色），并加入队列
    // 如果队列非空，则：
    // 1、从队列中取出 u；
    // 2、将 u 标注为被发现（灰色）
    // 3、将 u 所有未被访问过的邻居（白色）加入队列
    // 4、将 u 标注为已被遍历的（黑色）
    this.bfs = function (v, callback) {
        // 初始化，所有节点都标注为白色，顶点 v 加入队列
        var color = initializeColor(), queue = new Queue()
        // console.log('color', color)
        queue.enqueue(v)
        // 灰色代表发现但未完成对其的搜索
        while (!queue.isEmpty()) {
            // 取出一个节点和它的邻居，将这个节点标注为灰色（被发现）
            var u = queue.dequeue(), neighbors = adjList.get(u)
            color[u] = 'grey'
            // 遍历邻居节点，把白色标注为灰色并加入队列
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i]
                if (color[w] === 'white') {
                    color[w] = 'grey'
                    queue.enqueue(w)
                }
            }
            // 把这个标注为黑色，表示这个节点已经检查完
            color[u] = 'black'
            if (callback) {
                callback(u)
            }
        }
    }
    // 深度优先搜索
    //1、标注 v 为被发现的（灰色）
    // 2、对于 v 的所有未访问的邻居 w：访问 w
    // 3、标注 v 为已被遍历的（黑色）
    // 递归的
    this.dfs = function (callback) {
        var color = initializeColor()
        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback)
            }
        }
    }
    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey'
        if (callback) {
            callback(u)
        }
        var neighbors = adjList.get(u)
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i]
            if (color[w] === 'white') {
                dfsVisit(w, color, callback)
            }
        }
        color[u] = 'black'
    }
}

// 回调函数
function printNode(value) {
    console.log('Visited vertex: ' + value)
}

const __main = () => {
    var graph = new Graph()
    var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for(let i = 0; i < myVertices.length; i++) {
        graph.addVertex(myVertices[i])
    }
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')
    graph.addEdge('C', 'D')
    graph.addEdge('C', 'G')
    graph.addEdge('D', 'G')
    graph.addEdge('D', 'H')
    graph.addEdge('B', 'E')
    graph.addEdge('B', 'F')
    graph.addEdge('E', 'I')
    //
    console.log(graph.toString())
    //
    // graph.bfs(myVertices[0], printNode)
    graph.dfs(printNode)
}

__main()