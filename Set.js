/**
 * Created by Uncle Liu on 2017/12/19.
 */
//集合，用的对象来实现的，没有用 class
function Set() {
    var items = {}
    // 没有用 in ，是考虑到不能遍历原型上的属性
    this.has = function (value) {
        return items.hasOwnProperty(value)
    }
    
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value
            return true
        }
        return false
    }
    
    this.remove = function (value) {
        if (this.has(value)) {
            delete items[value]
            return true
        }
        return false
    }

    this.clear = function () {
        items = {}
    }

    this.size = function () {
        return Object.keys(items).length
    }

    this.values = function () {
        return Object.keys(items)
    }

    this.toString = function () {
        console.log('{')
        for (let [key, val] of Object.entries(items)) {
            console.log(`    ${key}: ${val}`)
        }
        console.log('}')
    }
    // 并集
    this.union = function (otherSet) {
        let unionSet = new Set()
        let values = this.values()
        //
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        //
        values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        //
        return unionSet
    }
    // 交集
    this.intersection = function (otherSet) {
        let intersectionSet = new Set()
        let values = this.values()
        //
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i])
            }
        }
        //
        return intersectionSet
    }
    // 补集
    this.difference = function (otherSet) {
        let differenceSet = new Set()
        let values = this.values()
        //
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }
        //
        return differenceSet
    }
    // 子集，这个只返回真假，是书上的例子
    // 我觉得这个名字应该是 isSubsetOf
    this.subset = function (otherSet) {
        if (this.size() > otherSet.set()) {
            return false
        } else {
            let values = this.values()
            for (let i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    return false
                }
            }
            return true
        }
    }
}

const __main = () => {
    const s1 = new Set()
    s1.add(1)
    s1.add(2)
    s1.add(3)
    const s2 = new Set()
    s2.add(3)
    s2.add(4)
    s2.add(5)
    s2.add(6)
    console.log('set1 original')
    s1.toString()
    console.log('set2 original')
    s2.toString()
    let unionSet = s1.union(s2)
    console.log('the union set')
    unionSet.toString()
    let intersectionSet = s1.intersection(s2)
    console.log('the intersection set')
    intersectionSet.toString()
    let differenceSet = s1.difference(s2)
    console.log('the difference set')
    differenceSet.toString()
}

__main()