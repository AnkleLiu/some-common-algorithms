/**
 * Created by Uncle Liu on 2017/12/20.
 */
// 二叉查找树
function BinarySearchTree() {
    var root = null
    //
    var Node = function (key) {
        this.key = key
        this.left = null
        this.right = null
    }
    // 插入一个 Node
    this.insert = function (key) {
        var newNode = new Node(key)
        if (root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }
    // 插入的辅助函数
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }
    // 中序遍历
    this.inorderTraverse = function (callback) {
        inorderTraverseNode(root, callback)
    }
    // 中序遍历辅助函数
    var inorderTraverseNode = function (node, callback) {
        if (node !== null) {
            inorderTraverseNode(node.left, callback)
            callback(node.key)
            inorderTraverseNode(node.right, callback)
        }
    }
    // 先序遍历
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback)
    }
    // 先序遍历辅助函数
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key)
            preOrderTraverseNode(node.left, callback)
            preOrderTraverseNode(node.right, callback)
        }
    }
    // 后序遍历
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback)
    }
    // 后序遍历辅助函数
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback)
            postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    // 搜索最小值
    this.min = function () {
        return minNode(root)
    }
    // 搜索最小值辅助函数
    var minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node.key
        }
        return null
    }
    // 最大值
    this.max = function () {
        return maxNode(root)
    }
    // 最大值辅助函数
    var maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right
            }
            return node.key
        }
        return null
    }
    // 搜索一个特定值
    this.search = function (key) {
        return searchNode(root, key)
    }
    // 搜索的辅助函数
    var searchNode = function (node, key) {
        if (node === null) {
            return false
        }
        if (key < node.key) {
            return searchNode(node.left, key)
        } else if (key > node.key) {
            return searchNode(node.right, key)
        } else {
            return true
        }
    }
    // 删除 BST 上的一个节点
    this.remove = function (key) {
        root = removeNode(root, key)
    }
    // 辅助删除函数
    var removeNode = function (node, key) {
        if (node === null) {
            // 正在检测的节点是 null,说明节点不存在
            return null
        }
        // 找到树中要移除的节点
        if (key < node.key) {
            // 目标节点 key 小于当前节点 key ，沿着左子树
            node.left = removeNode(node.left, key)
            return node
        } else if (key > node.key) {
            // 目标节点 key 大于当前节点 key，沿着右子树
            node.right = removeNode(node.right, key)
            return node
        } else {
            // 找到了要找的 key
            // 第一种情况，叶子节点
            if (node.left === null && node.right === null) {
                // 当被移除的节点是叶子节点
                node = null
                return node
            }
            // 第二种情况，有一侧为 null
            if (node.left === null) {
                // 没有左节点，直接用右节点替代被删除节点
                node = node.right
                return node
            } else if (node.right === null) {
                // 没有右节点，直接用左节点替代被删除节点
                node = node.left
                return node
            }
            // 第三种情况，两侧都有子树
            // 找到右子树最小的节点
            var aux = minNode(node.right)
            // 用右子树最小节点更新被删除节点
            node.key = aux.key
            // 在右子树中删除删除最小节点（去重复）
            node.right = removeNode(node.right, aux.key)
            return node
        }
    }
    // 辅助调试用
    this.getRoot = function () {
        return root
    }
}

function printNode (value) {
    console.log(value)
}

const __main = () => {
    const tree = new BinarySearchTree()
    tree.insert(11)
    tree.insert(7)
    tree.insert(15)
    tree.insert(5)
    tree.insert(3)
    tree.insert(9)
    tree.insert(8)
    // tree.insert(10)
    // tree.insert(13)
    // tree.insert(12)
    // tree.insert(14)
    // tree.insert(20)
    // tree.insert(18)
    // tree.insert(25)
    // tree.insert(6)
    console.log('中序遍历')
    tree.inorderTraverse(printNode)
    console.log('先序遍历')
    tree.preOrderTraverse(printNode)
    console.log('后序遍历')
    tree.postOrderTraverse(printNode)
    console.log('最小值')
    console.log(tree.min())
    console.log('最大值')
    console.log(tree.max())
    console.log('搜索')
    console.log(tree.search(10))
    console.log(tree.search(15))
}

__main()