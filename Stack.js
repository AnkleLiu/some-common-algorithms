/**
 * Created by Uncle Liu on 2017/12/18.
 */
// 栈，没有用 class 实现的
function Stack() {
    var items = []

    this.push = function(element) {
        items.push(element)
    }

    this.pop = function() {
        return items.pop()
    }

    this.peek = function() {
        return items[items.length - 1]
    }

    this.isEmpty = function() {
        return items.length === 0
    }

    this.size = function() {
        return items.length
    }

    this.clear = function() {
        items = []
    }

    this.print = function() {
        console.log(items.toString())
    }
}
// 用 class 的栈
const StackWithClass = class {
    constructor() {
        this.items = []
    }
    push(item) {
        this.items.push(item)
    }
    pop() {
        return this.items.pop()
    }
    peek () {
        return this.items[this.items.length - 1]
    }

    isEmpty () {
        return this.items.length === 0
    }

    size () {
        return this.items.length
    }
}
//十进制转换，栈的一个应用
const baseConverter = (decNumber, base) => {
    var remStack = new Stack(), rem, baseString = '', digits = '0123456789ABCDEF'

    while (decNumber > 0) {
        var rem = Math.floor(decNumber % base)
        remStack.push(rem)
        decNumber = Math.floor(decNumber / base)
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]
    }

    return baseString
}
// 括号匹配，栈的一个应用，这个版本只检查了 "("
const parChecker = function (symbolString) {
    const s = new StackWithClass()
    let balanced = true, index = 0
    while(index < symbolString.length && balanced) {
        const symbol = symbolString[index]
        if(symbol === '(') {
            s.push(symbol)
        } else {
            if(s.isEmpty()) {
                balanced = false
            } else {
                s.pop()
            }
        }
        index += 1
    }
    if(balanced && s.isEmpty()) {
        return true
    } else {
        return false
    }
}
// 通用版本的括号匹配
// 首先定义了一个匹配函数
const matches = (open, close) => {
    const opens = '([{'
    const closes = ')]} '
    return opens.indexOf(open) === closes.indexOf(close)
}
//然后是 parChecker 函数
const generalParChecker = (symbolString) => {
    const s = new StackWithClass()
    let balanced = true, index = 0
    while(index < symbolString.length && balanced) {
        const symbol = symbolString[index]
        if('([{'.includes(symbol)) {
            s.push(symbol)
        } else {
            if(s.isEmpty()) {
                balanced = false
            } else {
                const top = s.pop()
                if(!matches(top, symbol)) {
                    balanced = false
                }
            }
        }
        index += 1
    }
    if(balanced && s.isEmpty()) {
        return true
    } else {
        return false
    }
}
// 栈的另一个应用，中缀表达式到后缀表达式
const infixToPostfix = (infixExpr) => {
    const prec = {
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2,
        '(': 1,
    }
    let opStack = new StackWithClass(), postfixList = [], tokenList = infixExpr.split(" ")
    tokenList.forEach((token) => {
        if(("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(token)) || ("0123456789".includes(token))) {
            postfixList.push(token)
        } else if(token === '(') {
            opStack.push(token)
        } else if(token === ')') {
            let topToken = opStack.pop()
            while(topToken !== '(') {
                postfixList.push(topToken)
                topToken = opStack.pop()
            }
        } else {
            while ((!opStack.isEmpty()) && (prec[opStack.peek()] >= prec[token])) {
                postfixList.push(opStack.pop())
            }
            opStack.push(token)
        }
    })

    while(!opStack.isEmpty()) {
        postfixList.push(opStack.pop())
    }
    return postfixList.join(' ')
}
// 计算后缀表达式
// 辅助函数
const doMath = (op, op1, op2) => {
    if(op == "*"){
        return op1 * op2
    }
    else if(op == "/") {
        return op1 / op2
    }
    else if(op == "+") {
        return op1 + op2
    }
    else {
        return op1 - op2
    }
}
// 计算
const postFixEval = (postfixExpr) => {
    const operandStack = new StackWithClass()
    let tokenList = postfixExpr.split(" ")
    tokenList.forEach((token) => {
        if("0123456789".includes(token)) {
            operandStack.push(parseInt(token))
        } else {
            const operand2 = operandStack.pop()
            const operand1 = operandStack.pop()
            const result = doMath(token,operand1,operand2)
            operandStack.push(result)
        }
    })
    return operandStack.pop()
}

const __main = () => {
    // console.log(postFixEval('7 8 + 3 2 + /'))
    // console.log(infixToPostfix("( A + B ) * ( C + D )"))
    // console.log(infixToPostfix("( A + B ) * C"))
    // console.log(generalParChecker('{{([][])}()}'))
    // console.log(generalParChecker('[{()]'))
    // console.log(matches('[', ')'))
    // console.log(parChecker('((()))'))
    // console.log(parChecker('(()'))
    // console.log(baseConverter(1024, 2))
    // const s = new StackWithClass()
    // console.log(s.isEmpty())
    // s.push(4)
    // s.push('dog')
    // console.log(s.peek())
    // s.push(true)
    // console.log(s.size())
    // console.log(s.isEmpty())
    // s.push(8.4)
    // console.log(s.pop())
    // console.log(s.pop())
    // console.log(s.size())
}

__main()