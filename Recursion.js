/**
 * Created by Uncle Liu on 2017/12/19.
 */
const listsum = (numlist) => {
    if (numlist.length === 1) {
        return numlist[0]
    } else {
        return numlist[0] + listsum(numlist.slice(1))
    }
}

const toStr = (n, base) => {
    const convertString = "0123456789ABCDEF"
    if (n < base) {
        return convertString[n]
    } else {
        return toStr(Math.floor(n / base),base) + convertString[n%base]
    }
}
// 一个栈版本的，用 Python 写的
// rStack = Stack()
//
// def toStr(n,base):
// convertString = "0123456789ABCDEF"
// while n > 0:
// if n < base:
// rStack.push(convertString[n])
// else:
// rStack.push(convertString[n % base])
// n = n // base
// res = ""
// while not rStack.isEmpty():
// res = res + str(rStack.pop())
// return res
//
// print(toStr(1453,16))
const __main = () => {
    console.log(listsum([1,3,5,7,9]))
    console.log(toStr(1453,16))
}

__main()